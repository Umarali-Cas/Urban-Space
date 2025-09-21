import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/app/store/store'

export const adminArticlesApi = createApi({
  reducerPath: 'adminArticlesApi',
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
    updateArticleStatus: builder.mutation<
      void,
      { articleId: string; data: { status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_CLARIFICATION' | 'PUBLISHED'; reason?: string } }
    >({
      query: ({ articleId, data }) => ({
        url: `/admin/articles/${articleId}/status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Articles'],
    }),
    updateArticleFeature: builder.mutation<
      void,
      { articleId: string; data: { featured: boolean; idea_id?: string } }
    >({
      query: ({ articleId, data }) => ({
        url: `/admin/articles/${articleId}/feature`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
})

export const {
  useUpdateArticleStatusMutation,
  useUpdateArticleFeatureMutation,
} = adminArticlesApi
