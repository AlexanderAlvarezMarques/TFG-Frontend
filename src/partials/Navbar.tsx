import Link from "next/link";
import {useSelector} from "react-redux";

import styles from "@/assets/sass/partials/navbar.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const Navbar = () => {

    const auth = useSelector((state: StorageState) => state.authorization);
    const user = useSelector((state: StorageState) => state.user);

    const [showUserMenu, setShowUserMenu] = useState(false);

    const mainMenu = (
        <ul className={styles.center_menu}>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li className={styles.test}>
                <Link href="/sport_centers">Centros deportivos</Link>
            </li>
            <li className={styles.test}>
                <Link href="/reserves/search">Buscador</Link>
            </li>
        </ul>
    )

    const notLoggedMenu = (
        <ul>
            <li>
                <Link href={`/login`}>Log in</Link>
            </li>
            <li>
                <Link href={`/signup`}>Sign up</Link>
            </li>
        </ul>
    )

    const playerMenu = (
        <ul className={showUserMenu ? styles.userMenu : ''}>
            <li><Link href={`/reservations`}>Reservas</Link></li>
            <li><Link href={`/matches`}>Partidos</Link></li>
            <li><Link href={`/profile`}>Cuenta</Link></li>
        </ul>
    )

    const adminMenu = (
        <ul className={showUserMenu ? styles.userMenu : ''}>
            <li><Link href={`/reservations`}>Mis Reservas</Link></li>
            <li><Link href={`/matches`}>Mis Partidos</Link></li>
            <li><Link href={`/sport_facilities`}>Mis Centros deportivos</Link></li>
            <li><Link href={`/profile`}>Cuenta</Link></li>
        </ul>
    )

    return (
        <nav className={styles.navbar}>
            {mainMenu}
            {
                !auth.isLogged ?
                    notLoggedMenu :
                    (
                        <ul>
                            <li className={styles.userName} onClick={() => setShowUserMenu(!showUserMenu)}>
                                {user.username}
                                <FontAwesomeIcon icon={faCaretDown} className={styles.dropDownIcon}/>
                                {user.isAdmin ? adminMenu : playerMenu}
                            </li>
                            <li>
                                <Link href={`/logout`}>Log out</Link>
                            </li>
                        </ul>
                )
            }
        </nav>
    )

}

export default Navbar;
