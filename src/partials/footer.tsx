import "@/assets/sass/partials/footer.scss";
import Link from "next/link";

const Footer = () => {

    return (
        <footer className={`text-center`}>
            <p className={`text-`}>
                &copy; 2024 Alexander Álvarez Marques. All rights reserved.
            </p>
            <p>
                <Link href="https://github.com/AlexanderAlvarezMarques" target={"_blank"}>Github (Alexander Álvarez Marques)</Link>
            </p>

        </footer>
    )

}

export default Footer;
