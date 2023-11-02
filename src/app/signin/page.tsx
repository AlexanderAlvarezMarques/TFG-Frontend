'use client'

import UserService from "@/services/api/UserService";
import {HTTP_STATUS} from "@/enums/HttpStatus";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {useDispatch} from "react-redux";
import { setToken } from "@/redux/reducers/authorizationReducers"

export default function SignInPage() {

    const dispatch = useDispatch()
    const router = useRouter()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [logInError, setLogInError] = useState(false)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isLogged = await UserService.logIn(username, password)
        const { status, data } = isLogged
        if (status === HTTP_STATUS.OK) {
            dispatch(setToken(data))
            localStorage.setItem('token', data.token)
            localStorage.setItem('refresh_token', data.refresh_token)
            router.push("/dashboard")
        }

        setLogInError(true)
    }

    return (
        <form id="singIn" onSubmit={handleSubmit}>
            <div className="formGroup">
                <label htmlFor="username">Nombre de usuario o correo:</label><br/>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="formGroup">
                <label htmlFor="password">Contraseña:</label><br/>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="******"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={`formGroup`}>
                <input type="submit" value="Log in"/>
            </div>
            <div className={`formGroup ${logInError ? 'd-block' : 'd-none'}`}>
                <label>Nombre de usuario o contraseña erroneos</label>
            </div>
        </form>
    );
}
