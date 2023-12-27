import React from 'react';
import Link from "next/link";
import {format} from "date-fns";

type InfoCardProps = {
    data: {
        id: number,
        locationDetails: {
            sportCenter: {
                name: string,
            },
            court: {
                type: string,
                number: number,
            },
        },
        startDate: Date,
        endDate: Date,
    },
    isMatch: boolean,
};

type MatchInfoProps = {
    match: Match;
};

type ReserveInfoProps = {
    reserve: Reserve;
};

const InfoCard: React.FC<InfoCardProps> = ({ data, isMatch }) => {
    const { id, locationDetails, startDate, endDate } = data;

    const formattedStartDate = format(startDate, 'd MMM yyyy');
    const formattedEndDate = format(endDate, 'd MMM yyyy');
    const formattedStartHour = format(startDate, 'HH:mm');
    const formattedEndHour = format(endDate, 'HH:mm');

    return (
        <div className="card">
            <div key={id} className="card-body">
                {/* TODO: Add image of sport center or sport designed to this match. */}
                {/* <div className="image"></div> */}
                <h3 className="card-title">
                    {locationDetails.sportCenter.name}
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
                                <td>{locationDetails.court.type}</td>
                            </tr>
                            <tr>
                                <td>Court/field nº</td>
                                <td>{locationDetails.court.number}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <Link href={`/reserves/${data.id}`}><button className="btn btn-primary">Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export const MatchInfo = ({ match }: MatchInfoProps) => {

    const cardData = {
        id: match.id,
        locationDetails: {
            sportCenter: {
                name: match.reserve.locationDetails.sportCenter.name
            },
            court: {
                type: match.reserve.locationDetails.court.type,
                number: match.reserve.locationDetails.court.number
            }
        },
        startDate: new Date(match.reserve.startDate),
        endDate: new Date(match.reserve.endDate),
    };

    return <InfoCard data={cardData} isMatch={true} />;
};

export const ReserveInfo = ({ reserve }: ReserveInfoProps) => {

    const startDate = new Date(reserve.startDate);
    const endDate = new Date(reserve.endDate);

    const cardData = {
        id: reserve.id,
        locationDetails: {
            sportCenter: {
                name: reserve.court.sportCenter.name
            },
            court: {
                type: reserve.court.type,
                number: reserve.court.number
            }
        },
        startDate: startDate,
        endDate: endDate,
    }

    return <InfoCard data={cardData} isMatch={false} />;
};
