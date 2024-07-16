'use client'

import React, {useEffect, useMemo, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import SearchForm from "@/components/shared/SearchBar/SearchForm";
import SearchEngine from "@/components/shared/SearchBar/SearchEngine";

import "@/assets/sass/components/SearchBar/searchBar.scss";
import FormatDateTools from "@/utils/FormatDateTools";
import { SearchBarParams } from "@/types/components/searchBar";
import { SearchReserveResult } from "@/types/reserves";

const SearchReserves: React.FC<PaginationConfig> = ({page, itemsPerPage, action}) => {

    const queryParams = useSearchParams();
    const router = useRouter();
    const [isFirstRender, setIsFirstRender] = useState(true);

    const province = Number(queryParams.get('province'));
    const city = Number(queryParams.get('city'));
    const dateString = queryParams.get('date');
    const date = (dateString !== null && dateString !== "") ? new Date(dateString) : new Date();

    const [searchValues, setSearchValues] = useState<SearchBarParams>({
        province: province === 0 ? -1 : province,
        city: city === 0 ? -1 : city,
        date: date,
        sport: queryParams.get('sport') ?? ""
    });

    const [searchResults, setSearchResults] = useState<SearchReserveResult>({
        data: [],
        pagination: {
            currentPage: page,
            itemsPerPage: itemsPerPage,
            maxPage: -1,
            minPage: -1,
            nextPage: -1,
            previousPage: -1
        }
    });

    useEffect(() => {
        if(action){
            action(); // Clear search result before next search
        } else {
            if (!isFirstRender) {
                const formattedDate = FormatDateTools.formatApiDate(date);

                const path = `/reserves/search?` +
                    (searchValues.province !== -1 ? `province=${searchValues.province}&` : ``) +
                    (searchValues.city !== -1 ? `city=${searchValues.city}&` : ``) +
                    (searchValues.date ? `date=${formattedDate}&` : ``) +
                    (searchValues.sport !== "" ? `sport=${searchValues.sport}` : ``);

                router.push(path);
            }
            setIsFirstRender(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValues]);

    useEffect(() => {
        if (action) action(searchResults);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action, searchResults]);

    return (
        <div className={`searchReserves`}>

            <SearchForm
                province={searchValues.province}
                city={searchValues.city}
                date={searchValues.date}
                sport={searchValues.sport}
                action={setSearchValues}
            />

            <SearchEngine
                province={searchValues.province}
                city={searchValues.city}
                date={searchValues.date}
                sport={searchValues.sport}
                page={page}
                itemsPerPage={itemsPerPage}
                action={setSearchResults}
            />
        </div>
    )
}

export default SearchReserves;
