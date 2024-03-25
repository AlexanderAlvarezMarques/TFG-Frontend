'use client'

import ReserveService from "@/services/api/ReserveService";
import {useEffect, useState} from "react";

// CSS
import "@/assets/sass/pages/reserveDetails.scss";
import {format} from "date-fns";

type Params = {
    params: {
        reserveId: number
    }
}

export default function ReserveDetailsPage({params: {reserveId}}: Params) {

    const [error, setError] = useState<boolean>(false);
    const [reserve, setReserve] = useState<ReserveDetails|null>(null);
    const [court, setCourt] = useState<Court>();
    const [sportCenter, setSportCenter] = useState<SportCenter>();

    useEffect(() => {
        const requestReserveData = async () => {
            const reserveData = await ReserveService.getReserve(reserveId);
            const {status, data } = reserveData;

            if (status !== 200) setError(true);
            else {
                setReserve(data);
                setCourt(data.court);
                setSportCenter(data.court.sportCenter);
            }
        }

        requestReserveData();
    }, [reserveId]);

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
                        <td>Nombre:</td>
                        <td>{sportCenter.name}</td>
                    </tr>
                    <tr>
                        <td>Dirección:</td>
                        <td>{sportCenter.street}, {sportCenter.city.name}, {sportCenter.city.province.name}</td>
                    </tr>
                    <tr>
                        <td>Teléfono:</td>
                        <td>XXX-XX-XX-XX</td>
                    </tr>
                    <tr>
                        <td>Correo electrónico:</td>
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
                        <td>Fecha:</td>
                        <td>{format(startDate, "dd/MM/yyyy")}</td>
                    </tr>
                    <tr>
                        <td>Hora:</td>
                        <td>{format(startDate, "H:i")}</td>
                    </tr>
                    <tr>
                        <td>Pista:</td>
                        <td>{court.number}</td>
                    </tr>
                    <tr>
                        <td>Deporte:</td>
                        <td>{sport}</td>
                    </tr>
                    <tr>
                        <td>Estado:</td>
                        <td>{reserve.status}</td>
                    </tr>
                    </tbody>
                </table>
            </>
        )
    }

    function generateParticipantContent() {
        if (reserve === null) return null;
        const participants = reserve.participants;
        if (participants === undefined) return null;

        return (
            <>
                <table>
                    <tbody>
                    <tr>
                        <td>Jugador</td>
                    </tr>
                    {participants.map((participant, index) => (
                        <tr key={index}>

                            <td>{participant.participant.username}</td>
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
