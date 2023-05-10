/* eslint-disable no-nested-ternary */
import { generateQueryUrl } from '../../helpers';
import { apiSlice } from './apiSlice';

export const appointmentAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addAppointment: builder.mutation({
            query: (data) => ({
                url: `/appointments`,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Appointment', 'DoctorAppointment'],
        }),

        getUserAppointments: builder.query({
            query: ({ dcotorId, limit, date, page }) => ({
                url: generateQueryUrl(`/appointments/me`, {
                    doctorId: dcotorId,
                    date,
                    page,
                    limit,
                }),
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...(result.page === 1 ? [{ type: 'Appointment', id: 'LIST' }] : []),
                          { type: 'Appointment', id: 'LIST', page: arg },
                      ] // per page
                    : [],
        }),

        getDoctorAppointments: builder.query({
            query: ({ id, limit, page, count, date, recent }) => ({
                url: generateQueryUrl(`/appointments`, {
                    doctorId: id,
                    page,
                    limit,
                    count,
                    date,
                    recent,
                }),
                method: 'GET',
                credentials: 'include',
            }),
            // per page
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...(result.page === 1 ? [{ type: 'DoctorAppointment', id: 'LIST' }] : []),
                          { type: 'DoctorAppointment', id: 'LIST', page: arg },
                      ] // per page
                    : [],

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

        getAppointmentsCountById: builder.query({
            query: (id) => ({
                url: `/appointments?doctorId=${id}&count=true`,
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

        getAppointmentsCountByIdAndDate: builder.query({
            query: ({ id, date }) => ({
                url: `/appointments?doctorId=${id}&date=${date}&count=true`,
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
    useAddAppointmentMutation,
    useGetUserAppointmentsQuery,
    useGetDoctorAppointmentsQuery,
    useLazyGetDoctorAppointmentsQuery,
    useGetAppointmentsCountByIdQuery,
    useGetAppointmentsCountByIdAndDateQuery,
    useLazyGetAppointmentsCountByIdAndDateQuery,
} = appointmentAPI;
