'use client'

import React, {useEffect, useState} from 'react'
import UserService from "@/services/api/UserService";
import {useDispatch, useSelector} from "react-redux";
import { HTTP_STATUS } from "@/enums/HttpStatus";
import { setUser } from "@/redux/reducers/userReducers";
import {BookInfo, MatchInfo} from "@/partials/MatchBookInfo";

export default function DashBoardPage() {

    const dispatch = useDispatch();
    const user = useSelector((state: StorageState) => state.user)
    const [ dashboard, setDashboard ] = useState<Dashboard|null>(null);

    const generateBookOrMatchContent = (a: (Match|Book)[], b: boolean) => {
        return (
            <div className={b ? 'games' : 'books'}>
                {a.map((item: Book|Match) => (
                        b
                        ? <MatchInfo key={item.id} match={item as Match} />
                        : <BookInfo key={item.id} book={item as Book} />
                ))}
            </div>
        )
    }

    useEffect(() => {
        async function requestPageData() {
            let dashboard = await UserService.getUserDashboard();
            if (dashboard.status === HTTP_STATUS.OK) {
                setDashboard(dashboard.data)
            }
        }

        requestPageData()
    }, [dispatch]);

    return (
        <>
            <div className="book_and_matches">
                {
                    dashboard ?
                        (
                            <>
                                <h2>Partidos anteriores</h2>
                                {generateBookOrMatchContent(dashboard.games.history, true)}
                                <h2>Proximos partidos</h2>
                                {generateBookOrMatchContent(dashboard.games.next, true)}
                                <h2>Reservas anteriores</h2>
                                {generateBookOrMatchContent(dashboard.books.history, false)}
                                <h2>Reservas activas</h2>
                                {generateBookOrMatchContent(dashboard.books.active, false)}
                            </>
                        ) :
                        (
                            "Loading ..."
                        )
                }
            </div>
        </>
    )
}
