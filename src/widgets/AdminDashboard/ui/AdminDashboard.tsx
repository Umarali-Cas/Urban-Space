/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect } from 'react'
import cls from './AdminDashboard.module.scss'
import { Button } from '@/shared/Button'
import { useGetProfileQuery } from '@/features/auth/api/authApi'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import type { RootState } from '@/app/store/store'

export const AdminDashboard = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(
    undefined,
    { skip: false }
  )
  const { user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

    useEffect(() => {
      if (
        !profileLoading &&
        (!user || (user.role !== 'admin' && user.is_superuser !== true))
      ) {
        router.push('/')
      }
    }, [profileLoading, user, router])

  if (profileLoading) {
    return (
      <section>
        <div className={cls.adminWidget}>
          <h1>Проверка доступа...</h1>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className={cls.adminWidget}>
        <h1 className={cls.title}>Админ панель</h1>
        <div className={cls.dashboardList}>
          <Button
            text="Управление статьями"
            onClick={() => router.push('/admin/articles')}
            className={cls.dashboardBtn}
          />
          <Button
            text="Управление страницами"
            onClick={() => router.push('/admin/a-pages')}
            className={cls.dashboardBtn}
          />
          <Button
            text="Управление идеями"
            onClick={() => router.push('/admin/ideas')}
            className={cls.dashboardBtn}
          />
        </div>
      </div>
    </section>
  )
}
