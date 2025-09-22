'use client'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import type { RootState } from '@/app/store/store'

interface WithAdminAuthProps {
  children: React.ReactNode
}

export const WithAdminAuth: React.FC<WithAdminAuthProps> = ({ children }) => {
  const router = useRouter()
  const { user, token } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Если нет токена — не авторизован, редирект на логин
    if (!token) {
      router.push('/login')
      return
    }

    // Если нет user или роль не admin/is_superuser — редирект на главную
    if (!user || (user.role !== 'admin' && user.is_superuser !== true)) {
      router.push('/')
      return
    }
  }, [user, token, router])

  // Пока проверка идёт — показываем loader
  if (!token || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Загрузка...</p>
      </div>
    )
  }

  if (user.role !== 'admin' && user.is_superuser !== true) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Доступ запрещён. Обратитесь к администратору.</p>
      </div>
    )
  }

  // Если доступ ок — рендерим children (AdminW)
  return <>{children}</>
}
