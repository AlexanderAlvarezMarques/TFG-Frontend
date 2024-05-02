import {createSlice} from "@reduxjs/toolkit";

const initialState: User = {
    id: -1,
    name: "",
    surname: "",
    username: "",
    email: "",
    language: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, username, email, language, name, surname } = action.payload
            state.id = id
            state.username = username
            state.email = email
            state.language = language
            state.name = name
            state.surname = surname
        },
        clearUser: state => {
            Object.assign(state, initialState);
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
