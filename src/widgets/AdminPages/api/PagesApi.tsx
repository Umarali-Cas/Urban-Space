/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pagesApi = createApi({
  reducerPath: 'pagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ['Pages'],
  endpoints: builder => ({
    getSlugs: builder.query<string[], void>({
      query: () => '/pages/slugs',
      providesTags: ['Pages'],
    }),
    getPageBySlug: builder.query<any, string>({
      query: slug => `/pages/${slug}`,
      providesTags: (_res, _err, slug) => [{ type: 'Pages', id: slug }],
    }),
  }),
})

export const { useGetSlugsQuery, useGetPageBySlugQuery } = pagesApi
