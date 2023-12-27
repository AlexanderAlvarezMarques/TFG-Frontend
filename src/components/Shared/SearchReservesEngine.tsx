'use client'

// CSS
import 'react-datepicker/dist/react-datepicker.css';
import "@/assets/sass/search-engine.scss"

// Imports
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {usePathname, useRouter} from "next/navigation";
import {format} from "date-fns";
import Select from "react-select/base";

// Services
import ReserveService from "@/services/api/ReserveService";
import MasterService from "@/services/api/MasterService";

type Props = {
    setData?: Function,
    city?: string,
    sport?: string,
    date?: Date,
    page: number,
    limit?: number,
}

type Options = {
    id?: number,
    name: string
}

export default function SearchReservesEngine(props: Props) {

    // Hooks
    const router = useRouter();
    const pathName = usePathname();
    const [cities, setCities] = useState<Options[]>([]);
    const [sports, setSports] = useState<Options[]>([]);

    // Auxiliary constants
    const {setData} = props;
    const today = new Date();
    const minTime = new Date(0, 0, 0, 8, 0);
    const maxTime = new Date(0, 0, 0, 23, 0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Form parameters
    const [city, setCity] = useState<string>(props.city ?? "");
    const [sport, setSport] = useState<string>(props.sport ?? "");
    const [date, setDate] = useState<Date>(props.date ?? new Date());
    const [time, setTime] = useState<Date>(props.date ?? date);

    time.setMinutes(Math.ceil(time.getMinutes() / 15) * 15);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!setData) {
            const formattedDate = format(date as Date, "yyyy/MM/dd");
            const formattedTime = format(time as Date, "HH:mm");
            const queryParams = `city=${city}&sport=${sport}&date=${formattedDate}&time=${formattedTime}&page=${props.page}`;
            router.push(`/reserves/search?${queryParams}`);
        } else {
            setIsLoading(true);
            const reserves = await ReserveService.searchReserves(city, sport, date, time, props.page);
            setIsLoading(false);

            setData(reserves.data);
        }
    };

    useEffect(() => {
        // Fetch cities and sports data
        const fetchMasterData = async () => {

            const cities = JSON.parse(localStorage.getItem("cities") ?? "[]");
            const sports = JSON.parse(localStorage.getItem("sports") ?? "[]");

            setCities(cities);
            setSports(sports);
        };

        fetchMasterData();
    }, []);

    return (
        <div className={`searchEngine`}>
            <form className={`form searchEngineForm`} onSubmit={handleSubmit}>
                {/* City */}
                <div className={`formGroup`}>
                    <label htmlFor="state">Ciudad</label>
                    <select name="city" id="city" onChange={(e:any) => setCity(e.target.value)} value={city}>
                        {cities.map((c: Options, index: number) => (
                            <option key={index} value={c.id}>{c.name}</option>
                        ))}
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
                        selected={time}
                        onChange={(time: Date) => setTime(time)}
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
                    <select name="sport" id="sport" onChange={(e: any) => setSport(e.target.value)}  value={sport}>
                        {sports.map((s: Options, index: number) => (
                            <option key={index} value={s.name}>{s.name[0].toUpperCase() + s.name.slice(1).toLowerCase()}</option>
                        ))}
                    </select>
                </div>

                {/* Submit */}
                <div className={`formGroup searchButton`}>
                    <input type="submit" value={`${isLoading ? "..." : "Buscar"}`} className={`btn btn-primary`}/>
                </div>
            </form>
        </div>
    )
};
