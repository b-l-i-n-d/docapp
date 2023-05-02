/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import themeReducer from './features/themes/themeSlice';
import userReducer from './features/users/userSlice';

export const store = configureStore({
    reducer: {
        userState: userReducer,
        theme: themeReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(apiSlice.middleware),
});
