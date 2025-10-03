import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
// import { storePersisted } from '@/app/store/store'

export interface User {
  id: string
  email: string
  username: string
  phone_number?: string | null
  region?: string | null
  role?: string
  is_active?: boolean
  is_superuser?: boolean
  created_at?: string
  avatar_url?: string | null
  avatar_key?: string | null
  avatar_updated_at?: string | null
}

export interface AuthState {
  user: User | null
  token: string | null
}

// 🔁 Восстановление из cookie
const getInitialAuthState = (): AuthState => {
  const token = Cookies.get('token') ?? null
  const userRaw = Cookies.get('user')
  let user: User | null = null

  if (userRaw) {
    try {
      user = JSON.parse(userRaw)
    } catch {
      console.warn('Ошибка при парсинге user из cookie')
    }
  }

  return { token, user }
}

const initialState: AuthState = getInitialAuthState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User | null; token: string | null }>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token

      Cookies.set('token', action.payload.token ?? '', { expires: 7 })
      Cookies.set('user', JSON.stringify(action.payload.user ?? {}), { expires: 7 })
    },
    logout: state => {
      state.user = null
      state.token = null
      Cookies.remove('token')
      Cookies.remove('user')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
