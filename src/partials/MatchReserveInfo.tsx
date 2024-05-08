import React from 'react';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Link from "next/link";

import Image from "next/image";
import paddleImage from "../assets/images/sports/paddle_001.jpg";
import tennisImage from "../assets/images/sports/tennis_001.jpg";
import footballImage from "../assets/images/sports/football_001.jpg";

import ReserveParticipantService from "@/services/api/ReserveParticipantService";
import ReserveService from "@/services/api/ReserveService";

import { MessageBandColorEnum, useMessagePopup } from "@/components/Context/MessagePopupContext";

type InfoCardProps = {
    reserve: ReserveDetails,
    onChangeAction?: Function,
    checkIsParticipant?: boolean
}

export const InfoCard: React.FC<InfoCardProps> = ({ reserve , onChangeAction, checkIsParticipant = false}) => {

    const userData = useSelector((state: StorageState) => state.user);
    const authentication = useSelector((state: StorageState) => state.authorization);
    const router = useRouter();

    const sportCenter = reserve.court.sportCenter;
    const court = reserve.court;
    const sport = court.sport;

    const startDate = new Date(reserve.startDate);
    const endDate = new Date(reserve.endDate);
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 30);
    const closeToStartDate = startDate > currentDate;

    const formattedStartDate = format(startDate, 'd MM yyyy');
    const formattedStartHour = format(startDate, 'HH:mm');
    const formattedEndHour = format(endDate, 'HH:mm');
    const formattedSport = sport.charAt(0).toUpperCase() + sport.slice(1).toLowerCase();

    // Message popup
    const { openPopup } = useMessagePopup();

    const requestJoin = async (reserveId: number) => {
        if (!authentication.isLogged) {
            router.push('/signin');
        } else {
            const responseData = await ReserveParticipantService.requestJoin(reserveId)

            if (responseData && !Array.isArray(responseData)) {
                reserve.isParticipant = true;
                if (onChangeAction) onChangeAction(reserve);

                openPopup("Solicitud enviada", MessageBandColorEnum.GREEN);
            }
        }

    }

    const cancelJoin = async (reserveId: number) => {
        const responseData = await ReserveParticipantService.cancelJoin(reserveId, userData.id);

        if (responseData && !Array.isArray(responseData)) {

            console.log(reserve);

            reserve.isParticipant = false;
            reserve.participants = reserve.participants?.map((participant) => {
                console.log(participant);
                if (participant.participant.id === userData.id) {
                    participant.status = 'canceled';
                }
                return participant;
            });

            if (onChangeAction) onChangeAction(reserve);

            openPopup("Solicitud cancelada", MessageBandColorEnum.GREEN);
        }
    }

    const cancelReserve = async (reserveId: number) => {
        const responseData = await ReserveService.deleteReserve(reserveId);

        if (responseData && !Array.isArray(responseData)) {
            reserve.status = 'CANCELED';
            if (onChangeAction) onChangeAction(reserve);

            openPopup("Reserva cancelada", MessageBandColorEnum.GREEN);
        }
    }

    if (
        reserve.status === 'CANCELED' ||
        reserve.status === 'EXPIRED' ||
        (checkIsParticipant && !reserve.isParticipant)
    ) {
        return (
            <></>
        );
    }

    return (
        <div className="card">
            <div key={reserve.id} className="card-body">
                {/* TODO: Add image of sport center or sport designed to this match. */}
                <div className="image">
                    <Image
                        src={reserve.sport === 'PADDLE' ? paddleImage : (
                            reserve.sport === 'TENNIS' ? tennisImage : footballImage
                        )}
                        alt={`Sport center image`}
                        width={200}
                        height={200}
                    />
                </div>
                <div className="content">
                    <h3 className="card-title">
                        {sportCenter.name}
                    </h3>
                    <h5 className="card-subtitle text-muted">
                        {formattedStartHour + ' - ' + formattedEndHour}
                    </h5>

                    <table>
                        <tbody>
                        <tr>
                            <td>Date</td>
                            <td>{formattedStartDate}</td>
                        </tr>
                        <tr>
                            <td>Sport</td>
                            <td>{formattedSport}</td>
                        </tr>
                        <tr>
                            <td>Court/field nº</td>
                            <td>{court.number}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={`linkButtons`}>
                        <Link href={`/reserves/${reserve.id}`}>
                            <button className="btn btn-primary">Details</button>
                        </Link>

                        {
                            closeToStartDate && (
                                <>
                                    {
                                        reserve.isOwner ? (
                                            <>
                                                <div className={`mt-1`}>
                                                    <button className={`btn btn-danger`}
                                                            onClick={() => cancelReserve(reserve.id)}>Cancelar reserva
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {reserve.isParticipant ? (
                                                    <div className={`mt-1`}>
                                                        <button className={`btn btn-danger`} onClick={() => cancelJoin(reserve.id)}>Abandonar</button>
                                                    </div>
                                                ) : (
                                                    <div className={`mt-1`}>
                                                        <button className={`btn btn-success`} onClick={() => requestJoin(reserve.id)}>Unirse</button>
                                                    </div>
                                                )}
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
