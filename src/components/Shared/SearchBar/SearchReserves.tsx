'use client'

import React, {useEffect, useMemo, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import SearchForm from "@/components/Shared/SearchBar/SearchForm";

import "@/assets/sass/components/SearchBar/searchBar.scss";
import SearchEngine from "@/components/Shared/SearchBar/SearchEngine";
import FormatDateTools from "@/utils/FormatDateTools";

interface SearchReserveProps {
    page?: number
    itemsPerPage?: number
    action: Function|undefined
}

const SearchReserves: React.FC<SearchReserveProps> = ({page, itemsPerPage, action}) => {

    const queryParams = useSearchParams();
    const router = useRouter();
    const [isFirstRender, setIsFirstRender] = useState(true);

    const province = Number(queryParams.get('province'));
    const city = Number(queryParams.get('city'));
    const dateString = queryParams.get('date') ?? 'now';
    const date = useMemo(() => dateString === 'now' ? new Date() : new Date(dateString), [dateString]);

    const [searchValues, setSearchValues] = useState<SearchEngineParams>({
        province: province === 0 ? -1 : province,
        city: city === 0 ? -1 : city,
        date: new Date(date),
        sport: queryParams.get('sport') ?? ""
    });

    const [searchResults, setSearchResults] = useState<SearchResult>();


    useEffect(() => {
        if(action){
            action(); // Clear search result before next search
        } else {
            if (!isFirstRender) {
                const formattedDate = FormatDateTools.formatDate(date)

                const path = `/reserves/search?` +
                    (searchValues.province !== -1 ? `province=${searchValues.province}&` : ``) +
                    (searchValues.city !== -1 ? `city=${searchValues.city}&` : ``) +
                    (searchValues.date ? `date=${formattedDate}&` : ``) +
                    (searchValues.sport !== "" ? `sport=${searchValues.sport}` : ``);

                router.push(path);
            }
            setIsFirstRender(false);
        }
    }, [action, date, isFirstRender, router, searchValues]);

    useEffect(() => {
        if (action) action(searchResults);
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
