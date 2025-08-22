import Link from 'next/link'
import classes from './IdeaCard.module.scss'
import Image from 'next/image'
import heartIcon from '../assets/icons/heart.svg'
import { IdeaCardProps } from '../types/type'
import baseAvatar from '../assets/images/UserImage.jpg'

export function IdeaCard({
  title,
  subtitle,
  userName,
  date,
  likes,
  link,
  imageUrl,
  avatarUrl,
}: IdeaCardProps) {
  return (
    <div className={classes.ideaCard}>
      <Image src={imageUrl || ''} alt='image' className={classes.ideaCard__image}/>
      <div className={classes.ideaCard__content}>
        <h2 className={classes.ideaCard__title}>{title}</h2>
        <p className={classes.ideaCard__subtitle}>{subtitle}</p>
        <div className={classes.ideaCard__box}>
          <div className={classes.ideaCard__box__profile}>
            <Image src={avatarUrl || baseAvatar} alt='avatar' className={classes.ideaCard__box__profile__avatar}/>
            <span className={classes.ideaCard__box__profile__name}>
              {userName}
            </span>
          </div>
          <span className={classes.ideaCard__box__time}>{date}</span>
        </div>
        <div className={classes.ideaCard__tags}>
          <div className={classes.ideaCard__tags__likes}>
            <Image src={heartIcon} alt="heart" width={24} height={24} />
            <span className={classes.ideaCard__tags__likes__count}>
              {likes}
            </span>
          </div>
          <Link href={link} className={classes.ideaCard__tags__link}>
            Подробнее →
          </Link>
        </div>
      </div>
    </div>
  )
}
