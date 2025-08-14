import Image from 'next/image'
import classes from './ArticlesCard.module.scss'
import avatar from '../assets/UserImage.jpg'

interface ArticlesCardProps {
  userName: string
  role: string
  articleName: string
  article: string
  avatarUrl?: string
}

export function ArticlesCard({
  role,
  userName,
  avatarUrl,
  articleName,
  article,
}: ArticlesCardProps) {
  return (
    <div className={classes.articlesCard}>
      <h3 className={classes.articlesCard__title}>{articleName}</h3>
      <p className={classes.articlesCard__subtitle}>{article}</p>
      <div className={classes.articlesCard__user}>
        <Image
          src={avatarUrl || avatar}
          alt="avatar"
          className={classes.articlesCard__user__avatar}
          width={48}
          height={48}
        />
        <div className={classes.articlesCard__user__info}>
          <span className={classes.articlesCard__user__info__name}>
            {userName}
          </span>
          <span className={classes.articlesCard__user__info__role}>{role}</span>
        </div>
      </div>
    </div>
  )
}
