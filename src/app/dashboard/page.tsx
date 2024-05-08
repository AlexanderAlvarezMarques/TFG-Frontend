'use client'

import React, {useCallback, useEffect, useState} from "react";
import Loading from "@/components/Loading";
import { InfoCard } from "@/partials/MatchReserveInfo";
import Dashboard from "@/components/app/Dashboard/Dashboard";

import '@/assets/sass/pages/dashboard.scss';

interface PageDataType {
    data: ReserveDetails[],
    pagination: Pagination
}

export default function DashboardPage() {

    const [searchType, setSearchType] = useState<number>(2);
    const [pageData, setPageData] = useState<PageDataType>({
        data: [],
        pagination: {
            currentPage: 1,
            itemsPerPage: 2,
            minPage: -1,
            maxPage: -1,
            nextPage: -1,
            previousPage: -1
        }
    });

    const [isLoading, setIsLoading] = useState(true);
    const [sectionTitle, setSectionTitle] = useState("Próximos partidos");
    const [page, setPage] = useState(Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE));
    const itemsPerPage = 2;//Number(process.env.NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE);

    const updatePageData = (data: PageDataType) => {
        setPageData(data);
        setIsLoading(false);
    };

    const loadMoreAction = () => {
        setIsLoading(true);
        setPage(pageData.pagination.currentPage + 1);
    }

    useEffect(() => {

        setIsLoading(true);

        switch (searchType) {
            case 1:
                setSectionTitle("Partidos anteriores");
                break;
            case 2:
                setSectionTitle("Próximos partidos");
                break;
            case 3:
                setSectionTitle("Reservas anteriores");
                break;
            case 4:
                setSectionTitle("Reservas activas");
                break;
            default:
                setSectionTitle("");
        }
    }, [searchType]);

    return (
        <>

            <Dashboard
                searchType={searchType}
                page={page}
                itemsPerPage={itemsPerPage}
                action={updatePageData}
            />

            <div className="dashboard">
                <nav className={`navigationMenu`}>
                    <ul>
                        <li onClick={() => setSearchType(2)}>Próximos partidos</li>
                        <li onClick={() => setSearchType(1)}>Partidos anteriores</li>
                        <li onClick={() => setSearchType(4)}>Reservas activas</li>
                        <li onClick={() => setSearchType(3)}>Reservas anteriores</li>
                    </ul>
                </nav>
                {
                    !isLoading ?
                        (
                            <>
                                <div className={`content`}>
                                    <section>
                                        <h1 className="title">{sectionTitle}</h1>
                                        <div className={`reserveList`}>
                                            {
                                                pageData?.data.map((reserve) => (
                                                    <InfoCard key={reserve.id} reserve={reserve} onChangeAction={() => {}} checkIsParticipant={true} />
                                                ))
                                            }
                                        </div>
                                    </section>
                                </div>
                                {
                                    pageData?.pagination && pageData.pagination.currentPage < pageData.pagination.maxPage &&
                                    <div className={`loadMore`}>
                                        <button className={`btn btn-primary`} onClick={loadMoreAction}>Load more
                                        </button>
                                    </div>
                                }
                            </>
                        ) :
                        (
                            <div className="loading">
                                <Loading/>
                            </div>
                        )
                }
            </div>
        </>
    )

}
