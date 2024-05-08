'use client'

import React, { useEffect, useState } from 'react'
import UserService from "@/services/api/UserService";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_STATUS } from "@/enums/HttpStatus";
import { InfoCard } from "@/partials/MatchReserveInfo";

// CSS
import '@/assets/sass/pages/dashboard.scss';
import {useRouter} from "next/navigation";
import Loading from "@/components/Loading";

interface CustomData {
    data: ReserveDetails[],
    pagination: Pagination
}

interface PageData {
    games: {
        history: CustomData,
        next: CustomData
    },
    reserves: {
        history: CustomData,
        active: CustomData
    }
}

export default function DashBoardPage() {

    const router = useRouter();
    const auth = useSelector((state: StorageState) => state.authorization);

    const pageDataInitValue: CustomData = {
        data: [],
        pagination: {
            currentPage: Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE),
            previousPage: -1,
            nextPage: -1,
            maxPage: -1,
            minPage: -1,
            // itemsPerPage: Number(process.env.NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE)
            itemsPerPage: 2
        }
    }

    const pageDataListInitValue: PageData = {
        games: {
            next: pageDataInitValue,
            history: pageDataInitValue
        },
        reserves: {
            history: pageDataInitValue,
            active: pageDataInitValue
        }
    }

    const [ loading, setLoading] = useState(true);
    const [ selectedMenu, setSelectedMenu] = useState<number>(0);
    const [ pageDataList, setPageDataList] = useState<PageData>(pageDataListInitValue);
    const [ pageData, setPageData ] = useState<CustomData>(pageDataInitValue);
    const [ sectionTitle, setSectionTitle ] = useState<string>("Próximos partidos");

    const generateReserveCard = (reserveList: (ReserveDetails)[]) => {
        return (
            <div className={'reserveList'}>
                {reserveList.map((reserve: ReserveDetails) => (
                    <InfoCard key={reserve.id} reserve={reserve as ReserveDetails} onChangeAction={updatePageData} checkIsParticipant={true}/>
                ))}
            </div>
        )
    }

    const updatePageData = (data: ReserveDetails) => {
        setPageData((prevPageData) => {
            const updatedData = prevPageData.data.map(item => {
                return item.id === data.id ? data : item;
            });

            return {
                ...prevPageData,
                data: updatedData
            };
        });

        switch (selectedMenu) {
            case 0:
                setPageDataList((prevPageDataList) => ({
                    ...prevPageDataList,
                    games: {
                        ...prevPageDataList.games,
                        history: pageData
                    }
                }));
                break;
            case 1:
                setPageDataList((prevPageDataList) => ({
                    ...prevPageDataList,
                    games: {
                        ...prevPageDataList.games,
                        next: pageData
                    }
                }));
                break;
            case 2:
                setPageDataList((prevPageDataList) => ({
                    ...prevPageDataList,
                    reserves: {
                        ...prevPageDataList.reserves,
                        active: pageData
                    }
                }));
                break;
            case 3:
                setPageDataList((prevPageDataList) => ({
                    ...prevPageDataList,
                    reserves: {
                        ...prevPageDataList.reserves,
                        history: pageData
                    }
                }));
                break;
            default:
        }
    }

    const requestApiData = async (page: number = Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE), itemsPerPage: number = Number(process.env.NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE)) => {
        const apiResponse = await UserService.getUserDashboard(selectedMenu, pageData.pagination.currentPage, pageData.pagination.itemsPerPage)

        const { status, data } = apiResponse;

        if (status === HTTP_STATUS.OK) {
            return data;
        }
    }

    const loadMoreAction = async () => {

        const data = await requestApiData(pageData.pagination.currentPage + 1);

        console.log(data);

        switch (selectedMenu) {
            case 0:

                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:
        }
    }

    useEffect(() => {
        async function requestPageData() {
            const data = await requestApiData();
            setPageDataList(data);
            setLoading(false);
        }

        if (!auth.isLogged || !localStorage.getItem('token')) {
            router.push("/signin");
        } else {
            requestPageData()
        }
    }, []);

    useEffect(() => {
        switch (selectedMenu) {
            case 0:
                setSectionTitle("Próximos partidos");
                setPageData(pageDataList.games.next);
                break;
            case 1:
                setSectionTitle("Partidos anteriores");
                setPageData(pageDataList.games.history);
                break;
            case 2:
                setSectionTitle("Reservas activas");
                setPageData(pageDataList.reserves.active);
                break;
            case 3:
                setSectionTitle("Reservas anteriores");
                setPageData(pageDataList.reserves.history);
                break;
            default:
                setSectionTitle("Section not valid");
                setPageData(pageDataInitValue);
        }
    }, [selectedMenu, pageDataList, pageData]);

    return (
        <>
            <div className="dashboard">
                <nav className={`navigationMenu`}>
                    <ul>
                        <li onClick={() => setSelectedMenu(0)}>Próximos partidos</li>
                        <li onClick={() => setSelectedMenu(1)}>Partidos anteriores</li>
                        <li onClick={() => setSelectedMenu(2)}>Reservas activas</li>
                        <li onClick={() => setSelectedMenu(3)}>Reservas anteriores</li>
                    </ul>
                </nav>
                {
                    !loading ?
                        (
                            <>
                                <div className={`content`}>
                                    <section>
                                        <h1 className="title">{sectionTitle}</h1>
                                        {generateReserveCard(pageData.data)}
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
