import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/authSlice"
import adminUsersReducer from "../redux/adminUsersSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducers = combineReducers({
    auth: authReducer,
    adminUsers: adminUsersReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'adminAuth', 'adminUsers']
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 