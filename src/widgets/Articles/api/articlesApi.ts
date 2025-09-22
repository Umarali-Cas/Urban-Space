/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/app/store/store'

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
        url: '/articles/',
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
} = articlesApi
