'use client'

// CSS
import 'react-datepicker/dist/react-datepicker.css';
import styles from "@/assets/sass/components/searchEngine.module.scss"

// Imports
import React, {FormEvent, useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {useRouter, useSearchParams} from "next/navigation";
import { format } from "date-fns";

// Services
import ReserveService from "@/services/api/ReserveService";

type Props = {
    page: number,
    limit?: number,
    setData?: Function,
    province?: string,
    city?: string,
    sport?: string,
    date?: Date,
}

interface LocalStorageData {
    provinces: Province[];
    cities: City[];
    sports: Sport[];
}

type Options = {
    id?: number,
    name: string
}

export default function SearchReservesEngine(props: Props) {

    const [localStorageData, setLocalStorageData] = useState<LocalStorageData>();

    // Hooks
    const router = useRouter();
    const searchParams = useSearchParams();
    const [provinces, setProvinces] = useState<Options[]>([]);
    const [cities, setCities] = useState<Options[]>([]);
    const [sports, setSports] = useState<Options[]>([]);

    // Auxiliary constants
    const {setData} = props;
    const today = new Date();
    const minTime = new Date(0, 0, 0, 8, 0);
    const maxTime = new Date(0, 0, 0, 23, 0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Form parameters
    const [province, setProvince] = useState<number>(Number(props.province ?? -1));
    const [city, setCity] = useState<number>(Number(props.city));
    const [sport, setSport] = useState<string>(props.sport ?? "");
    const [date, setDate] = useState<Date>(props.date ? new Date(props.date) : new Date());

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!setData) {
            const formattedDate = format(date as Date, "yyyy-MM-dd") + "T" + format(date as Date, "HH:mm");
            const queryParams = `province=${province}&city=${city}&sport=${sport}&date=${formattedDate}&page=${props.page}`;
            router.push(`/reserves/search?${queryParams}`);
        } else {
            searchReserves();
        }
    };

    const searchReserves = async () => {
        if (setData) {
            setIsLoading(true);
            date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15);
            const reserves = await ReserveService.searchReserves(city, sport, date, props.page);
            setIsLoading(false);

            setData(reserves.data);
        }
    }

    useEffect(() => {
        // Fetch cities and sports data
        const fetchMasterData = async () => {

            const provinces = localStorage.getItem('provinces') ?? '[]';
            const cities = localStorage.getItem('cities') ?? '[]';
            const sports = localStorage.getItem('sports') ?? '[]';

            setLocalStorageData({
                provinces: JSON.parse(provinces),
                cities: JSON.parse(cities),
                sports: JSON.parse(sports),
            });

            setProvinces(JSON.parse(provinces));
            setCities(JSON.parse(cities));
            setSports(JSON.parse(sports));

            if (props.province) {
                setProvince(Number(props.province));
            } else if (provinces.length !== 0) {
                setProvince(-1);
            }

            if (props.city) {
                setCity(Number(props.city));
            } else if (cities.length !== 0) {
                setCity(cities[0].id);
            }

            if (props.sport) {
                setSport(props.sport);
            } else if (sports.length !== 0) {
                setSport(sports[0].name);
            }

            if (props.date) setDate(new Date(props.date));
            date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15);

            loadReserves();
        };

        const loadReserves = async () => {
            if (
                searchParams.get('city') &&
                searchParams.get('sport') &&
                searchParams.get('date') &&
                setData
            ) {
                searchReserves();
            }
        }

        fetchMasterData();
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
    }, [province]);

    return (
        <div className={styles.searchEngine}>
            <form className={`form ${styles.searchEngineForm}`} onSubmit={handleSubmit}>

                {/* Province */}
                <div className={`formGroup`}>
                    <label htmlFor="state">Ciudad</label>
                    <select
                        name="province"
                        id="province"
                        onChange={(e: any) => setProvince(Number(e.target.value))}
                        defaultValue={province}
                    >
                        {
                            province == -1 && (
                                <option value="">...</option>
                            )
                        }
                        {
                            provinces.map((p: Options, index: number) => (
                                <option key={index} value={p.id}>{p.name}</option>
                            ))
                        }
                    </select>
                </div>

                {/* City */}
                <div className={`formGroup`}>
                    <label htmlFor="state">Ciudad</label>
                    <select
                        name="city"
                        id="city"
                        onChange={(e: any) => setCity(Number(e.target.value))}
                        defaultValue={city}
                    >
                        {
                            city == -1 && (
                                <option value="">...</option>
                            )
                        }
                        {
                            cities.map((c: Options, index: number) => (
                                <option key={index} value={c.id}>{c.name}</option>
                            ))
                        }
                    </select>
                </div>

                {/* Day */}
                <div className={`formGroup`}>
                    <label htmlFor="">Día</label>
                    <DatePicker
                        selected={date}
                        onChange={(date: Date) => setDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={today}
                        className={`customInput datePicker`}
                        popperClassName={`datePickerPopper`}
                        isClearable={false}
                        required={true}
                    />
                </div>

                {/*Hour */}
                <div className={`formGroup`}>
                    <label htmlFor="time">Hora</label>
                    <DatePicker
                        selected={date}
                        onChange={(time: Date) => setDate(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="HH:mm"
                        timeFormat="HH:mm"
                        minTime={minTime}
                        maxTime={maxTime}
                        className={`customInput timePicker`}
                        popperClassName={`timePickerPopper`}
                        isClearable={false}
                    />
                </div>

                {/* Sport */}
                <div className={`formGroup`}>
                    <label htmlFor="">Deporte</label>
                    <select name="sport" id="sport" onChange={(e: any) => setSport(e.target.value)} value={sport}>
                        {sports.map((s: Options, index: number) => (
                            <option key={index}
                                    value={s.name}>{s.name[0].toUpperCase() + s.name.slice(1).toLowerCase()}</option>
                        ))}
                    </select>
                </div>

                {/* Submit */}
                <div className={`formGroup ${styles.searchButton}`}>
                    <input type="submit" value={`${isLoading ? "..." : "Buscar"}`} className={`btn btn-primary`}/>
                </div>
            </form>
        </div>
    )
};
