import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/redux/reducers/userReducers";
import authorizationSlicer from "@/redux/reducers/authorizationReducers";

const store = configureStore({
    reducer: {
        user: userSlice,
        authorization: authorizationSlicer
    }
})

export default store
