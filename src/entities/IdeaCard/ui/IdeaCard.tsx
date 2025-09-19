/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link'
import classes from './IdeaCard.module.scss'
import Image from 'next/image'
import heartIcon from '../assets/icons/heart.svg'
import { IdeaCardProps } from '../types/type'
import baseAvatar from '../assets/images/UserImage.jpg'
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
  onSelect
}: IdeaCardProps) {
  return (
    <div className={classes.ideaCard}>
      <div className={classes.ideaCard__imageWrapper}>
        <Image
          src={imageUrl || '/grey.jpg'}
          alt='image'
          className={classes.ideaCard__image}
          width={416}
          height={240}
        />
      </div>
      <div className={classes.ideaCard__content}>
        <h2 className={classes.ideaCard__title}>{title}</h2>
        <p className={classes.ideaCard__subtitle}>{subtitle}</p>
        <div className={classes.ideaCard__box}>
          <div className={classes.ideaCard__box__profile}>
            <Image
              src={avatarUrl || baseAvatar}
              alt='avatar'
              className={classes.ideaCard__box__profile__avatar}
            />
            <span className={classes.ideaCard__box__profile__name}>{userName}</span>
          </div>
          <span className={classes.ideaCard__box__time}>{date}</span>
        </div>
        <div className={classes.ideaCard__tags}>
          <div className={classes.ideaCard__tags__likes}>
            <Image className={classes.ideaCard__tags__likes__icon} src={heartIcon} alt="heart" width={24} height={24} />
            <span className={classes.ideaCard__tags__likes__count}>{likes}</span>
          </div>
          <Link className={classes.ideaCard__tags__link} href={`/ideas/${slug}/`}>{useMoreButton()}</Link>
        </div>
        {onSelect && (
          <button className={classes.ideaCard__button} onClick={onSelect}>{useSupportProjectIdea()}</button>
        )}
      </div>
    </div>
  )
}
