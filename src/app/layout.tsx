'use client'

import React from "react";
import { Inter } from 'next/font/google'

// CSS
import '@/assets/sass/globals.scss'

// Components
import { Navbar } from '@/components/Header/Navbar';
import Footer from '@/components/Footer/Footer';

import {Provider, useDispatch} from "react-redux";
import store from "@/redux/store";
import LocalStorageTools from "@/utils/LocalStorageTools";

export default function BaseLayout({ children }: { children: React.ReactNode }) {

    LocalStorageTools.readMasterData();

    return (
        <html lang="en">
        <Provider store={store}>
            <body className={inter.className}>

            {/* Header */}
            <header>
                <Navbar />
            </header>

            {/* Content */}
            <main className={'main'}>
                {children}
            </main>

            {/* Modal */}
            <div id="modal-root"></div>

            {/* Footer */}
            <Footer />

            </body>
        </Provider>
        </html>
    )
}

const inter = Inter({ subsets: ['latin'] })
