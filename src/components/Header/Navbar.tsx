import Link from "next/link"

import styles from "@/assets/sass/navbar.module.scss"

export default function Navbar () {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.center_menu}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li className={styles.test}>
                    <Link href="/signin">Centros deportivos</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href="/signin">Sign in</Link>
                </li>
                <li>
                    <Link href="/signup">Sign up</Link>
                </li>
                <li>
                    <Link href="/dashboard">Dashboard</Link>
                </li>
            </ul>
        </nav>
    );
}

