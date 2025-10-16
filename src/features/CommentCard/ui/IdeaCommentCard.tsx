/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import Image from 'next/image'
import classes from './CommentCard.module.scss'
import { useGetUserByIdQuery } from '@/features/auth/api/authApi'
import { useAddCommentMutation } from '@/widgets/LastIdeas/api/IdeasApi'
import baseAvatar from '../assets/UserImage.jpg'
import { useEffect, useRef, useState } from 'react'

export function IdeaCommentCard({ com, ideaId, className, title, inputTxt, sendTxt, sendingTxt }: any) {
  const { data: userInfo } = useGetUserByIdQuery(com.author_id)
  const [addComment, { isLoading }] = useAddCommentMutation()
  const [isReplying, setIsReplying] = useState(false)
  
  const [replyText, setReplyText] = useState('')

  const handleReply = async () => {
    if (!replyText.trim()) return

      const payload = {
    ideaId,
    text: replyText,
    parent_id: com.id,
  }

  console.log('📤 Отправляем комментарий:', payload)

  try {
    const response = await addComment(payload).unwrap()

    console.log('✅ Ответ от сервера:', response)
    setReplyText('')
    setIsReplying(false)
  } catch (error: any) {
    console.error('❌ Ошибка при отправке ответа:', error)
    if (error?.data) console.log('📄 Ответ сервера:', error.data)
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
        {title}
      </button>

      {isReplying && (
        <div className={classes.commentCard__replyBox} ref={replyRef}>
          <input
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder={inputTxt}
          />
          <button onClick={handleReply} disabled={isLoading}>
            {isLoading ? sendingTxt : sendTxt}
          </button>
        </div>
      )}

      {com.children?.length > 0 && (
        <div className={classes.commentCard__children}>
          {com.children.map((child: any) => (
            <IdeaCommentCard
              className={classes.commentCard__child}
              key={child.id}
              com={child}
              ideaId={ideaId}
              title={title}
              inputTxt={inputTxt}
              sendTxt={sendTxt}
              sendingTxt={sendingTxt}
            />
          ))}
        </div>
      )}
    </div>
  )
}
