'use client'

import SearchReservesEngine from "@/components/Shared/SearchReservesEngine";
import { useState, useEffect } from "react";
import { InfoCard } from "@/partials/MatchReserveInfo";
import CreateReserveModal from "@/components/Modal/Reserve/CreateReserveModal";

// CSS
import "@/assets/sass/pages/searchReserves.scss";

type Params = {
    searchParams?: {
        province: string,
        city: string,
        sport: string,
        date: string,
        time: string,
        page: number,
    }
}

function getParams(params: Params) {
    const province: string = params.searchParams?.province ?? "";
    const city: string = params.searchParams?.city ?? "";
    const sport: string = params.searchParams?.sport ?? "";
    let date: string | Date = params.searchParams?.date ?? "";
    let time: string = params.searchParams?.time ?? "";

    date = !date ? new Date() : new Date(date);
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    date.setHours(hours ? parseInt(hours) : date.getHours());
    date.setMinutes(minutes ? parseInt(minutes) : date.getMinutes());

    return {province, city, sport, date};
}

export default function SearchReservesPage (params: Params) {

    // Params
    const {province, city, sport, date} = getParams(params);

    // Pagination
    const [page, setPage] = useState<number>(params.searchParams?.page ?? 1);

    // Hooks
    const [data, setData] = useState<DashboardReserve[]>([]);

    return (
        <>

            <SearchReservesEngine setData={setData} province={province} sport={sport} city={city} date={date} page={page}/>

            <CreateReserveModal />

            <div className="reserves">
                {data.length > 0 ? (
                    <div className={`search-reserves`}>
                        {data.map((reserve: DashboardReserve) => (
                            <InfoCard reserve={reserve} key={reserve.id} />
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-danger">
                        <p>No reserves found</p>
                    </div>
                )}

            </div>
        </>
    );
};
