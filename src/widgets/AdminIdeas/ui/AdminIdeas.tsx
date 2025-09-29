/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect } from 'react'
import cls from './AdminIdeas.module.scss'
import { Button } from '@/shared/Button'
import { useGetIdeasQuery } from '@/widgets/LastIdeas/api/IdeasApi' // публичное API
import { useUpdateIdeaStatusMutation } from '@/widgets/AdminIdeas/api/adminIdeasApi' // админское API
import { useGetProfileQuery } from '@/features/auth/api/authApi'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import type { RootState } from '@/app/store/store'

export const AdminIdeas = () => {
  const {
    data: ideas = [],
    isLoading,
    error,
  } = useGetIdeasQuery({ limit: 20, offset: 0 })
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(
    undefined,
    { skip: false }
  )
  const [updateIdeaStatus] = useUpdateIdeaStatusMutation()
  const { user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!profileLoading && (!user || user.role !== 'SUPERADMIN')) {
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

  const approveIdea = async (id: string) => {
    try {
      await updateIdeaStatus({
        ideaId: id,
        data: { status: 'APPROVED', reason: 'Approved by admin' },
      }).unwrap()
    } catch (err) {
      console.error('Ошибка при одобрении идеи:', err)
    }
  }

  const denyIdea = async (id: string) => {
    try {
      await updateIdeaStatus({
        ideaId: id,
        data: { status: 'REJECTED', reason: 'Rejected by admin' },
      }).unwrap()
    } catch (err) {
      console.error('Ошибка при отклонении идеи:', err)
    }
  }

  if (isLoading) {
    return (
      <section>
        <div className={cls.adminWidget}>
          <h1>Загрузка идей...</h1>
        </div>
      </section>
    )
  }

  if (error) {
    console.error('Ошибка API идей:', error)
    return (
      <section>
        <div className={cls.adminWidget}>
          <h1>Ошибка загрузки идей</h1>
        </div>
      </section>
    )
  }

  const moderationIdeas = ideas.filter(idea =>
    ['DRAFT', 'PENDING', 'NEEDS_CLARIFICATION'].includes(idea.status)
  )

  if (moderationIdeas.length === 0) {
    return (
      <section>
        <div className={cls.adminWidget}>
          <h1>Нет идей на модерацию</h1>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className={cls.adminWidget}>
        <h1 className={cls.title}>Идеи на модерацию</h1>
        <div className={cls.ideasList}>
          {moderationIdeas.map(idea => (
            <article key={idea.id} className={cls.ideaCard}>
              <h2 className={cls.ideaTitle}>{idea.title}</h2>
              <p className={cls.ideaDescription}>{idea.description}</p>
              <div className={cls.ideaMeta}>
                <div className={cls.tags}>
                  {(idea.tags ?? []).map((tag: string, i: number) => (
                    <span key={i} className={cls.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={cls.status}>Статус: {idea.status}</span>
              </div>
              <div className={cls.actions}>
                <Button
                  text="Одобрить"
                  onClick={() => approveIdea(idea.id)}
                  className={cls.approveBtn}
                />
                <Button
                  text="Отклонить"
                  onClick={() => denyIdea(idea.id)}
                  className={cls.denyBtn}
                />
                <Button
                  text="Посмотреть контент"
                  onClick={() => console.log('Открыть просмотр идеи:', idea)}
                  className={cls.viewBtn}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
