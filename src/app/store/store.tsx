import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { authApi } from '@/features/auth/api/authApi'
import authReducer from '@/features/auth/lib/authSlice'
import { articlesApi } from '@/widgets/Articles/api/articlesApi'
import { IdeasApi } from '@/widgets/LastIdeas/api/IdeasApi'
import { mapApi } from '@/features/CustomMap/api/mapApi'
import { getAreasApi } from '@/features/CustomMap/api/getAreasApi'
import storage from '../utils/storage'

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [IdeasApi.reducerPath]: IdeasApi.reducer,
  [mapApi.reducerPath]: mapApi.reducer,
  [getAreasApi.reducerPath]: getAreasApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [authApi.reducerPath, articlesApi.reducerPath, IdeasApi.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, articlesApi.middleware, IdeasApi.middleware, mapApi.middleware, getAreasApi.middleware),
})

export const storePersisted = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
