import Link from "next/link";
import { useSelector } from "react-redux";

import "@/assets/sass/partials/navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {log} from "node:util";

const Navbar = () => {

    const auth = useSelector((state: StorageState) => state.authorization);
    const user = useSelector((state: StorageState) => state.user);
    const pathname = usePathname();

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(true);

    const mainMenu = (
        <ul className="navbar-nav mr-auto mainMenu">
            <Link href={'/'} className={`home border-top`}>
                <li>Home</li>
            </Link>
            <Link href={'/sport_centers'}>
                <li>Centros deportivos</li>
            </Link>
            <Link href={'/reserves/search'}>
                <li>Buscador reservas</li>
            </Link>
        </ul>
    )

    const notLoggedMenu = (
        <ul className={`navbar-nav userAndLogin`}>
            <Link href={`/login`}>
                <li>Log in</li>
            </Link>
            <Link href={`/signup`}>
                <li>Sign up</li>
            </Link>
        </ul>
    )

    const playerMenu = (
        <ul className={`navbar-nav ${showUserMenu ? `userMenu` : ''}`}>
            <Link href={`/reservations`}><li>Mis Reservas</li></Link>
            <Link href={`/matches`}><li>Mis Partidos</li></Link>
            <Link href={`/profile`}><li>Cuenta</li></Link>
            <Link href={`/logout`}><li>Cerrar sesión</li></Link>
        </ul>
    )

    const adminMenu = (
        <ul className={`navbar-nav ${showUserMenu ? `userMenu` : ''}`}>
            <Link href={`/reservations`}><li>Mis Reservas</li></Link>
            <Link href={`/matches`}><li>Mis Partidos</li></Link>
            <Link href={`/sport_facilities`}><li>Mis Centros deportivos</li></Link>
            <Link href={`/profile`}><li>Cuenta</li></Link>
            <Link href={`/logout`}><li>Cerrar sesión</li></Link>
        </ul>
    )

    useEffect(() => {
        setToggleMenu(true);
    }, [pathname]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <button className={'toggler'} type="button" onClick={() => setToggleMenu(!toggleMenu)}>
                <FontAwesomeIcon icon={faBars}/>
            </button>

            <div className={`${toggleMenu ? 'collapse' : ''} navbar-collapse`} id="navbarToggler">
                {mainMenu}
                {
                    !auth.isLogged && !auth.token ?
                        notLoggedMenu :
                        (
                            <ul className={`navbar-nav userAndLogin`}>
                                <li className={`userName`} onClick={() => setShowUserMenu(!showUserMenu)}>
                                    {user.username}
                                    <FontAwesomeIcon icon={faCaretDown} className={`dropDownIcon`}/>
                                    {
                                        showUserMenu &&
                                        (user.isAdmin ? adminMenu : playerMenu)
                                    }
                                </li>
                            </ul>
                        )
                }
            </div>
        </nav>
    )

}

export default Navbar;
