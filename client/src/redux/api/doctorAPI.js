import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { cookieExtractor } from '../../helpers/index';
import { setUser } from '../features/users/userSlice';

export const doctorAPI = createApi({
    reducerPath: 'doctorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/doctors/',
    }),
    tagTypes: ['Doctor'],
    endpoints: (builder) => ({
        addDoctor: builder.mutation({
            query(data) {
                return {
                    url: 'add',
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
        getDoctor: builder.query({
            query() {
                return {
                    url: 'get',
                    method: 'GET',
                    credentials: 'include',
                };
            },

            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    return await data;
                } catch (error) {
                    console.log(error);
                    return error;
                }
            },
        }),
        getAllDoctors: builder.query({
            query() {
                return {
                    url: 'get-all',
                    method: 'GET',
                    credentials: 'include',
                };
            },

            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log('🚀 ~ file: doctorAPI.js:62 ~ onQueryStarted ~ data:', data);
                    return await data;
                } catch (error) {
                    console.log(error);
                    return error;
                }
            },
        }),
    }),
});

export const { useAddDoctorMutation, useGetDoctorQuery, useGetAllDoctorsQuery, usePrefetch } =
    doctorAPI;
