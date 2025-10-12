// src/features/CustomMap/api/IdeasApi.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const IdeasApi = createApi({
  reducerPath: 'ideasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token
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
        search?: string
        author_id?: string
      }
    >({
      query: ({ limit = 6, offset = 0, search, author_id }) => ({
        url: '/ideas/public',
        params: { limit, offset, search, author_id },
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
    likeOrDislikeIdea: builder.mutation<
      any,
      { ideaId: string; action: 'like' | 'dislike' }
    >({
      query: ({ ideaId, action }) => ({
        url: `/ideas/${ideaId}/${action}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { ideaId }) => [
        { type: 'Idea', id: ideaId },
        { type: 'Idea', id: 'LIST' },
      ],
    }),
    createIdea: builder.mutation<
      any,
      {
        title: string
        slug: string
        description_md: string
        tags: string[]
        media: any[]
      }
    >({
      query: idea => ({
        url: '/ideas/',
        method: 'POST',
        body: idea,
      }),
      invalidatesTags: ['Idea'],
    }),
    updateIdea: builder.mutation<
      any,
      {
        id: string
        data: {
          title?: string
          slug?: string
          description_md?: string
          tags?: string[]
          media?: any[]
        }
      }
    >({
      query: ({ id, data }) => ({
        url: `/ideas/${id}`,
        method: 'PUT', // или PATCH если ваш бек принимает PATCH
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Idea', id },
        { type: 'Idea', id: 'LIST' },
      ],
    }),

    uploadIdeaMedia: builder.mutation<any[], { ideaId: string; files: File[] }>(
      {
        query: ({ ideaId, files }) => {
          const formData = new FormData()
          files.forEach(file => formData.append('files', file))
          return {
            url: `/ideas/${ideaId}/media`,
            method: 'POST',
            body: formData,
          }
        },
      }
    ),
  }),
})

export const {
  useGetIdeasQuery,
  useGetIdeaBySlugQuery,
  useGetTotalCountQuery,
  useLikeOrDislikeIdeaMutation,
  useCreateIdeaMutation,
  useUploadIdeaMediaMutation,
  useUpdateIdeaMutation,
} = IdeasApi
