'use client'

import { useState, useEffect } from "react";
import { InfoCard } from "@/partials/MatchReserveInfo";
import CreateReserveModal from "@/components/Modal/Reserve/CreateReserveModal";
import SearchReserves from "@/components/Shared/SearchBar/SearchReserves";

// CSS
import "@/assets/sass/pages/searchReserves.scss";
import Loading from "@/components/Loading";

type Params = {
    searchParams?: {
        province: string,
        city: string,
        sport: string,
        date: string,
        time: string,
        page: number,
        itemsPerPage: number
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
    const [showMore, setShowMore] = useState<boolean>(false);

    // Data
    const [reserves, setReserves] = useState<ReserveDetails[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: params.searchParams?.page ?? Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE),
        previousPage: -1,
        nextPage: -1,
        maxPage: -1,
        minPage: -1,
        itemsPerPage: params.searchParams?.itemsPerPage ?? Number(process.env.NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE)
    });

    const [isLoading, setIsLoading] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    const loadMoreAction = () => {
        setPagination((prevState) => ({
            ...prevState,
            currentPage: prevState.currentPage + 1
        }));
    }

    const updatePageData = (data: SearchResult) => {
        if (data) {
            const newReserves = data.data;
            const newPagination = data.pagination;

            newReserves.map((reserve) => {
                reserves[reserve.id] = reserve;
            });

            setPagination(newPagination);
            setIsLoading(false);
        } else {
            setReserves([]);
            if (!firstRender) setIsLoading(true);
        }
    }

    const updateReserveData = (data: ReserveDetails) => {
        reserves[data.id] = data;
    }

    useEffect(() => {
        setShowMore(pagination.maxPage !== pagination.currentPage);
    }, [pagination]);

    useEffect(() => {
        setFirstRender(false);
    }, []);

    return (
        <>
            <SearchReserves page={pagination.currentPage} itemsPerPage={pagination.itemsPerPage} action={updatePageData}/>

            <CreateReserveModal/>

            <div className={`reserves ${isLoading ? `loading` : ``}`}>

                {
                    isLoading ?
                        <Loading /> : (
                            <>
                                {reserves.length > 0 ? (
                                    <>
                                        <div className={`search-reserves`}>
                                            {
                                                reserves.map((reserve) =>
                                                   <InfoCard
                                                        key={reserve.id}
                                                        reserve={reserve}
                                                        onChangeAction={updateReserveData}
                                                   />
                                                )
                                            }
                                        </div>
                                        {showMore &&
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
                            </>
                        )
                }

            </div>
        </>
    );
};
