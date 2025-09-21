import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/app/store/store'

export interface AdminIdea {
  id: string
  title: string
  description: string
  tags: string[]
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_CLARIFICATION' | 'PUBLISHED'
  featured: boolean
}

export const adminIdeasApi = createApi({
  reducerPath: 'adminIdeasApi',
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
  tagTypes: ['Ideas'],
  endpoints: builder => ({
    // 🔹 получение всех идей (с фильтром по статусу)
    getAdminIdeas: builder.query<AdminIdea[], { limit?: number; offset?: number; status?: string }>({
      query: ({ limit = 20, offset = 0, status }) => {
        const params = new URLSearchParams({
          limit: String(limit),
          offset: String(offset),
          ...(status ? { status } : {}),
        })
        return `/admin/ideas?${params.toString()}`
      },
      providesTags: ['Ideas'],
    }),
    // 🔹 обновление статуса идеи
    updateIdeaStatus: builder.mutation<
      void,
      { ideaId: string; data: { status: AdminIdea['status']; reason?: string } }
    >({
      query: ({ ideaId, data }) => ({
        url: `/admin/ideas/${ideaId}/status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Ideas'],
    }),
    // 🔹 изменение featured
    updateIdeaFeature: builder.mutation<
      void,
      { ideaId: string; data: { featured: boolean } }
    >({
      query: ({ ideaId, data }) => ({
        url: `/admin/ideas/${ideaId}/feature`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Ideas'],
    }),
  }),
})

export const {
  useGetAdminIdeasQuery,
  useUpdateIdeaStatusMutation,
  useUpdateIdeaFeatureMutation,
} = adminIdeasApi
