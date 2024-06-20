'use client'

import React, {FormEvent, useEffect, useState} from "react";
import Link from "next/link";
import {MessageBandColorEnum, useMessagePopup} from "@/components/Context/MessagePopupContext";
import UserService from "@/services/api/user/UserService";
import {useRouter} from "next/navigation";

const SignUpPage: React.FC = () => {

    const router = useRouter();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password_1, setPassword_1] = useState("");
    const [nif, setNif] = useState("");

    const { openPopup } = useMessagePopup();

    const createUserAction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== password_1) {
            openPopup("Las contraseñas no coinciden", MessageBandColorEnum.RED);
        } else {
            const response = UserService.createPlayerUser(name, surname, email, username, password, nif);
            if (response !== null) {
                openPopup("Usuario creado correctamente", MessageBandColorEnum.GREEN);
                router.push("/login?home");
            }
        }
    }

    return (
        <form className={`form`} onSubmit={createUserAction}>
            <div className="formGroup">
                <label>Nombre:</label>
                <input type="text" name="name" id="name" required={true} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="formGroup">
                <label>Apellidos:</label>
                <input type="text" name="surname" id="surname" required={true} onChange={(e) => setSurname(e.target.value)}/>
            </div>

            <div className="formGroup">
                <label>Email:</label>
                <input type="email" name="email" id="email" required={true} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="formGroup">
                <label>Nombre de usuario:</label>
                <input type="text" name="username" id="username" required={true} onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div className="formGroup">
                <label>Contraseña:</label>
                <input type="password" name="password" id="password" required={true} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="formGroup">
                <label>Repita la contraseña:</label>
                <input type="password" name="password_2" id="password_2" required={true} onChange={(e) => setPassword_1(e.target.value)}/>
            </div>

            <div className="formGroup">
                <label>DNI/NIE/NIF:</label>
                <input type="text" name="nif" id="nif" onChange={(e) => setNif(e.target.value)}/>
            </div>

            <div className="formGroup">
                <input type="submit" value="Aceptar" className="btn btn-success"/>
                <Link href={"/"} ><button className="btn btn-danger">Cancelar</button></Link>
            </div>
        </form>
    )

}

export default SignUpPage;
