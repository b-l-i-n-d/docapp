import { cookieExtractor } from '../../helpers/index';
import { setUser } from '../features/users/userSlice';
import { apiSlice } from './apiSlice';
import { userAPI } from './userAPI';

export const doctorAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addDoctor: builder.mutation({
            query: (data) => ({
                url: '/doctors',
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
            invalidatesTags: ['Doctors'],
        }),

        editDoctor: builder.mutation({
            query: ({ id, data }) => ({
                url: `/doctors/${id}`,
                method: 'PATCH',
                credentials: 'include',
                body: { data },
            }),
            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    return await data;
                } catch (error) {
                    console.log(error);
                    return error;
                }
            },
            invalidatesTags: ['Doctors'],
            onCacheEntryAdded: (args, { dispatch }) => {
                dispatch(userAPI.util.invalidateTags(['Users']));
            },
        }),

        updateStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/doctors/${id}/update-status`,
                method: 'PATCH',
                credentials: 'include',
                body: { status },
            }),
            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    return await data;
                } catch (error) {
                    console.log(error);
                    return error;
                }
            },
            invalidatesTags: ['Doctors'],
            onCacheEntryAdded: (args, { dispatch }) => {
                dispatch(userAPI.util.invalidateTags(['Users']));
            },
        }),

        getMyDoctorInfo: builder.query({
            query: () => ({
                url: '/doctors/me',
                method: 'GET',
                credentials: 'include',
            }),

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

        getDoctorById: builder.query({
            query: (id) => ({
                url: `/doctors/${id}`,
                method: 'GET',
                credentials: 'include',
            }),

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
            query: () => ({
                url: '/doctors',
                method: 'GET',
                credentials: 'include',
            }),

            async onQueryStarted(args, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    return await data;
                } catch (error) {
                    console.log(error);
                    return error;
                }
            },
            providesTags: ['Doctors'],
        }),

        getApprovedDoctors: builder.query({
            query: () => ({
                url: '/doctors/approved',
                method: 'GET',
                credentials: 'include',
            }),

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
    }),
});

export const {
    useAddDoctorMutation,
    useEditDoctorMutation,
    useUpdateStatusMutation,
    useGetMyDoctorInfoQuery,
    useGetDoctorByIdQuery,
    useGetAllDoctorsQuery,
    useGetApprovedDoctorsQuery,
    usePrefetch,
} = doctorAPI;
