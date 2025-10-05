import classes from './ForumCard.module.scss'
import { ForumCardProps } from '../types/type'

export function ForumCard({ title }: ForumCardProps) {
  return (
    <div className={classes.forumCard}>
      <h2 className={classes.forumCard__title}>{title}</h2>
    </div>
  )
}
