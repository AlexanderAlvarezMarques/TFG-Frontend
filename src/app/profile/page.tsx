'use client'

import {useSelector} from "react-redux";

import "@/assets/sass/pages/profile.scss";
import {FormEvent, useEffect, useState} from "react";
import UserService from "@/services/api/user/UserService";
import {MessageBandColorEnum, useMessagePopup} from "@/components/Context/MessagePopupContext";

const ProfilePage = () => {
    const {openPopup} = useMessagePopup();

    const [user, setUser] = useState<User|null>();
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [nif, setNif] = useState<string>("");

    const submitAction = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!user) return null;

        if (username !== user.username) {
            // Check username available
        }

        if (email !== user.email) {
            // Check email available
        }

        if (nif !== user.nif) {
            // Check if NIF is available
        }

        if (!username || !email) return null;

        const response = await UserService.updateUserData(username, email, nif);
        if (response !== null) {
            openPopup("Datos actualizados correctamente", MessageBandColorEnum.GREEN);
        } else {
            openPopup("Ha ocurrido un error al actualizar. Intentelo más tarde", MessageBandColorEnum.RED);
        }
    }

    useEffect(() => {
        const requestUserData = async () => {
            const userData = await UserService.getUserByToken();
            setUser(userData);
            setName(userData.name);
            setSurname(userData.surname);
            setUsername(userData.username);
            setEmail(userData.email);
            setNif(userData.nif);
        }

        requestUserData().then();
    }, []);

    return (
        <div className={`profile`}>
            <form className={`form`} onSubmit={submitAction}>

                {/* Username */}
                <div className="formGroup">
                    <label>Nombre</label>
                    <input type="text" name="username" id="username" value={name} disabled={true} />
                </div>

                {/* Name */}
                <div className="formGroup">
                    <label>Apellidos</label>
                    <input type="text" name="username" id="username" value={surname} disabled={true} />
                </div>

                {/* Surname */}
                <div className="formGroup">
                    <label>Nombre de usuario</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                {/* Email */}
                <div className="formGroup">
                    <label>Email</label>
                    <input type="email" name="username" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* Nif */}
                <div className="formGroup">
                    <label>DNI/NIE</label>
                    <input type="text" name="username" id="username" value={nif} onChange={(e) => setNif(e.target.value)} />
                </div>

                <div className="formGroup">
                    <input type="submit" className="btn btn-success" value={`Guardar`} />
                </div>

            </form>
        </div>
    )
}

export default ProfilePage;
