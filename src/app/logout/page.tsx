'use client'

import {useRouter} from "next/navigation";
import {headers} from "next/headers";
import {useDispatch} from "react-redux";
import { clearToken } from "@/redux/reducers/authorizationReducers";
import {clearUser} from "@/redux/reducers/userReducers";

export default function LogoutPage() {

    const router = useRouter();
    const dispatch = useDispatch();

    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');

    dispatch(clearToken());
    dispatch(clearUser());

    router.push('/');

}
