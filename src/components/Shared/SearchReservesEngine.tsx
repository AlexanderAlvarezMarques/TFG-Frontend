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

interface DataList {
    provinces: Province[];
    cities: City[];
    sports: Sport[];
}

interface FormProps {
    province: number,
    city: number,
    sport: string,
    date: Date
}

type Options = {
    id?: number,
    name: string
}

export default function SearchReservesEngine(props: Props) {

    // Hooks
    const router = useRouter();
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState<FormProps>({
        province: props.province ? Number(props.province) : -1,
        city: props.city ? Number(props.city) : -1,
        sport: props.sport ?? '',
        date: props.date ? new Date(props.date) : new Date(),
    })

    const [dataList, setDataList] = useState<DataList>({
        provinces: [],
        cities: [],
        sports: []
    });

    // Auxiliary constants
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const today = new Date();
    const minTime = new Date(0, 0, 0, 8, 0);
    const maxTime = new Date(0, 0, 0, 23, 0);

    // Pagination
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: props.page ?? 1,
        previousPage: -1,
        nextPage: -1,
        maxPage: -1,
        minPage: -1,
        itemsPerPage: Number(process.env.DEFAULT_ITEMS_PER_PAGE)
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {province, city, sport, date } = formData;
        const formattedDate = format(date, 'yyyy-MM-dd') + 'T' + format(date, 'HH:mm');
        const queryParams = `province=${province}&city=${city}&sport=${sport}&date=${formattedDate}` //&page=${props.page}`;

        if (!props.setData && formData.city !== -1) {
            router.push(`/reserves/search?${queryParams}`);
        } else {
            searchReserves();
        }
    };

    const searchReserves = async () => {
        if (props.setData) {
            const { city, sport, date } = formData;

            setIsLoading(true);
            date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15);
            const reserves = await ReserveService.searchReserves(city, sport, date, props.page);
            setIsLoading(false);

            props.setData(reserves.data);
        }
    }

    useEffect(() => {
        // Fetch cities and sports data
        const provinces = JSON.parse(localStorage.getItem('provinces') ?? '[]');
        const cities = JSON.parse(localStorage.getItem('cities') ?? '[]');
        const sports = JSON.parse(localStorage.getItem('sports') ?? '[]');

        setDataList({ provinces, cities, sports });

        // Check if there are query parameters
        const queryParams = Object.fromEntries(searchParams.entries());
        if (queryParams.province) {
            const selectedProvinceId = parseInt(queryParams.province);

            // Set the cities based on the selected province
            const selectedProvince = provinces.find((province: any) => province.id === selectedProvinceId);
            if (selectedProvince) {
                const newCities = selectedProvince.cities || [];
                setDataList((prevDataList) => ({
                    ...prevDataList,
                    cities: newCities
                }));

                // Set city in formData if present in query params
                if (queryParams.city) {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        city: parseInt(queryParams.city),
                    }));
                }
            }
        }

        if (queryParams.sport) {
            console.log("Query param");
            setFormData((prevFormData) => ({
                ...prevFormData,
                sport: queryParams.sport,
            }));
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            province: props.province ? Number(props.province) : -1,
            city: props.city ? Number(props.city) : -1,
            sport: (props.sport && props.sport.length > 0) ? props.sport : sports[0].name,
            date: props.date ? new Date(props.date) : new Date(),
        }));

        const ceilDate = formData.date;
        ceilDate.setMinutes(Math.ceil(ceilDate.getMinutes() / 15) * 15);
        setFormData((prevFormData) => ({ ...prevFormData, ceilDate }));

        const loadReserves = () => {
            if (searchParams.get('city') && searchParams.get('sport') && searchParams.get('date') && props.setData) {
                searchReserves();
            }
        };

        loadReserves();
    }, []);

    useEffect(() => {
        searchReserves();
    }, [props.page]);

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        const { provinces } = dataList;

        const selectedProvince = provinces.find((province) => province.id === parseInt(value));
        if (selectedProvince) {

            const newCities = selectedProvince.cities;

            setFormData((prevFormData) => ({
                ...prevFormData,
                province: selectedProvince.id,
                city: newCities.length > 0 ? newCities[0].id : -1,
            }));

            setDataList((prevLocalStorageData) => ({
                ...prevLocalStorageData,
                cities: newCities
            }));
        }
    };

    const handleDateChange = (date: Date) => {
        setFormData((prevFormData) => ({ ...prevFormData, date }));
    };

    return (
        <div className={styles.searchEngine}>
            <form className={`form ${styles.searchEngineForm}`} onSubmit={handleSubmit}>

                {/* Province */}
                <div className={`formGroup ${styles.formGroup}`}>
                    <label htmlFor="state">Provincia</label>
                    <select
                        name="province"
                        id="province"
                        onChange={handleProvinceChange}
                        value={formData.province}
                    >
                        {
                            formData.province == -1 && (
                                <option value="">...</option>
                            )
                        }
                        {
                            dataList.provinces.map((p: Options, index: number) => (
                                <option key={index} value={p.id}>{p.name}</option>
                            ))
                        }
                    </select>
                </div>

                {/* City */}
                <div className={`formGroup ${styles.formGroup}`}>
                    <label htmlFor="state">Ciudad</label>
                    <select
                        name="city"
                        id="city"
                        onChange={handleInputChange}
                        value={formData.city}
                    >
                        {
                            formData.city == -1 && (
                                <option value="">...</option>
                            )
                        }
                        {
                            formData.province != -1 &&
                            (dataList.cities.map((c: Options, index: number) => (
                                <option key={index} value={c.id}>{c.name}</option>
                            )))
                        }
                    </select>
                </div>

                {/* Day */}
                <div className={`formGroup ${styles.formGroup}`}>
                    <label htmlFor="">Día</label>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={today}
                        className={`customInput datePicker`}
                        popperClassName={`datePickerPopper`}
                        isClearable={false}
                        required={true}
                    />
                </div>

                {/*Hour */}
                <div className={`formGroup ${styles.formGroup}`}>
                    <label htmlFor="time">Hora</label>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
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
                <div className={`formGroup ${styles.formGroup}`}>
                    <label htmlFor="">Deporte</label>
                    <select name="sport" id="sport"  value={formData.sport} onChange={handleInputChange}>
                        {dataList.sports.map((s: Options, index: number) => (
                            <option key={index}
                                    value={s.name}>{s.name[0].toUpperCase() + s.name.slice(1).toLowerCase()}</option>
                        ))}
                    </select>
                </div>

                {/* Submit */}
                <div className={`formGroup ${styles.searchButton}`}>
                    <input type="submit" value={`${isLoading ? "..." : "Buscar"}`} className={`btn btn-primary ${styles.btn}`} disabled={formData.province === -1 && formData.city === -1}/>
                </div>
            </form>
        </div>
    )
};
