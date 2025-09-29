/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect } from 'react'
import cls from './AdminArticles.module.scss'
import { Button } from '@/shared/Button'
import { useGetArticlesQuery } from '@/widgets/Articles/api/articlesApi'
import { useUpdateArticleStatusMutation } from '@/widgets/AdminArticles/api/adminArticlesApi'
import { useGetProfileQuery } from '@/features/auth/api/authApi'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import type { RootState } from '@/app/store/store'

interface Article {
  id: string
  title: string
  summary: string
  tags: string[]
  status:
    | 'DRAFT'
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'NEEDS_CLARIFICATION'
    | 'PUBLISHED'
  is_featured: boolean
}

export const AdminArticles = () => {
  const {
    data: allArticles = [],
    isLoading,
    error,
  } = useGetArticlesQuery({ limit: 20, offset: 0 })
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(
    undefined,
    { skip: false }
  )
  const [updateArticleStatus] = useUpdateArticleStatusMutation()
  const { user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
      if (
        !profileLoading &&
        (!user || (user.role !== 'SUPERADMIN'))
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

  const approveArticle = async (id: string) => {
    try {
      await updateArticleStatus({
        articleId: id,
        data: { status: 'PUBLISHED', reason: 'Approved by admin' },
      }).unwrap()
    } catch (err) {
      console.error('Ошибка при одобрении статьи:', err)
    }
  }

  const denyArticle = async (id: string) => {
    try {
      await updateArticleStatus({
        articleId: id,
        data: { status: 'REJECTED', reason: 'Denied due to content issues' },
      }).unwrap()
    } catch (err) {
      console.error('Ошибка при отклонении статьи:', err)
    }
  }

  if (isLoading) {
    return (
      <section>
        <div className={cls.adminWidget}>
          <h1>Загрузка...</h1>
        </div>
      </section>
    )
  }

  if (error) {
    console.log('Детали ошибки API:', error)
    return (
      <section>
        <div className={cls.adminWidget}>
          <h1>Ошибка загрузки статей</h1>
        </div>
      </section>
    )
  }

  const moderationArticles = allArticles.filter(article =>
    ['DRAFT', 'PENDING', 'NEEDS_CLARIFICATION'].includes(article.status)
  )

  if (moderationArticles.length === 0) {
    return (
      <section>
        <div className={cls.adminWidget}>
          <h1>Нет статей на модерацию</h1>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className={cls.adminWidget}>
        <h1 className={cls.title}>Статьи на модерацию</h1>
        <div className={cls.articlesList}>
          {moderationArticles.map(article => (
            <article key={article.id} className={cls.articleCard}>
              <h2 className={cls.articleTitle}>{article.title}</h2>
              <p className={cls.articleDescription}>{article.summary}</p>
              <div className={cls.articleMeta}>
                <div className={cls.tags}>
                  {article.tags.map((tag: string, index: number) => (
                    <span key={index} className={cls.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={cls.status}>Статус: {article.status}</span>
              </div>
              <div className={cls.actions}>
                <Button
                  text="Одобрить"
                  onClick={() => approveArticle(article.id)}
                  className={cls.approveBtn}
                />
                <Button
                  text="Отклонить"
                  onClick={() => denyArticle(article.id)}
                  className={cls.denyBtn}
                />
                <Button
                  text="Посмотреть контент"
                  onClick={() =>
                    console.log('Открыть просмотр контента:', article)
                  }
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
