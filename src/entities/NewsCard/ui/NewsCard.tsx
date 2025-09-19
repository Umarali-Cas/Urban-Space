'use client'

import Link from 'next/link'
import classes from './NewsCard.module.scss'
import { NewsCardProps } from '../types/type'
import { useMoreButton } from '@/i18n/useNativeLocale'

export function NewsCard({
  title,
  subtitle,
  date,
  link,
  imageUrl,
}: NewsCardProps) {
  return (
    <div className={classes.newsCard}>
      <div
        className={classes.newsCard__image}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className={classes.newsCard__content}>
        <h2 className={classes.newsCard__content__title}>{title}</h2>
        <p className={classes.newsCard__content__subtitle}>{subtitle}</p>
        <span className={classes.newsCard__content__date}>{date}</span>
        <Link href={link} className={classes.newsCard__content__link}>
          {useMoreButton()} →
        </Link>
      </div>
    </div>
  )
}
