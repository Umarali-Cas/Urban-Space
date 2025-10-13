/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useGetProfileQuery, useUploadAvatarMutation } from '@/features/auth/api/authApi'
import classes from './ProfilePage.module.scss'
import settings from '../assets/icons/settings.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useGetArticlesQuery } from '@/widgets/Articles/api/articlesApi'
import { ArticlesCard } from '@/entities/ArticlesCard'
import noAricles from '../assets/images/articles.svg'
import noIdeas from '../assets/images/ideas.svg'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
// import edit from '../assets/icons/imageEdit.svg'
import { useProfileLocale } from '@/i18n/useNativeLocale'
import { getAvatarUrl } from '@/shared/hooks/getAvatarUrl'
import { IdeaCard } from '@/entities/IdeaCard'
import { getImageUrlFromMedia } from '@/shared/hooks/getImageUrlFromMedia'

export function ProfilePage() {
  const router = useRouter()
  const { data: user } = useGetProfileQuery()
  console.log(user)
  const locale = useProfileLocale()
  const [uploadAvatar] = useUploadAvatarMutation()
  const [avatarUrl, setAvatarUrl] = useState<any | string>(user?.avatar_url)
  const fileInputRef = useRef<HTMLInputElement>(null)

 const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0]
  if (file && user?.id) {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await uploadAvatar(formData).unwrap()
      const fileKey = response.avatar_url // 👈 убедись, что сервер возвращает avatar_url

      const newAvatarUrl = getAvatarUrl(user.id, fileKey)
      setAvatarUrl(newAvatarUrl)
    } catch (error) {
      console.error('Ошибка загрузки аватара:', error)
    }
  }
}
  
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
  console.log(userArticles)
  const userIdeas = articles.filter(article => article.category === 'idea')

  return (
    <section className={classes.profilePage}>
      <h1 className={classes.profilePage__title}>{locale.profile}</h1>

      <div className={classes.profilePage__container}>
        <div className={classes.profilePage__container__item}>
          <label className={classes.profilePage__container__item__avatarWrapper} style={{ cursor: 'pointer', position: 'relative' }}>
            <Image
              className={classes.profilePage__container__item__avatar}
              src={ avatarUrl || '/grey.jpg'}
              alt="Avatar"
              width={180}
              height={180}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </label>
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
        <h1 className={classes.profilePage__myArticles__title}>{locale.articles}</h1>
        <div className={classes.profilePage__myArticles__container}>
          {loadingArticles ? (
            <p style={{textAlign: 'center'}}>Загрузка статей...</p>
          ) : userArticles.length === 0 ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Image className={classes.profilePage__myArticles__container__noArticles} src={noAricles} alt='Нет статей' width={180} height={180}/>
              <p style={{textAlign: 'center', color: 'gray', marginTop: '20px'}}>{locale.notArticles}</p>
            </div>
          ) : (
            userArticles.map(article => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className={classes.profilePage__myArticles__card}
              >
                <ArticlesCard
                  comments={article.comments_count}
                  views={article.views_count}
                  info={false}
                  color={'#000000'}
                  key={article.id}
                  articleName={article.title}
                  article={article.summary}
                  userName={article.author_id ?? 'Неизвестный'}
                />
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Идеи */}
      <div className={classes.profilePage__myIdeas}>
        <h1 className={classes.profilePage__myIdeas__title}>{locale.ideas}</h1>
        <div className={classes.profilePage__myIdeas__container}>
          {loadingArticles ? (
            <p>Загрузка идей...</p>
          ) : userIdeas.length === 0 ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Image className={classes.profilePage__myArticles__container__noIdeas} src={noIdeas} alt='Нет статей' width={180} height={180}/>
              <p style={{textAlign: 'center', color: 'gray', marginTop: '20px'}}>{locale.noIdeas}</p>
            </div>
          ) : (
            userIdeas.map(idea => (
              <Link
                key={idea.id}
                href={`/articles/${idea.slug}`}
                className={classes.profilePage__myIdeas__card}
              >
            <IdeaCard
              key={`${idea.id}-${idea.slug}`}
              slug={idea.slug || ''}
              uniqueId={idea.id}
              date={idea?.created_at || ''}
              likes={idea.likes_count || 0}
              link={idea.link || ''}
              subtitle={idea.description_md || ''}
              title={idea.title || ''}
              userName={idea.author_id}
              imageUrl={getImageUrlFromMedia(idea.media)}
              status={idea.status || 'DRAFT'}
            />
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
