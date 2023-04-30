import { apiSlice } from './apiSlice';

export const departmentAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addDepartment: builder.mutation({
            query: (data) => ({
                url: '/departments',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Departments'],
        }),

        editDepartment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/departments/${id}`,
                method: 'PATCH',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Departments'],
        }),

        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `/departments/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Departments'],
        }),

        getDepartments: builder.query({
            query: () => '/departments',
            providesTags: ['Departments'],
        }),

        getDepartmentById: builder.query({
            query: (id) => `/departments/${id}`,
            providesTags: ['Departments'],
        }),
    }),
});

export const {
    useAddDepartmentMutation,
    useEditDepartmentMutation,
    useDeleteDepartmentMutation,
    useGetDepartmentsQuery,
    useGetDepartmentByIdQuery,
} = departmentAPI;
