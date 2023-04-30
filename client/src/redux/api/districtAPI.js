import { apiSlice } from './apiSlice';

export const districtAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDisticts: builder.query({
            query: () => '/districts',
            providesTags: ['Districts'],
        }),
    }),
});

export const { useGetDistictsQuery } = districtAPI;
