/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from './api/authAPI';
import { doctorAPI } from './api/doctorAPI';
import { userAPI } from './api/userAPI';
import userReducer from './features/users/userSlice';

export const store = configureStore({
    reducer: {
        userState: userReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [doctorAPI.reducerPath]: doctorAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            authAPI.middleware,
            userAPI.middleware,
            doctorAPI.middleware,
        ]),
});
