'use client'

import Modal from "@/components/modal/Modal";
import React, {FormEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import SportCenterService from "@/services/api/sportCenter/SportCenterService";
import DatePicker from "react-datepicker";

import styles from "@/assets/sass/components/Modal/createReserve.module.scss"
import FormatTextTools from "@/utils/FormatTextTools";
import RenderReserveAvailability from "@/components/modal/CreateReserveModal/RenderReserveAvailability";

import 'react-datepicker/dist/react-datepicker.css';

interface CreateReserveFormValues {
    provinces: Province[]
    cities: City[]
    sportCenters: SportCenter[]
    sports: Sport[]
}

const CreateReserveModal = () => {

    const auth = useSelector((state: StorageState) => state.authorization);
    const masterData = useSelector((state: StorageState) => state.masterData);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formOptions, setFormOptions] = useState<CreateReserveFormValues>({
        provinces: [],
        cities: [],
        sportCenters: [],
        sports: []
    });

    const [province, setProvince] = useState(-1);
    const [city, setCity] = useState(-1);
    const [sportCenter, setSportCenter] = useState(-1);
    const [sport, setSport] = useState('');
    const [date, setDate] = useState<Date|null>(null);
    const [reserves, setReserves] = useState<CourtSchedule[]>([]);

    const onOpenModal = () => {
        window.scroll({top: 0, behavior: 'smooth'});
        setIsModalOpen(true);
    }

    const onChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvince(Number(e.target.value));
        setFormOptions((prevState) => {
            const selectedProvince = masterData.provinces.find((p) => p.id === Number(e.target.value));
            return selectedProvince ? {
                ...prevState,
                cities: selectedProvince.cities,
                sports: [],
                sportCenters: []
            } : prevState;
        });

        setCity(-1);
        setSportCenter(-1);
        setSport('');
    }

    const onChangeCity = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCity(Number(e.target.value));
        setFormOptions((prevState) => {
            const selectedCity = masterData.cities.find((c) => c.id === Number(e.target.value));
            const sportCenters = selectedCity?.sportCenters;
            return selectedCity ? {
                ...prevState,
                sportCenters: selectedCity.sportCenters ?? [],
                sports: []
            } : prevState;
        });

        setSportCenter(-1);
        setSport('');
    }

    const onChangeSportCenter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSportCenter(Number(e.target.value));
        if (Number(e.target.value) !== -1) {
            const sports = await SportCenterService.getAvailableSports(Number(e.target.value));
            setFormOptions((prevState) => ({
                ...prevState,
                sports: sports
            }));
        }
    }

    const onChangeSport = (e: React.ChangeEvent<HTMLSelectElement>) => setSport(e.target.value);

    const onChangeDate = async (e: Date) => {
        const reservesAvailable = await SportCenterService.getReservesAvailable(sportCenter, sport, e);
        setDate(e);
        setReserves(reservesAvailable !== null ? reservesAvailable : null);
    }

    const createReserveAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    useEffect(() => {
        setFormOptions({
            provinces: masterData.provinces,
            cities: [],
            sportCenters: [],
            sports: []
        })
    }, [masterData]);

    useEffect(() => {
        setProvince(-1);
        setCity(-1);
        setSportCenter(-1);
        setSport("");
        setDate(null);
        setReserves([]);
    }, [isModalOpen]);

    useEffect(() => {
        if (date !== null) {
            const hours = date.getHours();
            if (hours >= 8 && hours < 22) {
                date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15);
            } else {
                date.setMinutes(0);
                date.setHours(hours < 8 ? 8 : 22);
            }
        }
    }, []);

    return auth.isLogged ? isModalOpen ?
        (
            <Modal onClose={() => setIsModalOpen(false)} >

                <h2 className={'text-center text-decoration-underline'}>Crear reserva</h2>

                <form className={`form ${styles.form}`} onSubmit={createReserveAction}>

                    {/* Provinces */}
                    <div className={`formGroup ${styles.formGroup}`}>
                        <label>Provincia:</label>
                        <select id="province" name="province" required={true} onChange={onChangeProvince}>
                            {
                                province == -1 && (
                                    <option value="">...</option>
                                )
                            }
                            {
                                formOptions.provinces.map((p: Province, index: number) => (
                                    <option key={index} value={p.id}>{p.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* City */}
                    <div className={`formGroup ${styles.formGroup}`}>
                        <label htmlFor="city">Ciudad</label>
                        <select name="city" id="city" className={`form-select`} disabled={province === -1} onChange={onChangeCity} value={city}>
                            {
                                city === -1 &&
                                <option value="">...</option>
                            }
                            {
                                formOptions.cities.map((city) =>
                                    <option key={city.id} value={city.id}>{city.name} </option>
                                )
                            }
                        </select>
                    </div>

                    {/*  Sport center  */}
                    <div className={`formGroup ${styles.formGroup}`}>
                        <label htmlFor="sportCenter">Centro deportivo</label>
                        <select name="sportCenter" id="sportCenter" className={`form-select`} disabled={city === -1} onChange={onChangeSportCenter}>
                            {
                                sportCenter === -1 &&
                                <option value="">...</option>
                            }
                            {
                                formOptions.sportCenters.map((sc) =>
                                    <option key={sc.id} value={sc.id}>{sc.name}</option>
                                )
                            }
                        </select>
                    </div>

                    {/*  Sport  */}
                    <div className={`formGroup ${styles.formGroup}`}>
                        <label htmlFor="sport">Deporte</label>
                        <select name="sport" id="sport" className={`form-select`} disabled={sportCenter === -1} onChange={onChangeSport} value={sport}>
                            {
                                sport === "" &&
                                <option value="">...</option>
                            }
                            {
                                formOptions.sports.map((sport) =>
                                    <option key={sport.name} value={sport.name}>{FormatTextTools.capitalizeFirstChar(sport.name)}</option>
                                )
                            }
                        </select>
                    </div>

                    {/* Date */}
                    <div className={`formGroup ${styles.formGroup}`}>
                        <label>Día</label>
                        <DatePicker
                            selected={date}
                            minDate={new Date()}
                            onChange={onChangeDate}
                            dateFormat="dd/MM/yyyy"
                            className={`datePicker`}
                            isClearable={false}
                            required={true}
                            disabled={sport === ''}
                        />
                    </div>

                </form>

                {
                    reserves.length > 0 && date !== null && <RenderReserveAvailability sport={sport} courts={reserves} date={date} />
                }
            </Modal>
        ) :
            <button className={`btn btn-primary ${styles.openModalButton}`} onClick={onOpenModal}>+</button>
        : <></>
}

export default CreateReserveModal;
