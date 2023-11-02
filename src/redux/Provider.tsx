'use client'

import { Provider} from "react-redux";

import store from "@/redux/store";
import React from "react";

export const Providers = (props: React.PropsWithChildren) => {
    return <Provider store={store}>{props.children}</Provider>
}
