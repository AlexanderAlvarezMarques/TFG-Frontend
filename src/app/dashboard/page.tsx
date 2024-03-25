'use client'

import React, {useEffect, useState} from 'react'
import UserService from "@/services/api/UserService";
import {useDispatch, useSelector} from "react-redux";
import { HTTP_STATUS } from "@/enums/HttpStatus";
import { InfoCard } from "@/partials/MatchReserveInfo";

// CSS
import '@/assets/sass/pages/dashboard.scss';

export default function DashBoardPage() {

    const dispatch = useDispatch();
    const user = useSelector((state: StorageState) => state.user)
    const [ dashboard, setDashboard ] = useState<Dashboard|null>(null);

    const generateReserveCard = (a: (DashboardReserve)[]) => {
        return (
            <div className={'dashboard-content'}>
                {a.map((item: DashboardReserve) => (
                        <InfoCard key={item.id} reserve={item as DashboardReserve} />
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
            <div className="dashboard">
                {
                    dashboard ?
                        (
                            <>
                                <section>
                                    <div className={'title'}>Partidos anteriores</div>
                                    {generateReserveCard(dashboard.games.history)}
                                </section>
                                <section>
                                    <div className={'title'}>Proximos partidos</div>
                                    {generateReserveCard(dashboard.games.next)}
                                </section>
                                <section>
                                    <div className={'title'}>Reservas anteriores</div>
                                    {generateReserveCard(dashboard.reserves.history)}
                                </section>
                                <section>
                                    <div className={'title'}>Reservas activas</div>
                                    {generateReserveCard(dashboard.reserves.active)}
                                </section>
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
