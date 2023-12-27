import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    courtTypes: [],
}

const authorizationSlicer = createSlice( {
    name: 'authorization',
    initialState,
    reducers: {
        setCourtTypes: (state, action) => {
            const { token, refresh_token } = action.payload
        },
        clearApiConst: (state) => {
            Object.assign(state, initialState)
        }
    }
})

export const { setCourtTypes, clearApiConst } = authorizationSlicer.actions
export default authorizationSlicer.reducer
