'use client'

import React, {useEffect, useState} from "react";
import {Reserve} from "@/types/reserves";
import UserService from "@/services/api/user/UserService";
import {UserDashboardFilterEnum} from "@/enum/UserDashboardQueryParamEnum";
import ReserveCard from "@/components/shared/ReserveData";

import "@/assets/sass/pages/reservations.scss";
import Loading from "@/components/shared/Loading";

const ReservationsPage = () => {

    const searchResultTypeInitialState = {
        data: [],
        pagination: {
            currentPage: Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE),
            itemsPerPage: Number(process.env.NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE),
            maxPage: -1,
            minPage: -1,
            nextPage: -1,
            previousPage: -1
        }
    };

    const [activeReserves, setActiveReserves] = useState<SearchResult<Reserve>>();
    const [historyReserves, setHistoryReserves] = useState<SearchResult<Reserve>>();

    const [selectedTab, setSelectedTab] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const loadMoreAction = async () => {
        if (selectedTab === 0 && activeReserves) {
            const response = await UserService.getUserDashboard(UserDashboardFilterEnum.ACTIVE_RESERVES, activeReserves.pagination.nextPage, activeReserves.pagination.itemsPerPage);
            setActiveReserves((prevState) => {
                if (prevState) {
                    return {
                        data: [...prevState.data, response.data],
                        pagination: response.pagination
                    }
                }
                return prevState;
            });
        }

        if (selectedTab === 1 && historyReserves) {
            const response = await UserService.getUserDashboard(UserDashboardFilterEnum.HISTORY_RESERVES, historyReserves.pagination.nextPage, historyReserves.pagination.itemsPerPage);
            setHistoryReserves((prevState) => {
                if (prevState) {
                    return {
                        data: [...prevState.data, response.data],
                        pagination: response.pagination
                    }
                }
                return prevState;
            });
        }
    }

    useEffect(() => {
        const requestActiveReserves = async () => {
            const response = await UserService.getUserDashboard(UserDashboardFilterEnum.ACTIVE_RESERVES, 1, 10);
            if (response !== null) setActiveReserves(response);
        }

        const requestHistoryReserves = async () => {
            const response = await UserService.getUserDashboard(UserDashboardFilterEnum.HISTORY_RESERVES, 1, 10);
            if (response !== null) setHistoryReserves(response);
        }

        requestActiveReserves().then()
        requestHistoryReserves().then()
        setIsLoading(false);
    }, []);

    return isLoading ?
        <Loading/> :
        (
        <div className={`reservations`}>
            <div className={`tabs`}>
                <div className={`tab ${selectedTab === 0 ? 'active' : ''}`} onClick={() => setSelectedTab(0)}>
                    Reservas Activas ({activeReserves?.data.length})
                </div>
                <div className={`tab ${selectedTab === 1 ? 'active' : ''}`} onClick={() => setSelectedTab(1)}>
                    Reservas anteriores ({historyReserves?.data.length})
                </div>
            </div>
            <div className={`reservationsContent`}>
                {
                    selectedTab === 0 ?
                        activeReserves?.data.map((reserve) => {
                            return <ReserveCard key={reserve.id} reserve={reserve} onChangeAction={undefined}/>
                        }) :
                        historyReserves?.data.map((reserve) => {
                            return <ReserveCard key={reserve.id} reserve={reserve} onChangeAction={undefined}/>
                        })
                }
                {
                    (selectedTab === 0 && activeReserves && activeReserves.pagination.currentPage < activeReserves.pagination.maxPage) ||
                    (selectedTab === 1 && historyReserves && historyReserves.pagination.currentPage < historyReserves.pagination.maxPage) && (
                        <div className={`loadMore`}>
                            <button className={`btn btn-success`}>Cargar más</button>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default ReservationsPage;
