/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.accessToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getArticles: builder.query<any[], void>({
      query: () => '/articles',
    }),
  }),
})

export const { useGetArticlesQuery } = articlesApi
