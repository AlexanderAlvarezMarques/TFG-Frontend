'use client'

import React, {FormEvent, MouseEventHandler, useEffect, useState} from "react";
import SportCenterService from "@/services/api/sportCenter/SportCenterService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";

import "@/assets/sass/pages/sport_facilities.scss";
import {useDispatch, useSelector} from "react-redux";
import FormatTextTools from "@/utils/FormatTextTools";
import EditCourtModal from "@/components/app/sport_facilities/EditCourtModal";
import {MessageBandColorEnum, useMessagePopup} from "@/components/Context/MessagePopupContext";
import CourtService from "@/services/api/sportCenter/CourtService";
import MasterDataTools from "@/utils/MasterDataTools";
import {setMasterData} from "@/redux/reducers/masterDataReducers";

import "@/assets/sass/pages/sport_facility.scss";

type Params = {
    params: {
        id: number
    }
}

const SportCenterEditPage: React.FC<Params> = ({params: {id}}) => {

    const sports = useSelector((state: StorageState) => state.masterData.sports);
    const dispatch = useDispatch();
    const { openPopup } = useMessagePopup();

    const [sportCenter, setSportCenter] = useState<SportCenter>();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateCourtOpen, setIsCreateCourtOpen] = useState(false);
    const [courtToEdit, setCourtToEdit] = useState<Court>();

    const editCourtAction = (court: Court) => {
        setCourtToEdit(court);
        setIsEditModalOpen(true);
    }

    const onCloseModal = (court: Court | null) => {
        setIsEditModalOpen(false);
        if (court !== null) {
            setSportCenter((prevState) => {
                if (!prevState || !prevState.courts) return prevState;

                const updatedCourts = prevState.courts.map(c =>
                    c.id === court.id ? court : c
                );
                return {
                    ...prevState,
                    courts: updatedCourts
                };
            });
        }
    }

    const updateSportFacility = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (sportCenter) {
            const response = await SportCenterService.updateSportCenter(sportCenter.id, sportCenter.name, sportCenter.street, sportCenter.postalCode);
            if (response !== null) {
                setSportCenter(response);
                openPopup("Centro deportivo actualizado", MessageBandColorEnum.GREEN);
            }
        }
    }

    const createCourtAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const sport = formData.get('sport') as string;
        const number = parseInt(formData.get('number') as string, 10);
        if (sportCenter) {
            const response = await CourtService.createCourt(sportCenter.id, sport, number);
            if (response !== null) {
                const { provinces, cities, sports } = await MasterDataTools.readMasterData();
                dispatch(setMasterData({provinces, cities, sports}));
                openPopup("Cancha/pista creada", MessageBandColorEnum.GREEN);
                setSportCenter((prevState) => {
                    if (prevState) {
                        const updatedCourts = prevState.courts ? [...prevState.courts, response] : [response];
                        return {
                            ...prevState,
                            courts: updatedCourts,
                            nCourts: updatedCourts.length
                        };
                    }
                    return prevState;
                });
            }
        }
    }

    useEffect(() => {

        const readSportCenterDetails = async () => {
            const response = await SportCenterService.getSportCenterDetails(id, true);
            if (response !== null) setSportCenter(response)
        }

        readSportCenterDetails().then();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!sportCenter) return <></>

    return (
        <>
            <div className={`sportCenter`}>
                <form className={`form`} onSubmit={updateSportFacility}>

                    {/* Name */}
                    <div className="formGroup">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={sportCenter.name}
                            onChange={(e) => setSportCenter((prevState) => {
                                if (!prevState) return prevState; // Si prevState es undefined, no hacer nada
                                return {
                                    ...prevState,
                                    name: e.target.value
                                };
                            })}
                        />
                    </div>

                    {/* City */}
                    <div className="formGroup">
                        <label>Ciudad:</label>
                        <input type="text" name="city" id="city" defaultValue={sportCenter.city.name} disabled={true}/>
                    </div>

                    {/* Street */}
                    <div className="formGroup">
                        <label>Calle:</label>
                        <input
                            type="text"
                            name="street"
                            id="street"
                            defaultValue={sportCenter.street}
                            onChange={(e) => setSportCenter((prevState) => {
                                if (!prevState) return prevState; // Si prevState es undefined, no hacer nada
                                return {
                                    ...prevState,
                                    street: e.target.value
                                };
                            })}
                        />
                    </div>

                    {/* Postal code */}
                    <div className="formGroup">
                        <label>Código postal:</label>
                        <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            defaultValue={sportCenter.postalCode}
                            onChange={(e) => setSportCenter((prevState) => {
                                if (!prevState) return prevState; // Si prevState es undefined, no hacer nada
                                return {
                                    ...prevState,
                                    postalCode: e.target.value
                                };
                            })}
                        />
                    </div>

                    {/* N courts */}
                    {/*<div className={`formGroup`}>*/}
                    {/*    <label htmlFor="">Total de pistas/canchas</label>*/}
                    {/*    <input type="number" name="nCourts" id="nCourts" defaultValue={sportCenter.nCourts} disabled={true}/>*/}
                    {/*</div>*/}

                    <div className={`formGroup button`}>
                        <input type="submit" value="Actualizar" className="btn btn-success"/>
                    </div>

                    <div className={'formGroup button'}>
                        <button className={`btn btn-primary`}
                                onClick={() => setIsCreateCourtOpen(!isCreateCourtOpen)}>Crear pista/cancha
                        </button>
                    </div>
                </form>

                {
                    isCreateCourtOpen && (
                        <div>
                            <form className={`form`} onSubmit={createCourtAction}>
                                <div className={`formGroup`}>
                                    <label>Deporte:</label>
                                    <select name="sport">
                                        <option value="">...</option>
                                        {
                                            sports.map((sport) =>
                                                <option key={sport.name} value={sport.name}>{FormatTextTools.capitalizeFirstChar(sport.name)}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="formGroup">
                                    <label>Número:</label>
                                    <input type="number" name="number" min={1}/>
                                </div>
                                <div className="formGroup button">
                                    <input type="submit" className={`btn btn-success`} value="Crear"/>
                                </div>
                            </form>
                        </div>
                    )
                }

            </div>

            <div className={`courts`}>
                <table className={'table table-bordered table-hover'}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Identificador</th>
                            <th>Deporte</th>
                            <th>Nº de pista/cancha</th>
                            <th>Estado</th>
                            <th>
                                {/*<button className={`btn btn-success`} onClick={() => setIsCreateModalOpen(true)}>Crear pista/cancha</button>*/}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        sportCenter.courts?.map((court) => (
                            <tr key={court.id}>
                                <th>{court.id}</th>
                                <td>{court.identifier}</td>
                                <td>{FormatTextTools.capitalizeFirstChar(court.sport)}</td>
                                <td>{court.number}</td>
                                <td>{court.enable ? 'Activa' : 'No activa'}</td>
                                <td className={'text-center'}>
                                    <button className={'btn btn-warning'} onClick={() => editCourtAction(court)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            {
                isEditModalOpen && courtToEdit && <EditCourtModal data={courtToEdit} onClose={onCloseModal} />
            }

        </>
    )
}

export default SportCenterEditPage;
