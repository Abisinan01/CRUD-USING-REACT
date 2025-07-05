import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/authSlice"
import adminAuthReducer from "../redux/adminAuthSlice"
import adminUsersReducer from "../redux/adminUsersSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
        adminUsers: adminUsersReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>