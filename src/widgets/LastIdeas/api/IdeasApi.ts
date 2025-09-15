/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const IdeasApi = createApi({
  reducerPath: 'ideasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.urbanspace.sdinis.org",
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
        url: '/ideas/',
        params: { limit, offset },
      }),
    }),
    getIdeaBySlug: builder.query<any, string>({
      query: slug => `/ideas/${slug}/`,
    }),
    getTotalCount: builder.query<number, void>({
      query: () => '/ideas/counts',
    })
  }),
})

export const { useGetIdeasQuery, useGetIdeaBySlugQuery, useGetTotalCountQuery } = IdeasApi
