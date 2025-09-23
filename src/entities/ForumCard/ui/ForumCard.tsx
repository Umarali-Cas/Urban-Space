import Image from 'next/image'
import classes from './ForumCard.module.scss'
import { ForumCardProps } from '../types/type'

export function ForumCard({ title, media }: ForumCardProps) {
  return (
    <div className={classes.forumCard}>
      <Image
        className={classes.forumCard__image}
        src={media}
        alt="company image"
        width={100}
        height={100}
      />
      <h2 className={classes.forumCard__title}>{title}</h2>
    </div>
  )
}
