import {createSlice} from "@reduxjs/toolkit";

const initialState: User = {
    id: -1,
    name: "",
    surname: "",
    username: "",
    email: "",
    language: "",
    userTelephoneNumbers: [],
    isAdmin: false,
    isPlayer: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, username, email, language, name, surname, isAdmin, isPlayer } = action.payload
            state.id = id
            state.username = username
            state.email = email
            state.language = language
            state.name = name
            state.surname = surname
            state.isAdmin = isAdmin
            state.isPlayer = isPlayer
        },
        clearUser: state => {
            Object.assign(state, initialState);
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
