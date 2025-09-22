import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/app/store/store'
import { setCredentials, User } from '@/features/auth/lib/authSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`) // 🔥 фиксировано Bearer
      }
      return headers
    },
  }),
  endpoints: builder => ({
    register: builder.mutation<
      User,
      {
        email: string
        password: string
        username: string
        phone_number?: string
        region?: string
      }
    >({
      query: userData => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    login: builder.mutation<
      { user: User; token: string },
      { email: string; password: string }
    >({
      async queryFn(
        credentials,
        { getState, dispatch },
        _extraOptions,
        baseQuery
      ) {
        const loginResponse = await baseQuery({
          url: '/auth/login-body',
          method: 'POST',
          body: credentials,
        })
        if (loginResponse.error) {
          console.error('Login error:', loginResponse.error)
          return { error: loginResponse.error }
        }
        const { access_token } = loginResponse.data as {
          access_token: string
          token_type: string
        }
        console.log('Access token:', access_token)

        // Сохраняем токен в стор перед запросом /auth/me
        dispatch(setCredentials({ user: null, token: access_token }))

        const profileResponse = await baseQuery({
          url: '/auth/me',
          method: 'GET',
        })
        console.log('Profile response:', profileResponse)
        console.log('Profile response error data:', profileResponse.error);
        if (profileResponse.error) {
          console.error('Profile error:', profileResponse.error)
          return { error: profileResponse.error }
        }
        const user = profileResponse.data as User
        return { data: { user, token: access_token } }
      },
    }),

    refresh: builder.mutation<
      { access_token: string; token_type: string },
      void
    >({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),

    getProfile: builder.query<User, void>({
      query: () => '/auth/me',
    }),

    updateProfile: builder.mutation<User, Partial<User>>({
      query: profileData => ({
        url: '/profile/update-profile',
        method: 'PATCH',
        body: profileData,
      }),
    }),

    deleteProfile: builder.mutation<void, void>({
      query: () => ({
        url: '/profile/delete-profile',
        method: 'DELETE',
      }),
    }),

    uploadAvatar: builder.mutation<{ avatar_url: string }, FormData>({
      query: formData => ({
        url: '/auth/me/avatar',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUploadAvatarMutation,
  useRefreshMutation,
} = authApi
