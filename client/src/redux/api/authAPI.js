import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

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
            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    await queryFulfilled;
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
        }),
    }),
});

export const { useLoginUserMutation, useSignupUserMutation, usePrefetch } = authAPI;
