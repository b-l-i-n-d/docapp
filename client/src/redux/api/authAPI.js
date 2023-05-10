import { cookieDestroyer, cookieExtractor } from '../../helpers/index';
import { logout, setUser } from '../features/users/userSlice';
import { apiSlice } from './apiSlice';
import { doctorAPI } from './doctorAPI';
import { userAPI } from './userAPI';

export const authAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/users/login',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
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
            query: (data) => ({
                url: '/users/signup',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
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
            query: () => ({
                url: '/users/logout',
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        await cookieDestroyer();
                    }
                    dispatch(logout());
                    dispatch(userAPI.util.resetApiState());
                    dispatch(doctorAPI.util.resetApiState());
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        verifyToken: builder.query({
            query: () => ({
                url: '/users/verifyToken',
                method: 'GET',
                credentials: 'include',
            }),
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
        requestPasswordReset: builder.mutation({
            query: (data) => ({
                url: '/users/requestPasswordReset',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/users/resetPassword',
                method: 'PATCH',
                credentials: 'include',
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                try {
                    if (data.message) {
                        await dispatch(authAPI.endpoints.logoutUser.initiate());
                    }
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
    useLazyLogoutUserQuery,
    useVerifyTokenQuery,
    useRequestPasswordResetMutation,
    useResetPasswordMutation,
} = authAPI;
