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
        // Create a copy of the current data object
        const updatedData: DashboardData = { ...currentData };

        // Update the data array with the new data
        updatedData.data = [...updatedData.data, ...newData.data];

        // Update the pagination object with the new pagination
        updatedData.pagination = newData.pagination;

        return updatedData;
    };

    const updateData = (data: DashboardData) => {
        switch (searchType) {
            case 2:
                setNextMatches(prevState => {
                    const updatedData = updateIndividualData(prevState, data);
                    action(updatedData);
                    return updatedData;
                });
                break;
            case 1:
                setPreviousMatches(prevState => {
                    const updatedData = updateIndividualData(prevState, data);
                    action(updatedData);
                    return updatedData;
                });
                break;
            case 4:
                setActiveReserves(prevState => {
                    const updatedData = updateIndividualData(prevState, data);
                    action(updatedData);
                    return updatedData;
                });
                break;
            case 3:
                setPreviousReserves(prevState => {
                    const updatedData = updateIndividualData(prevState, data);
                    action(updatedData);
                    return updatedData;
                });
                break;
        }
    };


    return <DashboardEngine searchType={searchType} page={page} itemsPerPage={itemsPerPage} action={updateData} />;
}

export default Dashboard;
