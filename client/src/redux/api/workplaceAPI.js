import { apiSlice } from './apiSlice';

export const workplacesAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWorkplaces: builder.query({
            query: (search) => `/workplaces?search=${search}`,
            providesTags: ['Workplaces'],
        }),
    }),
});

export const { useGetWorkplacesQuery, useLazyGetWorkplacesQuery } = workplacesAPI;
