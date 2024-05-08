import React, {FormEvent, useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';

interface SearchFormSelectOptionsData {
    provinces: Province[]
    cities: City[]
    sports: Sport[]
}

const SearchForm: React.FC<SearchEngineParams> = (
    {province = -1, city = -1, date = new Date(), sport = "", action}) => {

    // Check date time
    const hours = date.getHours();
    if (hours >= 8 && hours < 22) {
        date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15);
    } else {
        date.setMinutes(0);
        date.setHours(hours < 8 ? 8 : 22);
    }

    const [formData, setFormData] = useState<SearchEngineParams>({
        province: province,
        city: city,
        date: date,
        sport: sport
    });

    const [options, setOptions] = useState<SearchFormSelectOptionsData>({
        provinces: JSON.parse(localStorage.getItem('provinces') ?? '[]') as Province[],
        cities: [],
        sports: JSON.parse(localStorage.getItem('sports') ?? '[]') as Sport[]
    });

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const minTime = new Date(0, 0, 0, 8, 0, 0);
    const maxTime = new Date(0, 0, 0, 22, 0, 0);

    const onChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setFormData((prevState) => ({
            ...prevState,
            province: value
        }));

        const selectedProvince = options.provinces.find((province) => province.id === value);
        if (selectedProvince) {
            setOptions((prevState) => ({
                ...prevState,
                cities: selectedProvince.cities
            }));

            setFormData((prevState) => ({
                ...prevState,
                city: -1
            }));
        }
    }

    const onChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setFormData((prevState) => ({
            ...prevState,
            city: value
        }));
    }

    const onChangeDate = (e: Date) => {
        const value = e;
        setFormData((prevState) => ({
            ...prevState,
            date: value
        }));
    }

    const onChangeSport = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            sport: value
        }));
    }

    const submitAction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (action) action(formData);
    }

    useEffect(() => {
        setIsSubmitDisabled(
            formData.province === -1 ||
            formData.city === -1 ||
            formData.sport === ""
        )
    }, [formData]);

    useEffect(() => {
        if (formData.province !== -1) {

            const selectedProvince = options.provinces.find((province) => province.id === formData.province);

            if (selectedProvince)
                setOptions((prevState) => ({
                    ...prevState,
                    cities: selectedProvince.cities
                }));
        }
    }, []);

    return (
        <form onSubmit={submitAction}>

            {/* Province */}
            <div className={`formGroup province`}>
                <label htmlFor="province">Provincia</label>
                <select
                    name="province"
                    id="province"
                    className={`form-select`}
                    onChange={onChangeProvince}
                    value={formData.province}
                >

                    {
                        formData.province === -1 &&
                        <option value="-1">...</option>
                    }
                    {
                        options?.provinces.map((province) =>
                            <option
                                key={province.id}
                                value={province.id}
                            >
                                {province.name}
                            </option>
                        )
                    }

                </select>
            </div>

            {/* City */}
            <div className={`formGroup city`}>
                <label htmlFor="city">Ciudad</label>
                <select
                    name="city"
                    id="city"
                    className={`form-select`}
                    disabled={formData.province === -1}
                    onChange={onChangeCity}
                    value={formData.city}
                >

                    {
                        formData.city === -1 &&
                        <option value="">...</option>
                    }
                    {
                        options?.cities.map((city) =>
                            <option
                                key={city.id}
                                value={city.id}>
                                {city.name}
                            </option>
                        )
                    }

                </select>
            </div>

            {/* Date */}
            <div className={`formGroup date`}>
                <label>Día</label>
                <DatePicker
                    selected={formData.date}
                    onChange={onChangeDate}
                    dateFormat="dd/MM/yyyy"
                    className={`datePicker`}
                    isClearable={false}
                    required={true}
                />
            </div>

            {/* Hour */}
            <div className={`formGroup hour`}>
                <label htmlFor="time">Hora</label>
                <DatePicker
                    selected={formData.date}
                    onChange={onChangeDate}
                    timeCaption={"Hora"}
                    closeOnScroll={true}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    className={`hourPicker`}
                    isClearable={false}
                    minTime={minTime}
                    maxTime={maxTime}
                />
            </div>

            {/* Sport */}
            <div className={`formGroup sport`}>
                <label htmlFor="sport">Deporte</label>
                <select
                    name="sport"
                    id="sport"
                    className={`form-select`}
                    onChange={onChangeSport}
                    value={formData.sport}
                >

                    {
                        sport === "" &&
                        <option value="">...</option>
                    }
                    {
                        options?.sports.map((sport) =>
                            <option key={sport.name} value={sport.name}>{sport.name}</option>
                        )
                    }

                </select>
            </div>

            {/* Submit */}
            <div className={`formGroup submit`}>
                <input className={`btn btn-primary`} type="submit" value="Buscar" disabled={isSubmitDisabled}/>
            </div>

        </form>
    )

}

export default SearchForm;
