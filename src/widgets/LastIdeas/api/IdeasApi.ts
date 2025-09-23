// src/features/CustomMap/api/IdeasApi.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const IdeasApi = createApi({
  reducerPath: 'ideasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.accessToken
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['Idea'],
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
        params: { limit, offset, sort_by, search, category, author_id, status },
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(idea => ({ type: 'Idea' as const, id: idea.id })),
              { type: 'Idea' as const, id: 'LIST' },
            ]
          : [{ type: 'Idea' as const, id: 'LIST' }],
    }),

    getIdeaBySlug: builder.query<any, string>({
      query: slug => `/ideas/${slug}`,
      providesTags: (result, error, slug) => [
        { type: 'Idea' as const, id: slug },
      ],
    }),

    getTotalCount: builder.query<number, void>({
      query: () => '/ideas/counts',
    }),

    // ← новый endpoint для лайка
    likeIdea: builder.mutation<any, string>({
      query: ideaId => ({
        url: `/ideas/${ideaId}/like`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, ideaId) => [
        { type: 'Idea', id: ideaId },
        { type: 'Idea', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetIdeasQuery,
  useGetIdeaBySlugQuery,
  useGetTotalCountQuery,
  useLikeIdeaMutation,
} = IdeasApi
