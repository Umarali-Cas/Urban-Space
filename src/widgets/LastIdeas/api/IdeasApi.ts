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
        getIdeas: builder.query<
      any[],
      {
        limit?: number
        offset?: number
        sort_by?: 'new' | 'popular' | 'active'
        search?: string
        category?: string
        author_id?: string
        status?: string
      }
    >({
      query: ({
        limit = 6,
        offset = 0,
        sort_by = 'new',
        search,
        category,
        author_id,
        status,
      }) => ({
        url: '/ideas/',
        params: {
          limit,
          offset,
          sort_by,
          search,
          category,
          author_id,
          status,
        },
      }),
    }),
    getIdeaBySlug: builder.query<any, string>({
      query: slug => `/ideas/${slug}`,
    }),
    getTotalCount: builder.query<number, void>({
      query: () => '/ideas/counts',
    })
  }),
})

export const { useGetIdeasQuery, useGetIdeaBySlugQuery, useGetTotalCountQuery } = IdeasApi
