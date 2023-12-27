import React, {useEffect, useState} from "react";

import "@/assets/sass/_modals.scss";
import Modal from "@/components/Modal/Modal";
import ReserveService from "@/services/api/ReserveService";

const CreateReserveModal = () => {

    const [showModal, setShowModal] = React.useState(false);

    const modalButton = (
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            +
        </button>
    );

    // Attributes
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [sports, setSports] = useState<Sport[]>([]);
    const [sportCenters, setSportCenters] = useState<SportCenter[]>([]);

    const [province, setProvince] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [sport, setSport] = useState<string>("");
    const [sportCenter, setSportCenter] = useState<string>("");

    const [reservesAvailable, setReservesAvailable] = useState<Reserve[]>([]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // const reserves = await ReserveService.getReservesAvailable(province, city, sport, sportCenter, date);
    }

    useEffect(() => {
        // Fetch cities and sports data
        const fetchMasterData = async () => {
            const sports = JSON.parse(localStorage.getItem('sports') || '[]');
            const cities = JSON.parse(localStorage.getItem('cities') || '[]');
            const provinces = JSON.parse(localStorage.getItem('provinces') || '[]');

            setSports(sports);
            setCities(cities);
            setProvinces(provinces);
        };

        fetchMasterData();
    }, []);

    const modal = (
        <Modal onClose={() => setShowModal(false)}>
            <form className={'form'}>

                {/* Province */}
                <div className="formGroup">
                    <label htmlFor="name">Provincia:</label>
                    <select name="state" id="state" onChange={(e) => setProvince(e.target.value)}>

                        { !province && (
                            <option value="" selected>...</option>
                        )}

                        {
                            provinces.map((p: Province, index: number) => (
                                <option key={index} value={p.id}>{p.name}</option>
                            ))
                        }
                    </select>
                </div>

                {/* City */}
                { province && (
                <div className="formGroup">
                    <label htmlFor="name">Ciudad:</label>
                    <select name="state" id="state">
                        {
                            cities.map((c: City, index: number) => (
                                <option key={index} value={c.id}>{c.name}</option>
                            ))
                        }
                    </select>
                </div>
                )}

                {/* Sport */}
                <div className="formGroup">
                    <label htmlFor="name">Deporte:</label>
                    <select name="state" id="state">
                        {
                            sports.map((s: Sport, index: number) => (
                                <option key={index} value={s.name}>{s.name[0].toUpperCase() + s.name.slice(1).toLowerCase()}</option>
                            ))
                        }
                    </select>
                </div>

                {/* Submit */}
                <div className="formGroup">
                    <input type="submit" value="Buscar" className="btn btn-primary"/>
                </div>
            </form>

            <div className={`reserve-availability`}>
                {/*{ reservesAvailable }*/}
            </div>
        </Modal>
    );

    return showModal ? modal : modalButton;
};

export default CreateReserveModal
