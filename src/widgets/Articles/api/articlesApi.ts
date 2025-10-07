/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/app/store/store'

  interface CreateArticlePayload {
  slug: string
  title: string
  summary: string
  body_md: string
  category: string
  tags: string[]
  cover_key: string
  attachments: any[]
}

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Articles'],
  endpoints: builder => ({
    getArticles: builder.query<
      any[],
      {
        limit?: number
        offset?: number
        search?: string
        category?: string
        author_id?: string
        status?: string
      }
    >({
      query: ({
        limit = 6,
        offset = 0,
        search,
        category,
        author_id,
        status,
      }) => ({
        url: '/articles/public',
        params: {
          limit,
          offset,
          search,
          category,
          author_id,
          status,
        },
      }),
      providesTags: ['Articles'],
    }),

    getArticleBySlug: builder.query<any, string>({
      query: slug => `/articles/${slug}`,
      providesTags: ['Articles'],
    }),

    getTotalCount: builder.query<number, void>({
      query: () => '/articles/counts',
    }),
    updateArticle: builder.mutation<
      any,
      { articleId: string; data: Partial<Article> }
    >({
      query: ({ articleId, data }) => ({
        url: `/articles/${articleId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Articles'],
    }),
    deleteArticle: builder.mutation<void, string>({
      query: articleId => ({
        url: `/articles/${articleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),
createArticle: builder.mutation<any, CreateArticlePayload>({
  query: article => ({
    url: '/articles/',
    method: 'POST',
    body: article,
  }),
}),

    uploadCover: builder.mutation<string, File>({
      query: file => {
        const formData = new FormData()
        formData.append('file', file)
        return {
          url: '/articles/upload-cover',
          method: 'POST',
          body: formData,
        }
      },
    }),

    uploadAttachments: builder.mutation<
      string[],
      { articleId: string; files: File[] }
    >({
      query: ({ articleId, files }) => {
        const formData = new FormData()
        files.forEach(file => formData.append('files', file))
        return {
          url: `/articles/${articleId}/attachments`,
          method: 'POST',
          body: formData,
        }
      },
    }),
  }),
})

interface Article {
  id: string
  slug: string
  title: string
  category: string
  summary: string
  body_md: string
  tags: string[]
  cover_key: string
  attachments: {
    file_key: string
    mime: string
    size_bytes: number
    meta: any
  }[]
  author_id: string
  status: 'DRAFT' | 'PUBLISHED' | 'REJECTED'
  views_count: number
  likes_count: number
  comments_count: number
  is_featured: boolean
}

export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useGetTotalCountQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useCreateArticleMutation,
  useUploadCoverMutation,
  useUploadAttachmentsMutation,
} = articlesApi
