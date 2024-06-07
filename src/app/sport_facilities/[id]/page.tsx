'use client'

import React, {useEffect, useState} from "react";
import SportCenterService from "@/services/api/sportCenter/SportCenterService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

type Params = {
    params: {
        id: number
    }
}

const SportCenterEditPage: React.FC<Params> = ({params: {id}}) => {

    const [sportCenter, setSportCenter] = useState<SportCenter>();

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
                <form className={`form`}>

                    {/* Name */}
                    <div className="formGroup">
                        <label>Nombre:</label>
                        <input type="text" name="name" id="name" value={sportCenter.name}/>
                    </div>

                    {/* City */}
                    <div className="formGroup">
                        <label>Nombre:</label>
                        <input type="text" name="name" id="name" value={sportCenter.city.name} disabled={true}/>
                    </div>

                    {/* Street */}
                    <div className="formGroup">
                        <label>Nombre:</label>
                        <input type="text" name="name" id="name" value={sportCenter.street}/>
                    </div>

                    {/* Postal code */}
                    <div className="formGroup">
                        <label>Código postal:</label>
                        <input type="number" name="postalCode" id="postalCope"  value={sportCenter.postalCode}/>
                    </div>

                    {/* N courts */}
                    <div className={`formGroup`}>
                        <label htmlFor="">Total de pistas/canchas</label>
                        <input type="number" name="nCourts" id="nCourts" value={sportCenter.nCourts} disabled={true}/>
                    </div>
                </form>
            </div>

            <table className={'table table-bordered table-hover'}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Identificador</th>
                        <th>Deporte</th>
                        <th>Nº de pista/cancha</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    sportCenter.courts?.map((court) => (
                        <tr key={court.id}>
                            <th>{court.id}</th>
                            <td>{court.identifier}</td>
                            <td>{court.sport}</td>
                            <td>{court.number}</td>
                            <td>{court.enable ? 'Activa' : 'No activa'}</td>
                            <td className={'text-center'}>
                                <button className={'btn btn-success'}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default SportCenterEditPage;
