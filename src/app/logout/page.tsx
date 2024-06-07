"use client"

import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {clearToken} from "@/redux/reducers/authorizationReducers";
import {clearUser} from "@/redux/reducers/userReducers";
import {useEffect} from "react";

const LogoutPage = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');

        dispatch(clearToken());
        dispatch(clearUser());

        router.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default LogoutPage;
