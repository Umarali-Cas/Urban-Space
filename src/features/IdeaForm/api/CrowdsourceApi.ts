/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CrowdsourceApi = createApi({
  reducerPath: 'crowdsourceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as any).auth?.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('accept', 'application/json')

      // 🧠 не добавляем content-type для FormData (uploadCrowdMedia)
      if (endpoint !== 'uploadCrowdMedia') {
        headers.set('content-type', 'application/json')
      }

      return headers
    },
  }),
  tagTypes: ['Crowdsource'],
  endpoints: builder => ({
    createCrowdsource: builder.mutation<
      any,
      { theme: string; description: string }
    >({
      query: idea => ({
        url: '/crowdsource/',
        method: 'POST',
        body: idea,
      }),
      invalidatesTags: ['Crowdsource'],
    }),
    uploadCrowdMedia: builder.mutation({
      query: ({ crowd_id, body }) => ({
        url: `/crowdsource/${crowd_id}/media`,
        method: 'POST',
        body, // FormData
      }),
    }),
  }),
})

export const { useCreateCrowdsourceMutation, useUploadCrowdMediaMutation } =
  CrowdsourceApi
