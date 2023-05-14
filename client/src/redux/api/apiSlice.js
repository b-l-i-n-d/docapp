import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

// eslint-disable-next-line import/prefer-default-export
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    tagTypes: [
        'Appointments',
        'Auth',
        'Dashboard',
        'Departments',
        'Districts',
        'Doctors',
        'DoctorAppointment',
        'Notifications',
        'Users',
        'Workplaces',
    ],
    endpoints: () => ({}),
});
