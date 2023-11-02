import React from "react";
import { Inter } from 'next/font/google'

// CSS
import '@/assets/sass/globals.scss'

// Components
import Navbar from '@/components/Header/Navbar';
import Footer from '@/components/Footer/Footer';
import {Provider} from "react-redux";
import store from "@/redux/store";
import {Providers} from "@/redux/Provider";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <html lang="en">
            <body className={inter.className}>
            <header>
                <Navbar />
            </header>
            <main className={'main'}>
                {children}
            </main>
            <Footer />
            </body>
            </html>
        </Providers>
    )
}

const inter = Inter({ subsets: ['latin'] })
