import { setNotification } from '../features/users/userSlice';
import { apiSlice } from './apiSlice';

export const userAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: () => ({
                url: '/users/notifications',
                method: 'GET',
                credentials: 'include',
            }),
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
        updateNotification: builder.mutation({
            query: (id) => ({
                url: `/users/notifications/${id}`,
                method: 'PATCH',
                credentials: 'include',
            }),
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
            query: (id) => ({
                url: `/users/notifications/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
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
        getAllUsers: builder.query({
            query: () => ({
                url: '/users/allUsers',
                method: 'GET',
                credentials: 'include',
            }),

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
            providesTags: ['Users'],
        }),
    }),
});

export const {
    useGetNotificationQuery,
    useUpdateNotificationMutation,
    useDeleteNotificationMutation,
    useGetAllUsersQuery,
    usePrefetch,
} = userAPI;
