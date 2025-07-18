import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { login } from "../authSlice";
import type { LoginResponse } from '../../interfaces/LoginResponse';
const localUrl = import.meta.env.VITE_API_URL

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (
        formData: { username: string, email: string, password: string | number, role: string },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const res = await axios.post<LoginResponse>(`${localUrl}/login-form`, { formData }, { withCredentials: true })
            if (!res.data.success) {
                toast.error(res.data.message || 'Login failed');
                return rejectWithValue(res.data.message);
            }

            const userData = res.data.user
            console.log("UserData login :", userData)
            dispatch(login(userData))
            toast.success("Logged in successfully")
            return userData

        } catch (err: any) {
            toast.error("Login failed");
            return rejectWithValue(err.response?.data?.message || 'Error')
        }
    }

)