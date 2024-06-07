'use client'

import React, {useEffect, useState} from "react";
import Loading from "@/components/shared/Loading";
import Dashboard from "@/components/app/dashboard/Dashboard";

import ReserveCard from "@/components/shared/ReserveData";
import { SearchReserveResult } from "@/types/reserves";
import { UserDashboardFilterEnum, UserDashboardFilterEnumType } from "@/enum/UserDashboardQueryParamEnum";

import '@/assets/sass/pages/dashboard.scss';
import CreateReserveModal from "@/components/modal/CreateReserveModal/CreateReserveModal";

export default function DashboardPage() {

    const [selectedMenu, setSelectedMenu] = useState<UserDashboardFilterEnumType>(UserDashboardFilterEnum.ACTIVE_GAMES);
    const [pageData, setPageData] = useState<SearchReserveResult>({
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
    const itemsPerPage = Number(process.env.NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE);

    const updatePageData = (data: SearchReserveResult) => {
        setPageData(data);
        setIsLoading(false);
    };

    const loadMoreAction = () => {
        setIsLoading(true);
        setPage(pageData.pagination.currentPage + 1);
    }

    const handleReserveChange = () => {
        setIsLoading(true);
        setPage(page); // Trigger a rerender by updating the state
        // setIsLoading(false);
    };

    useEffect(() => {

        setIsLoading(true);

        switch (selectedMenu) {
            case UserDashboardFilterEnum.ACTIVE_GAMES:
                setSectionTitle("Próximos partidos");
                break;
            case UserDashboardFilterEnum.HISTORY_GAMES:
                setSectionTitle("Partidos anteriores");
                break;
            case UserDashboardFilterEnum.ACTIVE_RESERVES:
                setSectionTitle("Reservas activas");
                break;
            case UserDashboardFilterEnum.HISTORY_RESERVES:
                setSectionTitle("Reservas anteriores");
                break;
            default:
                setSectionTitle("");
        }
    }, [selectedMenu]);

    useEffect(() => {
        if (isLoading && pageData.data.length > 0) {
            setIsLoading(false); // Reset isLoading when data is loaded
        }
    }, [pageData, isLoading]);

    return (
        <>
            <Dashboard selectedMenu={selectedMenu} page={page} itemsPerPage={itemsPerPage} action={updatePageData} />

            <div className="dashboard">
                <nav className={`navigationMenu`}>
                    <ul>
                        <li onClick={() => setSelectedMenu(UserDashboardFilterEnum.ACTIVE_GAMES)}>Próximos partidos</li>
                        <li onClick={() => setSelectedMenu(UserDashboardFilterEnum.HISTORY_GAMES)}>Partidos anteriores</li>
                        <li onClick={() => setSelectedMenu(UserDashboardFilterEnum.ACTIVE_RESERVES)}>Reservas activas</li>
                        <li onClick={() => setSelectedMenu(UserDashboardFilterEnum.HISTORY_RESERVES)}>Reservas anteriores</li>
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
                                                pageData.data.map((reserve) => (
                                                    <ReserveCard key={reserve.id} reserve={reserve} onChangeAction={handleReserveChange} checkIsParticipant={true} />
                                                ))
                                            }
                                        </div>
                                    </section>
                                </div>
                                {
                                    pageData.pagination.currentPage < pageData.pagination.maxPage &&
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
