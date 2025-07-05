import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    user: null | {
        id: string;
        username: string;
        email: string;
        profile: string;
    },
    isLoggedIn : boolean
}

const INITIAL_STATE: AuthState = {
    user: null,
    isLoggedIn:false 
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        login: (state,action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            state.user =  null;
            state.isLoggedIn = false
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer