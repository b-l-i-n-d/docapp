import { apiSlice } from './apiSlice';

export const dashboardAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDoctorDashboardData: builder.query({
            query: (doctorId) => ({
                url: `/dashboard/doctor?doctorId=${doctorId}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Dashboard'],
        }),
        getAdminDashboardData: builder.query({
            query: () => ({
                url: '/dashboard/admin',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Dashboard'],
        }),
    }),
});

export const { useGetDoctorDashboardDataQuery, useGetAdminDashboardDataQuery } = dashboardAPI;
