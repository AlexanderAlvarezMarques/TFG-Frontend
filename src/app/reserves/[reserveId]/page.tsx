'use client'

import ReserveService from "@/services/api/ReserveService";
import {useEffect, useState} from "react";

// CSS
import "@/assets/sass/pages/reserveDetails.scss";
import {format} from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import {PLAYER_STATUS} from "@/enums/PlayerStatus";
import {HTTP_STATUS} from "@/enums/HttpStatus";
import {useRouter} from "next/navigation";

type Params = {
    params: {
        reserveId: number
    }
}

export default function ReserveDetailsPage({params: {reserveId}}: Params) {

    const router = useRouter();

    const [error, setError] = useState<boolean>(false);
    const [reserve, setReserve] = useState<ReserveDetails|null>(null);
    const [participants, setParticipants] = useState<ReserveParticipant[]>([]);
    const [court, setCourt] = useState<Court>();
    const [sportCenter, setSportCenter] = useState<SportCenter>();
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [isFull, setIsFull] = useState<boolean>(false);

    useEffect(() => {
        const requestReserveData = async () => {
            const reserveData = await ReserveService.getReserve(reserveId);
            const {status, data } = reserveData;

            if (status !== 200) setError(true);
            else {
                setReserve(data);
                if (data.participants) setParticipants(data.participants);
                setCourt(data.court);
                setSportCenter(data.court.sportCenter);
                setIsOwner(data.isOwner);
                setIsFull(data.isFull);
            }
        }

        requestReserveData();
    }, []);

    if (error) return (
        <div className={`reserve`}>
            <div>
                No se ha podido encontrar la reserva o no existe.
            </div>
        </div>
    );

    function generateSportCenterDetails() {
        if (sportCenter === undefined) return null;

        return (
            <>
                {/*<div className={'img'}>*/}
                {/*    <img src={reserve?.sportCenter.img} alt={reserve?.sportCenter.name}/>*/}
                {/*</div>*/}
                <table>
                    <tbody>
                    <tr>
                        <td className={`header`}>Nombre:</td>
                        <td>{sportCenter.name}</td>
                    </tr>
                    <tr>
                        <td className={`header`}>Dirección:</td>
                        <td>{sportCenter.street}, {sportCenter.city.name}, {sportCenter.city.province.name}</td>
                    </tr>
                    <tr>
                        <td className={`header`}>Teléfono:</td>
                        <td>XXX-XX-XX-XX</td>
                    </tr>
                    <tr>
                        <td className={`header`}>Correo electrónico:</td>
                        <td>sportcenter@gmail.com</td>
                    </tr>
                    </tbody>
                </table>
            </>
        );
    }

    function generateReserveDetails() {
        if (reserve === null) return null;
        if (court === undefined) return null;

        const startDate = new Date(reserve.startDate);
        let sport = court.sport;

        sport = sport.charAt(0).toUpperCase() + sport.slice(1);

        return (
            <>
                <table>
                    <tbody>
                    <tr>
                        <td className={`header`}>Fecha:</td>
                        <td>{format(startDate, "dd/MM/yyyy")}</td>
                    </tr>
                    <tr>
                        <td className={`header`}>Hora:</td>
                        <td>{format(startDate, "H:i")}</td>
                    </tr>
                    <tr>
                        <td className={`header`}>Pista:</td>
                        <td>{court.number}</td>
                    </tr>
                    <tr>
                        <td className={`header`}>Deporte:</td>
                        <td>{sport}</td>
                    </tr>
                    <tr>
                        <td className={`header`}>Estado:</td>
                        <td>{reserve.status}</td>
                    </tr>
                    <tr>
                        <td className={`cancelReserve`} colSpan={2}>
                            <button className={'btn btn-danger'} onClick={() => deleteReserveAction()}>Cancelar reserva</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </>
        )
    }

    function generateParticipantContent() {
        if (reserve === null) return null;
        if (participants === undefined) return null;

        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Jugador</th>
                            <th>Estatus</th>
                            {isOwner && (
                                <th className={`mw-40`}>Acciones</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                    {participants.map((participant, index) => (
                        <tr key={index}>
                            <td>{participant.participant.username}</td>
                            <td>
                                {
                                    reserve.owner &&
                                    reserve.owner.username === participant.participant.username ?
                                        "Propietario" :
                                        participant.status
                                }
                            </td>
                            {isOwner && (reserve.owner && reserve.owner.username !== participant.participant.username) && (
                                <td className={'reserveDetailsActionButtons'}>
                                    {(participant.status === PLAYER_STATUS.REQUESTED || participant.status === PLAYER_STATUS.REJECTED) && !isFull && (
                                        <>
                                            <button className="btn btn-success accept"
                                                    onClick={() => acceptParticipantAction(participant.participant.id)}>
                                                <FontAwesomeIcon icon={faCheck}/>
                                            </button>
                                        </>
                                    )}

                                    {(participant.status === PLAYER_STATUS.ACCEPTED || participant.status === PLAYER_STATUS.REQUESTED) && (
                                        <button className="btn btn-danger reject"
                                                onClick={() => rejectParticipantAction(participant.participant.id)}>
                                            <FontAwesomeIcon icon={faXmark}/>
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
        )
    }

    function generateRatesContent() {
        if (reserve === null) return null;
        const rates = reserve.reserveRates;
        if (rates === undefined) return null;

        return (
            <>
                <table>
                    <thead>
                    <tr>
                        <th>Jugador</th>
                        <th>Valoración</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rates.map((rate, index) => (
                        <tr key={index}>
                            <td>{rate.participant.username}</td>
                            <td>{rate.rate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
        )
    }

    const deleteReserveAction = async () => {
        if (reserve) {
            const deleteParticipant = await ReserveService.deleteReserve(reserve.id);

            const { status, data } = deleteParticipant;
            if (status === HTTP_STATUS.NOT_CONTENT) {
                router.push("/dashboard");                                                                           
            } else {
                console.log("Error");
                console.log(data);
            }
        }
    }

    const acceptParticipantAction = async (participantId: number) => {
        if (reserve) {
            const deleteParticipant = await ReserveService.acceptParticipantFromReserve(reserve.id, participantId);

            const {status, data} = deleteParticipant;
            if (status == HTTP_STATUS.OK) updateParticipants(data, data.status);
        }
    }

    const rejectParticipantAction = async (participantId: number) => {
        if (reserve) {
            const deleteParticipant = await ReserveService.rejectParticipantFromReserve(reserve.id, participantId);

            const {status, data} = deleteParticipant;
            if (status == HTTP_STATUS.OK) updateParticipants(data, data.status);
        }
    }

    function updateParticipants(data: any, status: string) {

        const id = data.participant.id;
        setIsFull(data.reserve.isFull);

        setParticipants(prevParticipants => prevParticipants.map(p => {
            if (p.participant.id === id) {
                return { ...p, status };
            }
            return p;
        }));
    }

    return reserve !== null && (
        <div className={`reserveDetails`}>
            <section className={'sportCenter'}>
                <div className={'title'}>
                    Centro deportivo
                </div>
                <div className={'content'}>
                    {generateSportCenterDetails()}
                </div>
            </section>
            <section className={'details'}>
                <div className={'title'}>
                    Detalles
                </div>
                <div className={'content'}>
                    {generateReserveDetails()}
                </div>
            </section>
            <section className={'participants'}>
                <div className={'title'}>
                    Participantes
                </div>
                <div className={'content'}>
                    {generateParticipantContent()}
                </div>
            </section>
            <section className={'rates'}>
                <div className={'title'}>
                    Valoraciones ({reserve.averageRate ? reserve.averageRate : '-'})
                </div>
                <div className={'content'}>
                    {generateRatesContent()}
                </div>
            </section>
        </div>
    );
};
