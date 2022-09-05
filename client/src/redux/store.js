/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from './api/authAPI';
import userReducer from './features/users/userSlice';

export const store = configureStore({
    reducer: {
        userState: userReducer,
        [authAPI.reducerPath]: authAPI.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([authAPI.middleware]),
});
