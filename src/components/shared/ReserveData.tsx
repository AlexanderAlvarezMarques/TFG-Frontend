import React, {memo, useEffect} from "react";
import Link from "next/link";
import {Reserve} from "@/types/reserves";
import FormatDateTools from "@/utils/FormatDateTools";
import FormatTextTools from "@/utils/FormatTextTools";
import ReserveParticipantService from "@/services/api/reserve/ReserveParticipantService";
import ReserveService from "@/services/api/reserve/ReserveService";
import ReserveStatusEnum from "@/enum/ReserveStatusEnum";
import Image from "next/image";

import paddleImage from "@/assets/images/sports/paddle_001.jpg";
import tennisImage from "@/assets/images/sports/tennis_001.jpg";
import footballImage from "@/assets/images/sports/football_001.jpg";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";

type ReserveCardProps = {
    reserve: Reserve,
    onChangeAction: Function|undefined,
    checkIsParticipant?: boolean
}

const ReserveCard: React.FC<ReserveCardProps> = memo(({reserve, onChangeAction, checkIsParticipant = false}) => {

    const router = useRouter();
    const auth = useSelector((state: StorageState) => state.authorization);

    const startDate = new Date(reserve.startDate);
    const endDate = new Date(reserve.endDate);

    const reserveDay = FormatDateTools.formatDateWithoutTime(startDate);
    const startHour = FormatDateTools.formatHour(startDate);
    const endHour = FormatDateTools.formatHour(endDate);

    const isFarFromStartDate = startDate.getTime() > (Date.now() + (30 *60 * 1000));

    const checkAuth = () => {
        if (!auth.isLogged) router.push('/login');
    }

    const joinReserveAction = async () => {
        checkAuth();
        const response = await ReserveParticipantService.requestJoin(reserve.id);
        if (response && onChangeAction) {
            reserve.isParticipant = true;
            onChangeAction(reserve);
        }
    }

    const cancelJoinAction = async () => {
        const response = await ReserveParticipantService.cancelJoin(reserve.id);
        if (response && onChangeAction) {
            reserve.isParticipant = false;
            onChangeAction(reserve);
        }
    }

    const deleteReserveAction = async () => {
        const response = await ReserveService.deleteReserve(reserve.id);
        if (response && onChangeAction) {
            reserve.status = ReserveStatusEnum.CANCELED;
            onChangeAction(reserve);
        }
    }

    if (
        reserve.status === 'CANCELED' ||
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
                        src={
                            reserve.sport === 'PADDLE' ? paddleImage :
                                reserve.sport === 'TENNIS' ? tennisImage : footballImage
                        }
                        alt={`Sport type image`}
                        width={200}
                        height={200}
                    />
                </div>
                <div className="content">
                    <h3 className="card-title">
                        {reserve.court.sportCenter.name}
                    </h3>
                    <h5 className="card-subtitle text-muted text-center my-2">
                        {startHour + ' - ' + endHour}
                    </h5>

                    <table className={`w-100`}>
                        <tbody>
                        <tr>
                            <td>Fecha</td>
                            <td className={`text-end`}>{reserveDay}</td>
                        </tr>
                        <tr>
                            <td>Deporte</td>
                            <td className={`text-end`}>{FormatTextTools.capitalizeFirstChar(reserve.sport)}</td>
                        </tr>
                        <tr>
                            <td>Nº pista/cancha</td>
                            <td className={`text-end`}>{reserve.court.number}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={`linkButtons`}>
                        <Link href={`/reserves/${reserve.id}`}>
                            <button className="btn btn-primary">Detalles</button>
                        </Link>

                        {
                            isFarFromStartDate && (
                                <>
                                    {
                                        reserve.isOwner ? (
                                            <button className={`btn btn-danger`}
                                                    onClick={deleteReserveAction}>Cancelar
                                            </button>
                                        ) : (
                                            <>
                                                {reserve.isParticipant ? (
                                                    <button className={`btn btn-danger`}
                                                            onClick={cancelJoinAction}>Abandonar
                                                    </button>
                                                ) : (
                                                    <button className={`btn btn-success`}
                                                            onClick={joinReserveAction}>Unirse
                                                    </button>
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
    )

})

ReserveCard.displayName = "ReserveCard";

export default ReserveCard;
