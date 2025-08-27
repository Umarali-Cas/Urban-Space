import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storePersisted } from '@/app/store/store';

export interface User {
  id: string;
  email: string;
  username: string;
  phone_number?: string | null;
  region?: string | null;
  role?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  created_at?: string;
  avatar_url?: string | null;
  avatar_key?: string | null;
  avatar_updated_at?: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      storePersisted.purge();
      if (typeof window !== "undefined") {
        localStorage.removeItem("authData");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
