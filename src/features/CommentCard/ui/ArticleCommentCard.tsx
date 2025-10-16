/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import Image from 'next/image'
import classes from './CommentCard.module.scss'
import { useGetUserByIdQuery } from '@/features/auth/api/authApi'
import { useCreateCommentMutation } from '@/widgets/Articles/api/articlesApi'
import baseAvatar from '../assets/UserImage.jpg'
import { useEffect, useRef, useState } from 'react'

export function ArticleCommentCard({ com, articleId, className }: any) {
  const { data: userInfo } = useGetUserByIdQuery(com.author_id)
  const [createComment, { isLoading }] = useCreateCommentMutation()
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')

  const handleReply = async () => {
    if (!replyText.trim()) return
    try {
      await createComment({
        articleId,
        body_md: replyText,
        parent_id: com.id,
      }).unwrap()

      setReplyText('')
      setIsReplying(false)
    } catch (error) {
      console.error('Ошибка при отправке ответа:', error)
    }
  }

  const replyRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // если клик вне replyBox
      if (replyRef.current && !replyRef.current.contains(event.target as Node)) {
        setIsReplying(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  

  return (
    <div className={`${classes.commentCard} ${className}`}>
      <div className={classes.commentCard__header}>
        <Image
          className={classes.commentCard__header__avatar}
          src={userInfo?.avatar_url || baseAvatar}
          alt="user"
          width={48}
          height={48}
        />
        <span className={classes.commentCard__header__name}>
          {userInfo?.username || 'user'}
        </span>
      </div>

      <p className={classes.commentCard__body}>{com?.body_html}</p>

      <button
        className={classes.commentCard__replyButton}
        onClick={() => setIsReplying(!isReplying)}
      >
        Ответить
      </button>

      {isReplying && (
        <div className={classes.commentCard__replyBox} ref={replyRef}>
          <input
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Ваш ответ"
          />
          <button onClick={handleReply} disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Отправить'}
          </button>
        </div>
      )}

      {com.children?.length > 0 && (
        <div className={classes.commentCard__children}>
          {com.children.map((child: any) => (
            <ArticleCommentCard
              className={classes.commentCard__child}
              key={child.id}
              com={child}
              articleId={articleId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
