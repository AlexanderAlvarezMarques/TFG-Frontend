'use client'

import React from "react";
import { Inter } from 'next/font/google'

// Bootstrap
import '@/assets/bootstrap/bootstrap.min.css'
import '@/assets/bootstrap/bootstrap.min'
import '@/assets/bootstrap/bootstrap.bundle.min'

// CSS
import '@/assets/sass/globals.scss'

// Components
import { Navbar } from '@/components/Header/Navbar';
import LoadUserData from '@/components/Header/LoadUserData';
import Footer from '@/components/Footer/Footer';

import {Provider, useDispatch} from "react-redux";
import store from "@/redux/store";
import LocalStorageTools from "@/utils/LocalStorageTools";
import {MessagePopupProvider} from "@/components/Context/MessagePopupContext";

export default function BaseLayout({ children }: { children: React.ReactNode }) {

    LocalStorageTools.readMasterData();

    return (
        <html lang="en">
        <Provider store={store}>

            <body className={inter.className}>
            <MessagePopupProvider>

                {/* Header */}
                <header>
                    <LoadUserData />
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

            </MessagePopupProvider>
            </body>
        </Provider>
        </html>
    )
}

const inter = Inter({ subsets: ['latin'] })
