/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const getAreasApi = createApi({
  reducerPath: 'getAreasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // https://api.urbanspace.sdinis.org
  }),
  endpoints: builder => ({
    getPublicData: builder.query<any[], { limit?: number; offset?: number; category?: string; search?: string }>({
      query: ({ limit = 20, offset = 0, category, search } = {}) => {
        const params = new URLSearchParams()
        params.append('limit', limit.toString())
        params.append('offset', offset.toString())
        if (category) params.append('category', category)
        if (search) params.append('search', search)
        return `/crowdsource/public?${params.toString()}`
      },
    }),
  }),
})

export const { useGetPublicDataQuery } = getAreasApi
