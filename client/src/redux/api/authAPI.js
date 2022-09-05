import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { setUser } from '../features/users/userSlice';

export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/users/' }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query(data) {
                return {
                    url: 'login',
                    method: 'POST',
                    // credentials: 'include',
                    body: data,
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        signupUser: builder.mutation({
            query(data) {
                return {
                    url: 'signup',
                    method: 'POST',
                    // credentials: 'include',
                    body: data,
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const { useLoginUserMutation, useSignupUserMutation, usePrefetch } = authAPI;
