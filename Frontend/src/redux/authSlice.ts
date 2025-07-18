import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./middlewares/loginMiddleware";
import type { IUsers } from "../interfaces/formDatas";

type AuthState = {
    user: null | {
        _id: string;
        username: string;
        email: string;
        profile: string;
        role: string
    },
    isLoggedIn: boolean;
    role: "user" | "admin" | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null
}

const INITIAL_STATE: AuthState = {
    user: null,
    isLoggedIn: false,
    status: 'idle',
    role: 'user',
    error: null
}


const authSlice = createSlice({
    name: 'userAuth',
    initialState: INITIAL_STATE,
    reducers: {
        login: (state, action) => {
            if (action.payload.role === 'user') {
                state.role = 'user'
            } else if (action.payload.role === 'admin') {
                state.role = 'admin'
            } else {
                state.role = null
                return
            }
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            state.user = null;
            state.role = null
            state.isLoggedIn = false
        },
        editProfile: (state, action: PayloadAction<IUsers>) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload as string || "Something went wrong ♾️"
            })
    }
})

export const { login, logout, editProfile } = authSlice.actions
export default authSlice.reducer