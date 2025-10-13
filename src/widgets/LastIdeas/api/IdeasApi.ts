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
  tagTypes: ['Idea', 'Comments'],
  endpoints: builder => ({

    // 🧠 Получение списка идей
    getIdeas: builder.query<
      any[],
      { limit?: number; offset?: number; search?: string; author_id?: string }
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

    // 🧠 Получение одной идеи по slug
    getIdeaBySlug: builder.query<any, string>({
      query: slug => `/ideas/${slug}`,
      providesTags: (result, error, slug) => [
        { type: 'Idea' as const, id: slug },
      ],
    }),

    // 📊 Общее количество идей
    getTotalCount: builder.query<number, void>({
      query: () => '/ideas/counts',
    }),

    // ❤️ Лайк / дизлайк
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

    // ✏️ Создание новой идеи
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

    // 🔄 Обновление идеи
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
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Idea', id },
        { type: 'Idea', id: 'LIST' },
      ],
    }),

    // 🖼️ Загрузка медиа для идеи
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

    // 💬 Получение комментариев к идее
    getComments: builder.query<any[], string>({
      query: ideaId => `/ideas/${ideaId}/comments`,
      providesTags: (result, error, ideaId) => [
        { type: 'Comments', id: ideaId },
      ],
    }),

    // 💌 Добавление комментария к идее
addComment: builder.mutation<any, { ideaId: string; text: string; parent_id?: string }>({
  query: ({ ideaId, text, parent_id }) => ({
    url: `/ideas/${ideaId}/comments`,
    method: 'POST',
    body: parent_id ? { body_md: text, parent_id } : { body_md: text },
  }),
  invalidatesTags: (result, error, { ideaId }) => [{ type: 'Comments', id: ideaId }],
}),

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
  useGetCommentsQuery,
  useAddCommentMutation,
} = IdeasApi
