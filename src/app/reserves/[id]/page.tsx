'use client'

import React, {useEffect, useState} from "react";
import ReserveService from "@/services/api/reserve/ReserveService";
import {Reserve, ReserveParticipant, ReserveRate} from "@/types/reserves";
import FormatDateTools from "@/utils/FormatDateTools";
import PLAYER_STATUS_ENUM from "@/enum/PlayerStatusEnum";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import ReserveParticipantService from "@/services/api/reserve/ReserveParticipantService";

// CSS
import "@/assets/sass/pages/reserveDetails.scss";

type Params = {
    params: {
        id: number
    }
}

const ReserveDetailsPage: React.FC<Params> = ({params: {id}}) => {

    const router = useRouter();

    const [error, setError] = useState(false);
    const [reserve, setReserve] = useState<Reserve|null>(null);

    function generateSportCenterDetails() {
        if (!reserve || reserve.court.sportCenter === undefined) return null;
        const sportCenter = reserve.court.sportCenter

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
        if (!reserve) return null;
        if (reserve.court === undefined) return null;

        const startDate = new Date(reserve.startDate);
        const court = reserve.court;

        return (
            <table>
                <tbody>
                <tr>
                    <td className={`header`}>Fecha:</td>
                    <td>{FormatDateTools.formatDateWithoutTime(startDate)}</td>
                </tr>
                <tr>
                    <td className={`header`}>Hora:</td>
                    <td>{FormatDateTools.formatHour(startDate)}</td>
                </tr>
                <tr>
                    <td className={`header`}>Pista:</td>
                    <td>{court.number}</td>
                </tr>
                <tr>
                    <td className={`header`}>Deporte:</td>
                    <td>{court.sport}</td>
                </tr>
                <tr>
                    <td className={`header`}>Estado:</td>
                    <td>{reserve.status}</td>
                </tr>
                { reserve.isOwner && (
                    <tr>
                        <td className={`cancelReserve`} colSpan={2}>
                            <button className={'btn btn-danger'} onClick={() => deleteReserveAction()}>Cancelar reserva</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }

    function generateParticipantContent() {
        if (!reserve) return null;
        if (reserve.participants === undefined) return null;
        const participants: ReserveParticipant[] = reserve.participants;

        console.log(participants);

        return (
            <>
                <table>
                    <thead>
                    <tr>
                        <th>Jugador</th>
                        <th>Estatus</th>
                        {reserve.isOwner && (
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
                            {reserve.isOwner && (reserve.owner && reserve.owner.username !== participant.participant.username) && (
                                <td className={'reserveDetailsActionButtons'}>
                                    {(participant.status === PLAYER_STATUS_ENUM.REQUESTED || participant.status === PLAYER_STATUS_ENUM.REJECTED) && !reserve.isFull && (
                                        <>
                                            <button className="btn btn-success accept"
                                                    onClick={() => acceptParticipantAction(participant.participant.id)}>
                                                <FontAwesomeIcon icon={faCheck}/>
                                            </button>
                                        </>
                                    )}

                                    {(participant.status === PLAYER_STATUS_ENUM.ACCEPTED || participant.status === PLAYER_STATUS_ENUM.REQUESTED) && (
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
        if (!reserve) return null;
        const rates: ReserveRate[] = reserve.reserveRates;
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
            const response = await ReserveService.deleteReserve(reserve.id);
            if (response) router.push("/dashboard");
        }
    }

    const acceptParticipantAction = async (participantId: number) => {
        if (reserve) {
            const response = await ReserveParticipantService.acceptJoinRequest(reserve.id, participantId);
            if (response !== null) updateParticipants(response);
        }
    }

    const rejectParticipantAction = async (participantId: number) => {
        if (reserve) {
            const response = await ReserveParticipantService.rejectJoinRequest(reserve.id, participantId);
            if (response !== null) updateParticipants(response);
        }
    }

    function updateParticipants(data: ReserveParticipant) {
        if (reserve !== null) {
            const updatedParticipants = reserve.participants?.map(rp => {
                return rp.participant.id === data.participant.id ?
                    {
                        ...rp,
                        status: data.status
                    } :
                    rp;
                }
            );

            setReserve((prevState) => {
                if (!prevState) return prevState; // Si es null, retorna el estado sin cambios

                return {
                    ...prevState,
                    isFull: data.reserve.isFull,
                    participants: updatedParticipants
                };
            });
        }
    }

    useEffect(() => {
        const requestReserve = async () => {
            const response = await ReserveService.getReserve(id);
            if (response !== null) setReserve(response);
        }

        requestReserve().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) {
        return (
            <div className={`reserve`}>
                <div>
                    No se ha podido encontrar la reserva o no existe.
                </div>
            </div>
        )
    }

    return reserve && (
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
}

export default ReserveDetailsPage;
