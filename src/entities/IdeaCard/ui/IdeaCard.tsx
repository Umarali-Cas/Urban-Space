/* eslint-disable react-hooks/rules-of-hooks */
// src/features/CustomMap/ui/IdeaCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLikeIdeaMutation } from '@/widgets/LastIdeas/api/IdeasApi'
import classes from './IdeaCard.module.scss'
import heartIcon from '../assets/icons/heart.svg'
import baseAvatar from '../assets/images/UserImage.jpg'
import { IdeaCardProps } from '../types/type'
import { useMoreButton, useSupportProjectIdea } from '@/i18n/useNativeLocale'

export function IdeaCard({
  slug,
  title,
  subtitle,
  userName,
  date,
  likes,
  imageUrl,
  avatarUrl,
  uniqueId,
  onSelect,
}: IdeaCardProps & { uniqueId: string }) {
  // хук для лайка
  const [likeIdea, { isLoading: isLiking }] = useLikeIdeaMutation()

  const handleLike = () => {
    if (isLiking) return
    likeIdea(uniqueId)
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
              src={avatarUrl || baseAvatar}
              alt="avatar"
              width={32}
              height={32}
              className={classes.ideaCard__box__profile__avatar}
            />
            <span className={classes.ideaCard__box__profile__name}>
              {userName}
            </span>
          </div>
          <span className={classes.ideaCard__box__time}>{date}</span>
        </div>

        <div className={classes.ideaCard__tags}>
          <div
            className={classes.ideaCard__tags__likes}
            onClick={handleLike}
            style={{ cursor: isLiking ? 'wait' : 'pointer' }}
          >
            <Image
              src={heartIcon}
              alt="heart"
              width={24}
              height={24}
              className={classes.ideaCard__tags__likes__icon}
            />
            <span className={classes.ideaCard__tags__likes__count}>
              {likes}
            </span>
          </div>

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
