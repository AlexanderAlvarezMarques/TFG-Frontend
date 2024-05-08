import React, {useEffect, useState} from "react";
import ReserveService from "@/services/api/ReserveService";
import {HTTP_STATUS} from "@/enums/HttpStatus";

type SearchEngineProps = SearchEngineParams & {
    page: any,
    itemsPerPage: any
}

const SearchEngine: React.FC<SearchEngineProps> = (
    {
        province,
        city,
        date,
        sport,
        action,
        page,
        itemsPerPage
    }) => {
    useEffect(() => {

        if (
            province !== -1 &&
            city !== -1 &&
            date &&
            sport !== "" &&
            action
        ) {

            const searchReserves = async () => {
                const apiResponse = await ReserveService.searchReserves(city, sport, date, page, itemsPerPage);

                if (apiResponse.status === HTTP_STATUS.OK) {
                    console.log(apiResponse.data);
                    action(apiResponse.data);
                }
            }

            searchReserves();
        }

    }, [province, city, date, sport, page, itemsPerPage]);

    return null;
}

export default SearchEngine;
