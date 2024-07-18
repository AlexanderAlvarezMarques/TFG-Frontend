'use client'

import React, {FormEvent, useEffect, useState} from "react";
import Modal from "@/components/modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import FormatTextTools from "@/utils/FormatTextTools";
import SportCenterService from "@/services/api/sportCenter/SportCenterService";
import {MessageBandColorEnum, useMessagePopup} from "@/components/Context/MessagePopupContext";
import MasterDataReader from "@/components/storage/MasterDataReader";
import MasterDataTools from "@/utils/MasterDataTools";
import {setMasterData} from "@/redux/reducers/masterDataReducers";

import "@/assets/sass/components/Modal/createSportCenterModal.scss";

type CreateSportCenterProps = {
    action: Function
}

type CreateSportCenterOptions = {
    provinces: Province[],
    cities: City[]
}

const CreateSportCenterModal: React.FC<CreateSportCenterProps> = ({ action }) => {

    const masterData = useSelector((state: StorageState) => state.masterData);
    const { openPopup } = useMessagePopup();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [province, setProvince] = useState(-1)
    const [city, setCity] = useState(-1);
    const [street, setStreet] = useState("");
    const [postalCode, setPostalCode] = useState("")

    const [options, setOptions] = useState<CreateSportCenterOptions>({
        provinces: masterData.provinces,
        cities: []
    });

    const resetValues = () => {
        setName("");
        setProvince(-1);
        setCity(-1);
        setStreet("");
        setPostalCode("");
    }

    const onChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        const selectedProvince = options.provinces.find((province) => province.id === value);
        if (selectedProvince) {
            setCity(-1);
            setOptions((prevState) => ({
                ...prevState,
                cities: selectedProvince.cities
            }));
        }
    }

    const createSportCenterAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await SportCenterService.createSportCenter(name, city, street, postalCode);
        if (response !== null) {
            openPopup("Centro deportivo creado", MessageBandColorEnum.GREEN);
            action(response);
            resetValues();
            setIsModalOpen(false);
            const {provinces, cities, sports} = await MasterDataTools.readMasterData();
            dispatch(setMasterData({provinces, cities, sports}));
        }
    }

    useEffect(() => {
        if (masterData.provinces.length > 0) {
            setOptions({
                provinces: masterData.provinces,
                cities: []
            });
        }
    }, [masterData]);

    if (!isModalOpen) {
        return <button className={`btn btn-success`} onClick={() => setIsModalOpen(true)}>Crear centro deportivo</button>
    }

    return (
        <Modal onClose={() => setIsModalOpen(false)} >
            <form className={`form createEditSportCenter`} onSubmit={createSportCenterAction}>

                {/* Name */}
                <div className="formGroup">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required={true}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="formGroup">
                    <label>Provincia:</label>
                    <select
                        name="province"
                        onChange={onChangeProvince}
                        required={true}
                    >
                        {
                            province === -1 &&
                            <option value="-1">...</option>
                        }
                        {
                            options.provinces.map((province) =>
                                <option key={province.id} value={province.id}>{FormatTextTools.capitalizeFirstChar(province.name)}</option>
                            )
                        }
                    </select>
                </div>

                {/* city */}
                <div className="formGroup">
                    <label>Ciudad:</label>
                    <select
                        name="city"
                        onChange={(e) => setCity(Number(e.target.value))}
                        required={true}
                    >
                        {
                            city === -1 &&
                            <option value="-1">...</option>
                        }
                        {
                            options.cities.map((city) =>
                                <option key={city.id} value={city.id}>{FormatTextTools.capitalizeFirstChar(city.name)}</option>
                            )
                        }
                    </select>
                </div>

                {/* Street */}
                <div className="formGroup">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="street"
                        id="street"
                        required={true}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </div>

                {/* Postal code */}
                <div className="formGroup">
                    <label>Codigo postal:</label>
                    <input
                        type="text"
                        name="postalCode"
                        required={true}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>

                <div className="formGroup">
                    <input type="submit" className={`btn btn-success`} value="Crear"/>
                </div>

            </form>
        </Modal>
    )
}

export default CreateSportCenterModal;
