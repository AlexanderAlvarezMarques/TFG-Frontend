import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: null,
    refresh_token: null,
    isLogged: false
}

const authorizationSlicer = createSlice( {
    name: 'authorization',
    initialState,
    reducers: {
        setToken: (state, action) => {
            const { token, refresh_token } = action.payload;
            state.token = token;
            state.refresh_token = refresh_token;
            state.isLogged = true;
        },
        setUserLogged: (state, action) => {
            state.isLogged = true;
        },
        clearToken: (state) => {
            Object.assign(state, initialState)
        }
    }
})

export const {
    setToken,
    clearToken,
    setUserLogged
} = authorizationSlicer.actions
export default authorizationSlicer.reducer
