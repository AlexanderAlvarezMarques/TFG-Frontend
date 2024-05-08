import React, {useEffect, useState} from "react";

import Modal from "@/components/Modal/Modal";
import DatePicker from "react-datepicker";
import SportCenterService from "@/services/api/SportCenterService";
import RenderReserveAvailability from "@/components/Modal/Reserve/RenderReserveAvailability";

// CSS
import styles from "@/assets/sass/components/Modal/createReserve.module.scss";

interface LocalStorageData {
    provinces: Province[];
    cities: City[];
    sports: Sport[];
}

interface SelectList {
    provinces: Province[];
    cities: City[];
    sports: Sport[];
    sportCenters: SportCenter[];
}

interface SelectedOptions {
    province: number,
    city: number,
    sportCenter: number,
    sport: string,
    date: Date,
}

const CreateReserveModal = () => {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [showModal, setShowModal] = React.useState(false);

    const modalButton = (
        <button className={`btn btn-primary ${styles.createReserveBtn}`} onClick={() => setShowModal(true)}>
            +
        </button>
    );

    const [localStorageData, setLocalStorageData] = useState<LocalStorageData>();

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [sportCenters, setSportCenters] = useState<SportCenter[]>([]);
    const [sports, setSports] = useState<Sport[]>([]);

    const [province, setProvince] = useState<number>(-1);
    const [city, setCity] = useState<number>(-1);
    const [sportCenter, setSportCenter] = useState<number>(-1);
    const [sport, setSport] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());

    const [reserves, setReserves] = useState<CourtSchedule[]>([]);

    // Fetch initial data
    useEffect(() => {
        const provinces = localStorage.getItem('provinces') ?? '[]';
        const cities = localStorage.getItem('cities') ?? '[]';
        const sports = localStorage.getItem('sports') ?? '[]';
        const token = localStorage.getItem('token') ?? undefined;

        setLocalStorageData({
            provinces: JSON.parse(provinces),
            cities: JSON.parse(cities),
            sports: JSON.parse(sports),
        });

        setProvinces(JSON.parse(provinces));
        setIsUserLoggedIn(token != undefined);
    }, []);

    useEffect(() => {
        const provinces = localStorageData?.provinces.filter((p: Province) => p.id == province) ?? [];
        if (provinces.length > 0) {
            const cities = provinces[0].cities ?? [];
            if (cities.length > 0) {
                setCities(cities);
                setCity(cities[0].id ?? -1);
            } else {
                setCities([]);
                setCity(-1);
            }
        } else {
            setCities([]);
            setCity(-1);
        }
    }, [localStorageData?.provinces, province]);

    useEffect(() => {
        const cities = localStorageData?.cities.filter((c: City) => c.id == city) ?? [];
        if (cities.length > 0) {
            const sportCenters = cities[0].sportCenters ?? [];
            if (sportCenters.length > 0) {
                setSportCenters(sportCenters);
                setSportCenter(sportCenters[0].id);
            } else {
                setSportCenters([]);
                setSportCenter(-1);
            }
        } else {
            setSportCenters([]);
            setSportCenter(-1);
        }
    }, [city, localStorageData?.cities]);

    useEffect(() => {
        const getSports = async () => {
            const sports = await SportCenterService.getSports(sportCenter);
            setSports(sports);
            setSport(sports[0].name ?? '');
        }

        if (sportCenter != -1)
            getSports();
        else
            setSports([]);
    }, [sportCenter]);

    const handleReserveAvailability = (e: any) => {
        e.preventDefault();

        const getReservesAvailable = async () => {
            const reserves = await SportCenterService.getReservesAvailable(sportCenter, sport, date);
            setReserves(reserves);
        }

        getReservesAvailable();
    }

    const modal = (
        <Modal onClose={() => setShowModal(false)}>
            <form className={`form ${styles.form}`} onSubmit={handleReserveAvailability}>

                {/* Province */}
                <div className={`formGroup ${styles.formGroup}`}>
                    <label>Provincia:</label>
                    <select
                        id="province"
                        name="province"
                        required={true}
                        onChange={(e) => setProvince(Number(e.target.value))}
                    >
                        {
                            province == -1 && (
                                <option value="">...</option>
                            )
                        }
                        {
                            provinces.map((p: Province, index: number) => (
                                <option key={index} value={p.id}>{p.name}</option>
                            ))
                        }
                    </select>
                </div>

                {/* City */}
                {
                    province != -1 && (
                        <div className={`formGroup ${styles.formGroup}`}>
                            <label>Ciudad:</label>
                            <select
                                id="city"
                                name="city"
                                onChange={(e) => setCity(Number(e.target.value))}
                                required={true}
                            >
                                {
                                    city == -1 && (
                                        <option value="">...</option>
                                    )
                                }
                                {
                                    cities.map((c: City, index: number) => (
                                        <option key={index} value={c.id}>{c.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    )
                }

                {/* Sport center */}
                {
                    city != -1 && (
                        sportCenters.length > 0 ? (
                            <div className={`formGroup ${styles.formGroup}`}>
                                <label>Centro deportivo:</label>
                                <select
                                    id="sportCenter"
                                    name="sportCenter"
                                    onChange={(e) => setSportCenter(Number(e.target.value))}
                                    required={true}
                                >
                                    {
                                        sportCenters.map((s: SportCenter, index: number) => (
                                            <option key={index} value={s.id}>{s.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        ) : (
                            <div>
                                <p>No se han encontrado centro deportivos</p>
                            </div>
                        )
                    )
                }

                {/* Sport */}
                {
                    sportCenter != -1 && sportCenters.length > 0 && (
                        <div className={`formGroup ${styles.formGroup}`}>
                            <label>Deporte:</label>
                            <select
                                name="sport"
                                id="sport"
                                required={true}
                                onChange={(e) => setSport(e.target.value)}
                            >
                                {
                                    sports.map((s: Sport, index: number) => (
                                        <option key={index} value={s.name}>{s.name[0].toUpperCase() + s.name.slice(1).toLowerCase()}</option>
                                    ))
                                }
                            </select>
                        </div>
                    )
                }

                {/* Date */}
                {
                    sportCenter != -1 && sportCenters.length > 0 && (
                        <div className={`formGroup ${styles.formGroup}`}>
                            <label>Fecha:</label>
                            <DatePicker
                                selected={date}
                                onChange={(date: Date) => setDate(date)}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                className={`customInput datePicker`}
                                popperClassName={`datePickerPopper`}
                                isClearable={false}
                                required={true}
                            />
                        </div>
                    )
                }

                {/* Submit */}
                {
                    sportCenter != -1 && sportCenters.length > 0 && (
                        <div className={`formGroup ${styles.formGroup}`}>
                            <input type="submit" value="Buscar" className="btn btn-primary"/>
                        </div>
                    )
                }
            </form>

            {/*{ reservesAvailable }*/}
            {
                reserves.length > 0 ? <RenderReserveAvailability sport={sport} courts={reserves} date={date}/> : <></>
            }
        </Modal>
    );

    if (isUserLoggedIn)
        return showModal ? modal : modalButton;
    else
        return <></>;
};

export default CreateReserveModal
