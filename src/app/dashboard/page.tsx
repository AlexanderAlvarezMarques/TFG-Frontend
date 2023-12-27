'use client'

import React, {useEffect, useState} from 'react'
import UserService from "@/services/api/UserService";
import {useDispatch, useSelector} from "react-redux";
import { HTTP_STATUS } from "@/enums/HttpStatus";
import { setUser } from "@/redux/reducers/userReducers";
import {ReserveInfo, MatchInfo} from "@/partials/MatchReserveInfo";

export default function DashBoardPage() {

    const dispatch = useDispatch();
    const user = useSelector((state: StorageState) => state.user)
    const [ dashboard, setDashboard ] = useState<Dashboard|null>(null);

    const generateReserveOrMatchContent = (a: (Match|Reserve)[], b: boolean) => {
        return (
            <div className={b ? 'games' : 'reserves'}>
                {a.map((item: Reserve|Match) => (
                        b
                        ? <MatchInfo key={item.id} match={item as Match} />
                        : <ReserveInfo key={item.id} reserve={item as Reserve} />
                ))}
            </div>
        )
    }

    useEffect(() => {
        async function requestPageData() {
            let dashboard = await UserService.getUserDashboard();
            if (dashboard.status === HTTP_STATUS.OK) {
                setDashboard(dashboard.data)
            }
        }

        requestPageData()
    }, [dispatch]);

    return (
        <>
            <div className="reserve_and_matches">
                {
                    dashboard ?
                        (
                            <>
                                <h2>Partidos anteriores</h2>
                                {generateReserveOrMatchContent(dashboard.games.history, true)}
                                <h2>Proximos partidos</h2>
                                {generateReserveOrMatchContent(dashboard.games.next, true)}
                                <h2>Reservas anteriores</h2>
                                {generateReserveOrMatchContent(dashboard.reserves.history, false)}
                                <h2>Reservas activas</h2>
                                {generateReserveOrMatchContent(dashboard.reserves.active, false)}
                            </>
                        ) :
                        (
                            "Loading ..."
                        )
                }
            </div>
        </>
    )
}
