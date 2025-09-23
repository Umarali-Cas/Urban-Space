/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/app/store/store'

export interface Page {
  id: string
  slug: string
  title: string
  locale: string
  version: number
  is_published?: boolean
  blocks: Block[]
}

export interface Block {
  id: string
  type: string
  position: number
  data: Record<string, any>
}

export const adminPagesApi = createApi({
  reducerPath: 'adminPagesApi',
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
  tagTypes: ['Pages', 'Blocks'],
  endpoints: builder => ({
    createPage: builder.mutation<
      Page,
      { slug: string; locale: string; title: string; is_published: boolean }
    >({
      query: body => ({
        url: `/admin/pages/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Pages'],
    }),

    addPageBlock: builder.mutation<
      Block,
      {
        pageId: string
        body: {
          locale: string
          type: string
          order: number
          data: Record<string, any>
        }
      }
    >({
      query: ({ pageId, body }) => ({
        url: `/admin/pages/${pageId}/blocks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Blocks'],
    }),

    updatePageLocale: builder.mutation<
      Page,
      {
        pageId: string
        body: { locale: string; title: string; is_published: boolean }
      }
    >({
      query: ({ pageId, body }) => ({
        url: `/admin/pages/${pageId}/locales`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Pages'],
    }),

    updateBlockLocale: builder.mutation<
      Block,
      {
        blockId: string
        body: {
          locale: string
          type: string
          order: number
          data: Record<string, any>
        }
      }
    >({
      query: ({ blockId, body }) => ({
        url: `/admin/pages/blocks/${blockId}/locales`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Blocks'],
    }),

    deleteBlockLocale: builder.mutation<
      void,
      { blockId: string; locale: string }
    >({
      query: ({ blockId, locale }) => ({
        url: `/admin/pages/blocks/${blockId}/locales/${locale}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blocks'],
    }),

    updateBlock: builder.mutation<
      Block,
      {
        blockId: string
        body: { type?: string; order?: number; data?: Record<string, any> }
      }
    >({
      query: ({ blockId, body }) => ({
        url: `/admin/pages/blocks/${blockId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Blocks'],
    }),

    deleteBlock: builder.mutation<void, { blockId: string }>({
      query: ({ blockId }) => ({
        url: `/admin/pages/blocks/${blockId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blocks'],
    }),
  }),
})

export const {
  useCreatePageMutation,
  useAddPageBlockMutation,
  useUpdatePageLocaleMutation,
  useUpdateBlockLocaleMutation,
  useDeleteBlockLocaleMutation,
  useUpdateBlockMutation,
  useDeleteBlockMutation,
} = adminPagesApi
