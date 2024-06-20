'use client'

import React, {useEffect, useState} from "react";
import {Reserve} from "@/types/reserves";
import UserService from "@/services/api/user/UserService";
import {UserDashboardFilterEnum} from "@/enum/UserDashboardQueryParamEnum";
import ReserveCard from "@/components/shared/ReserveData";

import "@/assets/sass/pages/reservations.scss";

const MatchesPage = () => {

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

    const [activeMatches, setActiveMatches] = useState<SearchResult<Reserve>>();
    const [historyMatches, setHistoryMatches] = useState<SearchResult<Reserve>>();

    const [selectedTab, setSelectedTab] = useState(0);

    const loadMoreAction = async () => {
        if (selectedTab === 0 && activeMatches) {
            const response = await UserService.getUserDashboard(UserDashboardFilterEnum.ACTIVE_GAMES, activeMatches.pagination.nextPage, activeMatches.pagination.itemsPerPage);
            setActiveMatches((prevState) => {
                if (prevState) {
                    return {
                        data: [...prevState.data, response.data],
                        pagination: response.pagination
                    }
                }
                return prevState;
            });
        }

        if (selectedTab === 1 && historyMatches) {
            const response = await UserService.getUserDashboard(UserDashboardFilterEnum.HISTORY_GAMES, historyMatches.pagination.nextPage, historyMatches.pagination.itemsPerPage);
            setHistoryMatches((prevState) => {
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
        const requestActiveGames = async () => {
            const response = await UserService.getUserDashboard(UserDashboardFilterEnum.ACTIVE_GAMES, 1, 10);
            if (response !== null) setActiveMatches(response);
        }

        const requestHistoryGames = async () => {
            const response = await UserService.getUserDashboard(UserDashboardFilterEnum.HISTORY_GAMES, 1, 10);
            if (response !== null) setHistoryMatches(response);
        }

        requestActiveGames().then()
        requestHistoryGames().then()
    }, []);

    useEffect(() => {
        console.log("Active matches", activeMatches);
        console.log("History matches", historyMatches);
    }, [selectedTab]);

    return (
        <div className={`reservations`}>
            <div className={`tabs`}>
                <div className={`tab ${selectedTab === 0 ? 'active' : ''}`} onClick={() => setSelectedTab(0)}>
                    Partidos activos ({activeMatches?.data.length})
                </div>
                <div className={`tab ${selectedTab === 1 ? 'active' : ''}`} onClick={() => setSelectedTab(1)}>
                    Partidos anteriores ({historyMatches?.data.length})
                </div>
            </div>
            <div className={`reservationsContent`}>
                {
                    selectedTab === 0 ?
                        activeMatches?.data.map((reserve) => {
                            return <ReserveCard key={reserve.id} reserve={reserve} onChangeAction={undefined}/>
                        }) :
                        historyMatches?.data.map((reserve) => {
                            console.log("Match", reserve)
                            return <ReserveCard key={reserve.id} reserve={reserve} onChangeAction={undefined}/>
                        })
                }
                {
                    (selectedTab === 0 && activeMatches && activeMatches.pagination.currentPage < activeMatches.pagination.maxPage) ||
                    (selectedTab === 1 && historyMatches && historyMatches.pagination.currentPage < historyMatches.pagination.maxPage) && (
                        <div className={`loadMore`}>
                            <button className={`btn btn-success`}>Cargar más</button>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default MatchesPage;
