/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useGetProfileQuery } from '@/features/auth/api/authApi'
import classes from './ProfilePage.module.scss'
import settings from '../assets/icons/settings.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useGetArticlesQuery } from '@/widgets/Articles/api/articlesApi'
import { ArticlesCard } from '@/entities/ArticlesCard'
import noAricles from '../assets/images/articles.svg'
import noIdeas from '../assets/images/ideas.svg'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function ProfilePage() {
  const router = useRouter()
  const { data: user } = useGetProfileQuery()

  const {
    data: articles = [],
    isLoading: loadingArticles,
  } = useGetArticlesQuery(
    {
      author_id: user?.id,
      status: 'PUBLISHED',
      limit: 20,
    },
    {
      skip: !user?.id,
    }
  )

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user])

  const userArticles = articles.filter(article => article.category !== 'idea')
  const userIdeas = articles.filter(article => article.category === 'idea')

  return (
    <section className={classes.profilePage}>
      <h1 className={classes.profilePage__title}>Мой профиль</h1>

      <div className={classes.profilePage__container}>
        <div className={classes.profilePage__container__item}>
          <Image
            className={classes.profilePage__container__item__avatar}
            src={user?.avatar_url || '/grey.jpg'}
            alt="Avatar"
            width={180}
            height={180}
          />
          <div className={classes.profilePage__container__item__info}>
            <h2 className={classes.profilePage__container__item__info__username}>
              {user?.username}
            </h2>
            <p className={classes.profilePage__container__item__info__region}>
              {user?.region}
            </p>
            <p className={classes.profilePage__container__item__info__email}>
              {user?.email}
            </p>
          </div>
        </div>
        <Image
          className={classes.profilePage__container__settingsIcon}
          src={settings}
          alt="settings"
          width={24}
          height={24}
        />
      </div>

      {/* Статьи */}
      <div className={classes.profilePage__myArticles}>
        <h1 className={classes.profilePage__myArticles__title}>Мои статьи</h1>
        <div className={classes.profilePage__myArticles__container}>
          {loadingArticles ? (
            <p style={{textAlign: 'center'}}>Загрузка статей...</p>
          ) : userArticles.length === 0 ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Image className={classes.profilePage__myArticles__container__noArticles} src={noAricles} alt='Нет статей' width={180} height={180}/>
              <p style={{textAlign: 'center', color: 'gray', marginTop: '20px'}}>У вас пока нет опубликованных статей.</p>
            </div>
          ) : (
            userArticles.map(article => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className={classes.profilePage__myArticles__card}
              >
                <ArticlesCard
                  color={'#000000'}
                  articleName={article.title}
                  article={article.summary}
                  role={article.tags ?? 'Автор'}
                  userName={user?.username ?? 'Неизвестный'}
                  avatarUrl={article.attachments ?? ''}
                />
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Идеи */}
      <div className={classes.profilePage__myIdeas}>
        <h1 className={classes.profilePage__myIdeas__title}>Мои идеи</h1>
        <div className={classes.profilePage__myIdeas__container}>
          {loadingArticles ? (
            <p>Загрузка идей...</p>
          ) : userIdeas.length === 0 ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Image className={classes.profilePage__myArticles__container__noIdeas} src={noIdeas} alt='Нет статей' width={180} height={180}/>
              <p style={{textAlign: 'center', color: 'gray', marginTop: '20px'}}>У вас пока нет опубликованных идей.</p>
            </div>
          ) : (
            userIdeas.map(idea => (
              <Link
                key={idea.id}
                href={`/articles/${idea.slug}`}
                className={classes.profilePage__myIdeas__card}
              >
                <ArticlesCard
                  color={'#000000'}
                  articleName={idea.title}
                  article={idea.summary}
                  role={idea.tags ?? 'Автор'}
                  userName={user?.username ?? 'Неизвестный'}
                  avatarUrl={idea.attachments ?? ''}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
