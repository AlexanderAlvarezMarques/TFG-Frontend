'use client'

import { FormEvent, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/reducers/authorizationReducers"
import {setUser} from "@/redux/reducers/userReducers";
import UserService from "@/services/api/user/UserService";

import "@/assets/sass/pages/login.scss";

const LogInPage = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const queryParams = useSearchParams();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [logInError, setLogInError] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const authentication = await UserService.logIn(username, password);

        if (authentication !== null) {
            localStorage.setItem('token', authentication.token)
            localStorage.setItem('refresh_token', authentication.refresh_token)
            dispatch(setToken(authentication));

            const userData = await UserService.getUserByToken();
            const payload = {
                id: userData.id,
                name: userData.name,
                surname: userData.surname,
                username: userData.username,
                email: userData.email,
                language: userData.language,
                userTelephoneNumbers: userData.userTelephoneNumbers,
                isAdmin: userData.isAdmin,
                isPlayer: userData.isPlayer
            }
            dispatch(setUser(payload));

            if (queryParams.has('home')) {
                router.push("/");
            } else {
                router.back();
            }
        }

        setLogInError(true)
    }

    return (
        <div className={`login`}>
            <form id="singIn" className="form" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="username">Usuario/correo:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="******"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={`formGroup`}>
                    <input type="submit" className={'btn btn-primary'} value="Log in"/>
                </div>
                <div className={`formGroup ${logInError ? 'd-block' : 'd-none'}`}>
                    <label>Nombre de usuario o contraseña erroneos</label>
                </div>
            </form>
        </div>
    );
}

export default LogInPage;
