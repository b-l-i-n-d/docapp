import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { setNotification } from '../features/users/userSlice';

export const userAPI = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/users/' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getNotification: builder.query({
            query() {
                return {
                    url: 'notifications',
                    method: 'GET',
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setNotification(data));
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['User'],
        }),
        updateNotification: builder.mutation({
            query(id) {
                return {
                    url: `notifications/${id}`,
                    method: 'PATCH',
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setNotification(data));
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        deleteNotification: builder.mutation({
            query(id) {
                return {
                    url: `notifications/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        dispatch(setNotification(data));
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const {
    useGetNotificationQuery,
    useUpdateNotificationMutation,
    useDeleteNotificationMutation,
    usePrefetch,
} = userAPI;
