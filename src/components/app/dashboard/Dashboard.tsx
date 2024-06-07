'use client'

import React, { useState } from "react";
import UserService from "@/services/api/user/UserService";
import {UserDashboardFilterEnum, UserDashboardFilterEnumType} from "@/enum/UserDashboardQueryParamEnum";
import {SearchReserveResult} from "@/types/reserves";
import DashboardEngine from "@/components/app/dashboard/DashboardEngine";

type DashboardProps = PaginationConfig & {
    selectedMenu: UserDashboardFilterEnumType
}

const Dashboard: React.FC<DashboardProps> = ({selectedMenu, page, itemsPerPage, action}) => {

    const initData: SearchReserveResult = {
        data: [],
        pagination: {
            currentPage: Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE),
            itemsPerPage: Number(process.env.NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE),
            maxPage: -1,
            minPage: -1,
            nextPage: -1,
            previousPage: -1
        }
    }

    const [activeGames, setActiveGames] = useState<SearchReserveResult>(initData);
    const [historyGames, setHistoryGames] = useState<SearchReserveResult>(initData);
    const [activeReserves, setActiveReserves] = useState<SearchReserveResult>(initData);
    const [historyReserves, setHistoryReserves] = useState<SearchReserveResult>(initData);

    const updateIndividualData = (currentData: SearchReserveResult, newData: SearchReserveResult) => {
        const updatedData: SearchReserveResult = { ...currentData };
        updatedData.pagination = newData.pagination;

        if (newData.data.length > 0) {
            const filteredNewData = newData.data.filter(newEntry => {
                return !updatedData.data.some(existingEntry => existingEntry.id === newEntry.id);
            });

            updatedData.data = [...updatedData.data, ...filteredNewData];
        }

        return updatedData;
    };


    const updateData = (data: SearchReserveResult) => {
        if (action) {
            switch (selectedMenu) {
                case UserDashboardFilterEnum.ALL:
                    if (action) action();
                    break;
                case UserDashboardFilterEnum.ACTIVE_GAMES:
                    setActiveGames(prevState => {
                        const updatedData = updateIndividualData(prevState, data);
                        action(updatedData);
                        return updatedData;
                    })
                    break;
                case UserDashboardFilterEnum.ACTIVE_RESERVES:
                    setActiveReserves(prevState => {
                        const updatedData = updateIndividualData(prevState, data);
                        action(updatedData);
                        return updatedData;
                    })
                    break;
                case UserDashboardFilterEnum.HISTORY_GAMES:
                    setHistoryGames(prevState => {
                        const updatedData = updateIndividualData(prevState, data);
                        action(updatedData);
                        return updatedData;
                    })
                    break;
                case UserDashboardFilterEnum.HISTORY_RESERVES:
                    setHistoryReserves(prevState => {
                        const updatedData = updateIndividualData(prevState, data);
                        action(updatedData);
                        return updatedData;
                    })
                    break;
            }
        }
    };

    return <DashboardEngine searchType={selectedMenu} page={page} itemsPerPage={itemsPerPage} action={updateData}/>;
}

export default Dashboard;
