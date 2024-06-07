import React, {useEffect} from "react";
import ReserveService from "@/services/api/reserve/ReserveService";
import {SearchBarParams} from "@/types/components/searchBar";

const SearchEngine: React.FC<SearchBarParams & PaginationConfig> = (
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

                if (apiResponse !== null) {
                    action(apiResponse);
                }
            }

            searchReserves().then(() => {});
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [province, city, date, sport, page, itemsPerPage]);

    return null;
}

export default SearchEngine;
