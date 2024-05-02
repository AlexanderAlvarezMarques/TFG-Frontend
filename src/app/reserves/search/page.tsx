'use client'

import SearchReservesEngine from "@/components/Shared/SearchReservesEngine";
import { useState, useEffect } from "react";
import { InfoCard } from "@/partials/MatchReserveInfo";
import CreateReserveModal from "@/components/Modal/Reserve/CreateReserveModal";

// CSS
import "@/assets/sass/pages/searchReserves.scss";
import {log} from "node:util";

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

interface CustomData {
    data: ReserveDetails[];
    pagination: Pagination
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
    const [showMore, setShowMore] = useState<boolean>(false);

    // Pagination
    const [page, setPage] = useState<number>(params.searchParams?.page ?? 1);

    // Hooks
    const [data, setData] = useState<CustomData>({
        data: [],
        pagination: {
            currentPage: page,
            previousPage: -1,
            nextPage: -1,
            maxPage: -1,
            minPage: -1,
            itemsPerPage: Number(process.env.DEFAULT_ITEMS_PER_PAGE)
        }
    });

    const searchAction = (r: CustomData) => {
        setData((prevData: CustomData) => ({
            data: [...prevData.data, ...r.data],
            pagination: r.pagination
        }));
    }

    const loadMoreAction = () => {
        setPage(Number(page + 1));
    }

    const updatePageData = () => {
        
    }

    useEffect(() => {
        setShowMore(data.pagination.maxPage !== page);
    }, [data]);

    return (
        <>

            <SearchReservesEngine setData={searchAction} province={province} sport={sport} city={city} date={date} page={page}/>

            <CreateReserveModal />

            <div className="reserves">
                {data.data.length > 0 ? (
                    <>
                        <div className={`search-reserves`}>
                            {data.data.map((reserve: ReserveDetails) => (
                                <InfoCard key={reserve.id} reserve={reserve} onChangeAction={updatePageData}/>
                            ))}
                        </div>
                        { showMore &&
                            <div className={`showMore`}>
                                <button className={`btn btn-success`} onClick={loadMoreAction}>Load more</button>
                            </div>
                        }
                    </>
                ) : (
                    <div className="alert alert-danger">
                        <p>No reserves found</p>
                    </div>
                )}

            </div>
        </>
    );
};
