'use client'

import {Suspense, useEffect, useState} from "react";
import SearchReserves from "@/components/shared/SearchBar/SearchReserves";
import {Reserve, SearchReserveResult} from "@/types/reserves";
import Loading from "@/components/shared/Loading";
import ReserveCard from "@/components/shared/ReserveData";

// CSS
import "@/assets/sass/pages/searchReserves.scss";

const SearchReservesPage = () => {

    const [reserves, setReserves] = useState<Reserve[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE),
        itemsPerPage: Number(process.env.NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE),
        maxPage: -1,
        minPage: -1,
        nextPage: -1,
        previousPage: -1
    });

    const [showMore, setShowMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alreadySearch, setAlreadySearch] = useState(false);

    const updatePageData = (data: SearchReserveResult) => {
        console.log("Must not enter");
        if (!data) {
            setReserves([]);
            setIsLoading(true);
        } else {
            const newReserves = data.data;
            const newPagination = data.pagination;

            setPagination(newPagination);
            newReserves.map(reserve => {
                reserves[reserve.id] = reserve;
            });
            setIsLoading(false);
        }
    }

    const updateReserveData = (reserve: Reserve) => {
        setReserves(prevReserves => {
            return prevReserves.map(r => {
                if (r.id === reserve.id) {
                    return { ...r, ...reserve };
                }
                return r;
            });
        });
    }


    const loadMoreAction = () => {
        setPagination((prevState) => ({
            ...prevState,
            currentPage: prevState.currentPage + 1
        }));
    }

    useEffect(() => {
        setShowMore(pagination.maxPage !== pagination.currentPage);
    }, [pagination]);

    return (
        <>
            <div className={'parallax_1'}>
                <Suspense>
                    <SearchReserves page={pagination.currentPage} itemsPerPage={pagination.itemsPerPage} action={updatePageData} />
                </Suspense>
            </div>

            <div className={`reserves ${isLoading ? `loading` : ``}`}>

                {
                    isLoading ?
                        <Loading/> : (
                            <>
                                {reserves.length > 0 ? (
                                    <>
                                        <div className={`search-reserves`}>
                                            {
                                                reserves.map((reserve) =>
                                                    <ReserveCard
                                                        key={reserve.id}
                                                        reserve={reserve}
                                                        onChangeAction={updateReserveData}
                                                    />
                                                )
                                            }
                                        </div>
                                        {showMore &&
                                            <div className={`showMore text-center mb-2`}>
                                                <button className={`btn btn-success`} onClick={loadMoreAction}>Cargar más</button>
                                            </div>
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            alreadySearch && (
                                                <div className="alert alert-danger">
                                                    <p>No reserves found</p>
                                                </div>
                                            )
                                        }
                                    </>
                                    )
                                }
                            </>
                        )
                }

            </div>
        </>
    )

}

export default SearchReservesPage;
