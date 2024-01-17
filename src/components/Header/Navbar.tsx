import Link from "next/link"

import styles from "@/assets/sass/components/navbar.module.scss";
import {useSelector} from "react-redux";
import store from "@/redux/store";

export const Navbar = () => {

    const auth = useSelector((state: StorageState) => state.authorization);

    return (
        <nav className={styles.navbar}>
            <ul className={styles.center_menu}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li className={styles.test}>
                    <Link href="/sportcenters">Centros deportivos</Link>
                </li>
                <li className={styles.test}>
                    <Link href="/reserves/search">Buscador</Link>
                </li>
            </ul>
            <ul>
                {
                    !auth.token ?
                    (
                        <>
                            <li>
                                <Link href="/signin">Sign in</Link>
                            </li>
                            <li>
                                <Link href="/signup">Sign up</Link>
                            </li>
                        </>
                    ) :
                    (
                        <>
                            <li>
                                <Link href="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link href="/logout">Log out</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    );
}
