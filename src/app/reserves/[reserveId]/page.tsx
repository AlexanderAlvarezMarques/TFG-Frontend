'use client'

import ReserveService from "@/services/api/ReserveService";
import {useEffect, useState} from "react";
import {el} from "date-fns/locale";
import {useSelector} from "react-redux";

type Params = {
    params: {
        reserveId: number
    }
}

export default function ReserveDetailsPage({params: {reserveId}}: Params) {

    const [reserve, setReserve] = useState<Reserve|null>(null);

    useEffect(() => {
        const requestReserveData = async () => {
            const reserveData = await ReserveService.getReserve(reserveId);
            setReserve(reserveData.data);
            console.log(reserveData.data);
        }

        requestReserveData();
    }, [reserveId]);

    const response = (
        <div className={`reserve`}>
            <div className={`title`}>
                Reserva #{reserve?.id}
            </div>
            <div>
                Fecha: {reserve?.startDate}
            </div>
        </div>
    )

    return response;
};
