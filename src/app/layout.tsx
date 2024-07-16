'use client'

import React from "react";
import {Provider} from "react-redux";
import store from "@/redux/store";
import MasterDataReader from "@/components/storage/MasterDataReader";

// Bootstrap
import BootstrapClient from "@/components/BootstrapClient";
import 'bootstrap/dist/css/bootstrap.css';

// CSS
import '@/assets/sass/globals.scss'
import Navbar from "@/partials/Navbar";
import CreateReserveModal from "@/components/modal/CreateReserveModal/CreateReserveModal";
import {MessagePopupProvider} from "@/components/Context/MessagePopupContext";
import Footer from "@/partials/footer";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="es">
        <Provider store={store}>
            <MessagePopupProvider>

                <MasterDataReader />

                <body className={``}>
                <header>
                    <Navbar />
                </header>

                <main className={`main`}>
                    {children}
                </main>

                {/* Modal */}
                <div id="rootModal"></div>
                <CreateReserveModal />

                <Footer />
                </body>
            </MessagePopupProvider>
        </Provider>
        <BootstrapClient />
        </html>
    );
}
