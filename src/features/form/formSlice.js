import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  endpoints: (builder) => ({
    getFormData: builder.query({
      query: () => ({
        url: "/get-form-data"
      }),
    }),
    postFormData: builder.mutation({
      query: (data) => ({
        url: "/add-form-data",
        method: "POST",
        body: data,
      })
    })
  }),
})

export const { useGetFormDataQuery, usePostFormDataMutation } = formApi