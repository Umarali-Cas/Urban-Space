import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { authApi } from '@/features/auth/api/authApi'
import authReducer from '@/features/auth/lib/authSlice'
import { articlesApi } from '@/widgets/Articles/api/articlesApi'
import { IdeasApi } from '@/widgets/LastIdeas/api/IdeasApi'
import storage from '../utils/storage'
import { adminPagesApi } from '@/widgets/AdminPages/api/adminPagesApi'
import { adminArticlesApi } from '@/widgets/AdminArticles/api/adminArticlesApi'
import { adminIdeasApi } from '@/widgets/AdminIdeas/api/adminIdeasApi'
import { pagesApi } from '@/widgets/AdminPages/api/PagesApi'
import { CrowdsourceApi } from '@/features/IdeaForm/api/CrowdsourceApi'

const rootReducer = combineReducers({
  auth: authReducer,
  [adminArticlesApi.reducerPath]: adminArticlesApi.reducer,
  [adminIdeasApi.reducerPath]: adminIdeasApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
  [IdeasApi.reducerPath]: IdeasApi.reducer,
  [adminPagesApi.reducerPath]: adminPagesApi.reducer,
  [pagesApi.reducerPath]: pagesApi.reducer,
  [CrowdsourceApi.reducerPath]: CrowdsourceApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    authApi.reducerPath,
    articlesApi.reducerPath,
    IdeasApi.reducerPath,
    adminPagesApi.reducerPath,
    adminArticlesApi.reducerPath,
    adminIdeasApi.reducerPath,
    pagesApi.reducerPath,
    CrowdsourceApi.reducerPath
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      articlesApi.middleware,
      IdeasApi.middleware,
      adminPagesApi.middleware,
      adminArticlesApi.middleware,
      adminIdeasApi.middleware,
      pagesApi.middleware,
      CrowdsourceApi.middleware
    ),
})

export const storePersisted = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
