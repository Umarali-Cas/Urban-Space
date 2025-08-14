import Link from 'next/link'
import classes from './IdeaCard.module.scss'
import Image from 'next/image'
import heartIcon from '../assets/icons/heart.svg'

interface IdeaCardProps {
  title: string
  subtitle: string
  userName: string
  date: string
  likes: number
  link: string
  imageUrl?: string
  avatarUrl?: string
}

export function IdeaCard({
  title,
  subtitle,
  userName,
  date,
  likes,
  link,
  imageUrl,
  avatarUrl
}: IdeaCardProps) {
  return (
    <div className={classes.ideaCard}>
      <div
        className={classes.ideaCard__image}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className={classes.ideaCard__content}>
        <h2 className={classes.ideaCard__title}>{title}</h2>
        <p className={classes.ideaCard__subtitle}>{subtitle}</p>
        <div className={classes.ideaCard__box}>
          <div className={classes.ideaCard__box__profile}>
            <span
              className={classes.ideaCard__box__profile__avatar}
              style={{
                backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></span>
            <span className={classes.ideaCard__box__profile__name}>
              {userName}
            </span>
          </div>
          <span className={classes.ideaCard__box__time}>{date}</span>
        </div>
        <div className={classes.ideaCard__tags}>
          <div className={classes.ideaCard__tags__likes}>
            <Image src={heartIcon} alt="heart" width={24} height={24} />
            <span className={classes.ideaCard__tags__likes__count}>{likes}</span>
          </div>
          <Link href={link} className={classes.ideaCard__tags__link}>
            Подробнее →
          </Link>
        </div>
      </div>
    </div>
  )
}
