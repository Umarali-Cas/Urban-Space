/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CrowdsourceApi = createApi({
  reducerPath: 'crowdsourceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('accept', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Crowdsource'],
  endpoints: builder => ({
    // создание краудсорс-идеи
    createCrowdsource: builder.mutation<
      any,
      {
        theme: string
        description: string
        category: string
        image?: any // сюда можно передать объект с файлом или url
        tags?: string
        lat: number
        lng: number
      }
    >({
      query: idea => ({
        url: '/crowdsource/',
        method: 'POST',
        body: idea,
      }),
      invalidatesTags: ['Crowdsource'],
    }),
  }),
})

export const { useCreateCrowdsourceMutation } = CrowdsourceApi
