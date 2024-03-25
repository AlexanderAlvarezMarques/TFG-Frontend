import React from 'react';
import Link from "next/link";
import {format} from "date-fns";
import ReserveParticipantService from "@/services/api/ReserveParticipantService";
import {HTTP_STATUS} from "@/enums/HttpStatus";

type InfoCardProps = {
    reserve: DashboardReserve;
}

export const InfoCard: React.FC<InfoCardProps> = ({ reserve }) => {

    const sportCenter = reserve.court.sportCenter;
    const court = reserve.court;
    const sport = court.sport;

    const startDate = new Date(reserve.startDate);
    const endDate = new Date(reserve.endDate);

    const formattedStartDate = format(startDate, 'd MM yyyy');
    const formattedStartHour = format(startDate, 'HH:mm');
    const formattedEndHour = format(endDate, 'HH:mm');
    const formattedSport = sport.charAt(0).toUpperCase() + sport.slice(1).toLowerCase();

    const requestJoin = async (reserveId: number) => {
        const requestJoin = await ReserveParticipantService.requestJoin(reserveId)

        const {status, data} = requestJoin;

        console.log(status, data);
    }

    return (
        <div className="card">
            <div key={reserve.id} className="card-body">
                {/* TODO: Add image of sport center or sport designed to this match. */}
                {/* <div className="image"></div> */}
                <h3 className="card-title">
                    {sportCenter.name}
                </h3>
                <h5 className="card-subtitle text-muted">
                    {formattedStartHour + ' - ' + formattedEndHour}
                </h5>
                <div className="content">
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
                </div>
                <div>
                    <Link href={`/reserves/${reserve.id}`}>
                        <button className="btn btn-primary">Details</button>
                    </Link>
                </div>
                { !reserve.isParticipant &&
                <div>
                    <button className={`btn btn-primary`} onClick={() => requestJoin(reserve.id)}>+</button>
                </div>
                }
            </div>
        </div>
    );
};
