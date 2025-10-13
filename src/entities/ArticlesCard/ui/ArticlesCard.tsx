'use client'

import Image from 'next/image'
import classes from './ArticlesCard.module.scss'
import avatar from '../assets/UserImage.jpg'
import { ArticlesCardProps } from '../types/type'
import { useGetUserByIdQuery } from '@/features/auth/api/authApi'
import eye from '../assets/eye.svg'
import eyeWhite from '../assets/eyeWhite.svg'
import comment from '../assets/comment.svg'
import commentWhite from '../assets/commentWhite.svg'



export function ArticlesCard({
  color,
  userName,
  articleName,
  article,
  views,
  comments,
  info = false
}: ArticlesCardProps) {
  const { data: userInfo } = useGetUserByIdQuery(userName)

  return (
    <div className={classes.articlesCard}>
      <h3 style={{ color: color }} className={classes.articlesCard__title}>
        {articleName}
      </h3>
      <p style={{color: color}} className={classes.articlesCard__subtitle}>{article}</p>
      <div className={classes.articlesCard__user}>
        <Image
          src={userInfo?.avatar_url || avatar}
          alt="avatar"
          className={classes.articlesCard__user__avatar}
          width={48}
          height={48}
        />
        <div className={classes.articlesCard__user__info}>
          <span className={classes.articlesCard__user__info__name}>
            {userInfo?.username || 'неизвестный'}
          </span>
          <span className={classes.articlesCard__user__info__role}>
            Публицист
          </span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: "flex-end",
          columnGap: '5px',
          marginTop: info ? '15px' : '0'
        }}
      >
        <Image src={color === "white" || color === "#ffffff" ? commentWhite : comment} alt="comments" width={20} height={20}/>
        <span style={{ fontSize: '13px', color: color === "black" || color === "#000000" ? "grey" : color , marginRight: "4px" }}>{comments}</span>

        <Image src={color === "white" || color === "#ffffff" ? eyeWhite : eye} alt="views" width={20} height={20} />
        <span style={{ fontSize: '13px', color: color === "black" || color === "#000000" ? "grey" : color }}>{views}</span>
      </div>
    </div>
  )
}
