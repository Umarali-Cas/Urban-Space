/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const IdeasApi = createApi({
  reducerPath: 'ideasApi',
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
    getIdeas: builder.query<any[], { limit?: number; offset?: number }>({
      query: ({ limit = 6, offset = 0 }) => ({
        url: '/ideas',
        params: { limit, offset },
      }),
    }),
    getIdeaBySlug: builder.query<any, string>({
      query: slug => `/ideas/${slug}`,
    }),
    getTotalCount: builder.query<number, void>({
      query: () => '/ideas/count',
    })
  }),
})

export const { useGetIdeasQuery, useGetIdeaBySlugQuery, useGetTotalCountQuery } = IdeasApi
