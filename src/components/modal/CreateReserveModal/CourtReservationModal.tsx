import Modal from "@/components/modal/Modal";
import {useState} from "react";
import {format} from "date-fns";

import ReserveService from "@/services/api/reserve/ReserveService";

type Props = {
    onClose: () => void
    courtId: number;
    courtNumber: number;
    date: Date;
    hour: string;
    minute: string;
};

const CourtReservationModal = ({onClose, courtId, courtNumber, date, hour, minute}: Props) => {

    const [showModal, setShowModal] = useState<boolean>(true);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [reserveId, setReserveId] = useState<number>(0);

    const onCloseModal = () => {
        setShowModal(false);
        onClose();
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        const response = await ReserveService.createReserve(courtId, date, Number(hour), Number(minute), Number(e.target.duration.value));
        if (response) onCloseModal();
        else console.log("Fallo al crear reserva");
    }

    return showModal && (
        <Modal onClose={() => onCloseModal()}>
            <form className={'form'} onSubmit={submitForm}>
                <div className={'formGroup'}>
                    <label>Cancha/Pista:</label>
                    <input type={'text'} value={courtNumber} disabled={true}/>
                </div>
                <div className={'formGroup'}>
                    <label>Fecha:</label>
                    <input type={'text'} value={format(date, "dd/MM/yyyy")} disabled={true}/>
                </div>
                <div className={'formGroup'}>
                    <label>Hora:</label>
                    <input type={'text'} value={`${hour}:${minute}`} disabled={true}/>
                </div>

                <div className={'formGroup'}>
                    <label>Duración (min):</label>
                    <select name="duration">
                        <option value="30">30</option>
                        <option value="60">60</option>
                        <option value="90">90</option>
                        <option value="120">120</option>
                        <option value="150">150</option>
                        <option value="180">180</option>
                    </select>
                </div>

                <div className={'formGroup'}>
                    <input type="submit" value="Reservar" className={'btn btn-primary'}/>
                </div>
            </form>

            {error && (
                <div className={'alert alert-danger'}>
                    <p>{errorMessage}</p>
                </div>
            )}

            {success && (
                <div className={'alert alert-success'}>
                    <p>Reserva creada correctamente</p>
                    <a href={`/reserves/${reserveId}`}>
                        <button type="button" value="Cerrar" className={'btn btn-primary'}>Cerrar</button>
                    </a>
                </div>
            )}
        </Modal>
    );
};

export default CourtReservationModal;
