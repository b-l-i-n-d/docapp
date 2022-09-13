import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { cookieDestroyer, cookieExtractor } from '../../helpers/index';
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
                    credentials: 'include',
                    body: data,
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const user = await cookieExtractor(data.data.accessToken);
                    dispatch(setUser(user));
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
                    credentials: 'include',
                    body: data,
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const user = await cookieExtractor(data.data.accessToken);
                    dispatch(setUser(user));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        logoutUser: builder.query({
            query() {
                return {
                    url: 'logout',
                    method: 'GET',
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        await cookieDestroyer();
                    }
                    dispatch(setUser(null));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        verifyToken: builder.query({
            query() {
                return {
                    url: 'verifyToken',
                    method: 'GET',
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const user = await cookieExtractor(data.data.accessToken);
                    dispatch(setUser(user));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const {
    useLoginUserMutation,
    useSignupUserMutation,
    useLogoutUserQuery,
    useVerifyTokenQuery,
    usePrefetch,
} = authAPI;
