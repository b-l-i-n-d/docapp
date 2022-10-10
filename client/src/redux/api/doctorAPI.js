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
                    console.log(data);
                    const user = await cookieExtractor(data.data.accessToken);
                    dispatch(setUser(user));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const { useAddDoctorMutation, usePrefetch } = doctorAPI;
