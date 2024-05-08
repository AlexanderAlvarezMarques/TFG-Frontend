'use client'

import React, { useState, useEffect } from "react";
import DashboardEngine from "@/components/app/Dashboard/DashboardEngine";

interface DashboardProps {
    searchType: number
    page: number,
    itemsPerPage: number,
    action: Function
}

interface DashboardData {
    data: ReserveDetails[],
    pagination: Pagination
}

const Dashboard: React.FC<DashboardProps> = ({searchType, page, itemsPerPage, action}) => {

    const initValue: DashboardData = {
        data: [],
        pagination: {
            currentPage: Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE),
            itemsPerPage: Number(process.env.NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE),
            minPage: 1,
            maxPage: -1,
            nextPage: -1,
            previousPage: -1
        }
    }

    const [activeReserves, setActiveReserves] = useState<DashboardData>(initValue);
    const [previousReserves, setPreviousReserves] = useState<DashboardData>(initValue)
    const [previousMatches, setPreviousMatches] = useState<DashboardData>(initValue)
    const [nextMatches, setNextMatches] = useState<DashboardData>(initValue)

    const updateIndividualData = (currentData: DashboardData, newData: DashboardData) => {
        newData.data.map((reserve) => {
            currentData.data[reserve.id] = reserve;
        })

        currentData.pagination = newData.pagination;

        return currentData;
    }

    const updateAllData = (newData: any) => {
        setActiveReserves(newData.reserves.active);
        setPreviousReserves(newData.reserves.history);
        setNextMatches(newData.games.next);
        setPreviousMatches(newData.games.history);
    }

    const updateData = (data: DashboardData) => {
        switch (searchType) {
            case 1:
                setNextMatches(updateIndividualData(nextMatches, data));
                break;
            case 2:
                setPreviousMatches(updateIndividualData(previousMatches, data));
                break;
            case 3:
                setActiveReserves(updateIndividualData(activeReserves, data));
                break;
            case 4:
                setPreviousReserves(updateIndividualData(previousReserves, data));
                break;
            default:
                updateAllData(data);
        }
    }

    useEffect(() => {
        switch (searchType) {
            case 0:
                action(nextMatches);
                break;
            case 1:
                action(previousMatches);
                break;
            case 2:
                action(activeReserves);
                break;
            case 3:
                action(previousReserves);
                break;
            default:
                action();
        }
    }, [activeReserves, nextMatches, previousMatches, previousReserves, searchType]);

    return <DashboardEngine searchType={searchType} page={page} itemsPerPage={itemsPerPage} action={updateData} />;
}

export default Dashboard;
