import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/redux/reducers/userReducers";
import authorizationSlicer from "@/redux/reducers/authorizationReducers";
import masterDataSlicer from "@/redux/reducers/masterDataReducers"

const store = configureStore({
    reducer: {
        user: userSlice,
        authorization: authorizationSlicer,
        masterData: masterDataSlicer
    }
})

export default store
