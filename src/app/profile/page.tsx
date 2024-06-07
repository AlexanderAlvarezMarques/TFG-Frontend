'use client'

import {useSelector} from "react-redux";

const ProfilePage = () => {

    const user = useSelector((state: StorageState) => state.user);

    return (
        <div className={`profile`}>
            <form className={`form`}>

                {/* Username */}
                <div className="formGroup">
                    <label>Nombre de usuario</label>
                    <input type="text" name="username" id="username" value={user.username} disabled={true}/>
                </div>

                {/* Name */}
                <div className="formGroup">
                    <label>Nombre de usuario</label>
                    <input type="text" name="username" id="username" value={user.name} disabled={true}/>
                </div>

                {/* Surname */}
                <div className="formGroup">
                    <label>Nombre de usuario</label>
                    <input type="text" name="username" id="username" value={user.surname} disabled={true}/>
                </div>

                {/* Email */}
                <div className="formGroup">
                    <label>Email</label>
                    <input type="email" name="username" id="username" value={user.email} disabled={true}/>
                </div>

                {/* Nif */}
                <div className="formGroup">
                    <label>DNI/NIE</label>
                    <input type="text" name="username" id="username" value={user.nif} disabled={true}/>
                </div>

            </form>
        </div>
    )
}

export default ProfilePage;
