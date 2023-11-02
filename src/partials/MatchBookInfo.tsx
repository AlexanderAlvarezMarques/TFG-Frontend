import React from 'react';
import Link from "next/link";

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
        startDate: string,
        startHour: string,
        endDate: string,
        endHour: string
    },
    isMatch: boolean,
};

type MatchInfoProps = {
    match: Match;
};

type BookInfoProps = {
    book: Book;
};

const InfoCard: React.FC<InfoCardProps> = ({ data, isMatch }) => {
    const { id, locationDetails, startDate, startHour } = data;

    return (
        <div className="card">
            <div key={id} className="card-body">
                {/* TODO: Add image of sport center or sport designed to this match. */}
                {/* <div className="image"></div> */}
                <h3 className="card-title">
                    {locationDetails.sportCenter.name}
                </h3>
                <h5 className="card-subtitle text-muted">
                    {data.startHour + '- ' + data.endHour}
                </h5>
                <div className="content">
                    <table>
                        <tr>
                            <td>Date</td>
                            <td>{data.startDate}</td>
                        </tr>
                        <tr>
                            <td>Sport</td>
                            <td>{locationDetails.court.type}</td>
                        </tr>
                        <tr>
                            <td>Court/field nº</td>
                            <td>{locationDetails.court.number}</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <Link href={`/match/${data.id}`}><button className="btn btn-primary">Details</button></Link>
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
                name: match.book.locationDetails.sportCenter.name
            },
            court: {
                type: match.book.locationDetails.court.type,
                number: match.book.locationDetails.court.number
            }
        },
        startDate: match.book.startDate,
        startHour: match.book.startHour,
        endDate: match.book.endDate,
        endHour: match.book.endHour
    };

    return <InfoCard data={cardData} isMatch={true} />;
};

export const BookInfo = ({ book }: BookInfoProps) => {
    return <InfoCard data={book} isMatch={false} />;
};
