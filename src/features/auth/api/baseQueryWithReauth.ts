import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/app/store/store'
import { setCredentials, logout } from '@/features/auth/lib/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'include', // 👈 нужно для передачи refresh_token cookie
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})

export const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    console.warn('⏳ Access token expired, trying refresh...')

    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      const { access_token } = refreshResult.data as {
        access_token: string
        token_type: string
      }

      // обновим access_token в store
const state = (api.getState() as RootState).auth
api.dispatch(setCredentials({ user: state.user, token: access_token }))

      // повторим исходный запрос
      result = await baseQuery(args, api, extraOptions)
    } else {
      console.warn('❌ Refresh failed — logging out')
      api.dispatch(logout())
    }
  }

  return result
}
