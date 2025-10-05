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
    createCrowdsource: builder.mutation<any, {
      theme: string
      description: string
      category: string
      image?: File
      tags?: string
      lat: number
      lng: number
    }>({
      query: idea => {
        const formData = new FormData()
        formData.append('theme', idea.theme)
        formData.append('description', idea.description)
        formData.append('category', idea.category)
        formData.append('tags', idea.tags || '')
        formData.append('lat', idea.lat.toString())
        formData.append('lng', idea.lng.toString())

        if (idea.image) {
          formData.append('image', idea.image) // добавляем реальный файл
        }

        return {
          url: '/crowdsource/',
          method: 'POST',
          body: formData, // FormData вместо JSON
        }
      },
      invalidatesTags: ['Crowdsource'],
    }),
  }),
})

export const { useCreateCrowdsourceMutation } = CrowdsourceApi
