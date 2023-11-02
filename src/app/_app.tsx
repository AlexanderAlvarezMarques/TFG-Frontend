import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import store from '../redux/store';
import BaseLayout from "../components/layouts/layout";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <BaseLayout >
                <Component {...pageProps} />
            </BaseLayout>
        </Provider>
    )
}
