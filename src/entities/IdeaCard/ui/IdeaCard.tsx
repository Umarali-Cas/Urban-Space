/* eslint-disable react-hooks/rules-of-hooks */
// src/features/CustomMap/ui/IdeaCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLikeOrDislikeIdeaMutation } from '@/widgets/LastIdeas/api/IdeasApi'
import classes from './IdeaCard.module.scss'
import heartIcon from '../assets/icons/heart.svg'
import filled from '../assets/icons/filledheart.svg'
import baseAvatar from '../assets/images/UserImage.jpg'
import { IdeaCardProps } from '../types/type'
import { useMoreButton, useSupportProjectIdea } from '@/i18n/useNativeLocale'
import { useGetUserByIdQuery } from '@/features/auth/api/authApi'
import { useEffect, useState } from 'react'

export function IdeaCard({
  slug,
  title,
  subtitle,
  userName,
  date,
  likes,
  imageUrl,
  uniqueId,
  userLiked,
  onSelect,
}: IdeaCardProps & { uniqueId: string }) {
  // хук для лайка
  const [likeOrDislikeIdea, { isLoading }] = useLikeOrDislikeIdeaMutation()
  const { data: userInfo } = useGetUserByIdQuery(userName)

  // в props ожидайте userLiked?: boolean и likes: number
  const [localLiked, setLocalLiked] = useState<boolean>(Boolean(userLiked))
  const [localLikesCount, setLocalLikesCount] = useState<number>(likes ?? 0)

  const formatDate = () => {
    const data = new Date(date)
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(data)
  }

  useEffect(() => {
    setLocalLiked(Boolean(userLiked))
  }, [userLiked])

  useEffect(() => {
    setLocalLikesCount(likes ?? 0)
  }, [likes])

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation() // не прокидываем клик вверх (например Link)
    e.preventDefault()
    if (isLoading) return

    const action = localLiked ? 'dislike' : 'like'

    // Оптимистичный апдейт
    setLocalLiked(prev => !prev)
    setLocalLikesCount(prev =>
      action === 'like' ? prev + 1 : Math.max(0, prev - 1)
    )

    try {
      await likeOrDislikeIdea({ ideaId: uniqueId, action }).unwrap()
      // RTK invalidatesTags должен подтянуть свежие данные, но мы уже показали оптимистично
    } catch (err) {
      // Откат при ошибке
      console.error('Like request failed', err)
      setLocalLiked(prev => !prev)
      setLocalLikesCount(prev =>
        action === 'like' ? Math.max(0, prev - 1) : prev + 1
      )
    }
  }

  return (
    <div className={classes.ideaCard}>
      <div className={classes.ideaCard__imageWrapper}>
        <Image
          src={imageUrl || '/grey.jpg'}
          alt="image"
          width={416}
          height={240}
          className={classes.ideaCard__image}
        />
      </div>

      <div className={classes.ideaCard__content}>
        <h2 className={classes.ideaCard__title}>{title}</h2>
        <p className={classes.ideaCard__subtitle}>{subtitle}</p>

        <div className={classes.ideaCard__box}>
          <div className={classes.ideaCard__box__profile}>
            <Image
              src={userInfo?.avatar_url || baseAvatar}
              alt="avatar"
              width={32}
              height={32}
              className={classes.ideaCard__box__profile__avatar}
            />
            <span className={classes.ideaCard__box__profile__name}>
              {userInfo?.username || ''}
            </span>
          </div>
          <span className={classes.ideaCard__box__time}>{formatDate()}</span>
        </div>

        <div className={classes.ideaCard__tags}>
          <button
            type="button"
            onClick={handleLike}
            className={classes.ideaCard__tags__likes}
            disabled={isLoading}
            aria-pressed={localLiked}
            title={localLiked ? 'Убрать лайк' : 'Поставить лайк'}
          >
            <Image
              src={localLiked ? filled : heartIcon}
              alt="like"
              width={24}
              height={24}
              className={classes.ideaCard__tags__likes__icon}
              style={{
                filter: localLiked ? 'drop-shadow(0 0 5px red)' : 'none',
              }}
            />
            <span className={classes.ideaCard__tags__likes__count}>
              {localLikesCount}
            </span>
          </button>

          <Link
            href={`/ideas/${slug}/`}
            className={classes.ideaCard__tags__link}
          >
            {useMoreButton()}
          </Link>
        </div>

        {onSelect && (
          <button className={classes.ideaCard__button} onClick={onSelect}>
            {useSupportProjectIdea()}
          </button>
        )}
      </div>
    </div>
  )
}
