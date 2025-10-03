import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/app/store/store'
import { setCredentials, logout } from '@/features/auth/lib/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // пробуем refresh
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshResult.data) {
      const { access_token } = refreshResult.data as {
        access_token: string
        token_type: string
      }

      // сохраним новый токен
      api.dispatch(setCredentials({ user: null, token: access_token }))

      // повторим оригинальный запрос
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}
