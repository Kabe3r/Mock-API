import { api } from '../api/api';

export const extentedApiStudents = api.injectEndpoints({
    endpoints: (builder) => ({
        getStudentsList: builder.query({
        query: () => 'Students',
        transformResponse: responseData => {
            return responseData
        },
        providesTags: ['Students']

    }),
    addStudent: builder.mutation({
        query: (body) => {
            return {
                url: 'Students',
                method: 'POST',
                body
            }
        },
        invalidatesTags: ['Students'] 
    }),
    updateStudent: builder.mutation({
        query: ({id, formState}) => ({
            url: `Students/${id}`,
            method: 'PATCH',
            body: formState,
        }),
        invalidatesTags: ['Students']
    }),
    delStudent: builder.mutation({
        query: (id) => ({
            url: `Students/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Students']
    }),
})
})

export const { useGetStudentsListQuery, useAddStudentMutation, useDelStudentMutation, useUpdateStudentMutation } = extentedApiStudents;