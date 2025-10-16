/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image, { StaticImageData } from 'next/image'
import classes from './IdeasDetailPage.module.scss'
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useGetIdeasQuery,
} from '@/widgets/LastIdeas/api/IdeasApi'
import { IdeaCard } from '../IdeaCard'
import { useDetailPageLocale } from '@/i18n/useNativeLocale'
import { getImageIdea } from './getImageIdea'
import { getImageUrlFromMedia } from '@/shared/hooks/getImageUrlFromMedia'
import { useState } from 'react'
import { IdeaCommentCard } from '@/features/CommentCard/ui/IdeaCommentCard'

export function IdeasDetailPage({
  title,
  desc,
  image,
  timeCreate,
  id,
}: {
  title: string
  desc: string
  image: StaticImageData | string
  timeCreate: string
  id: string
}) {
  const { data: ideas = [], isLoading } = useGetIdeasQuery({ limit: 4 })
  const { titleIdea, subtitleIdea, share, otherIdeas, commentsTitle, send, noComments, sending, filesHave, input, reply, inputTxt, fileName } =
    useDetailPageLocale()

  // ✅ Для идей используем отдельную мутацию
  const { data: comments = [] } = useGetCommentsQuery(id)
  const [addComment, { isLoading: isAdding }] = useAddCommentMutation()
  const [commentText, setCommentText] = useState('')

  console.log(image)

  const images = Array.isArray(image)
    ? image.filter(file => file.mime?.startsWith('image/'))
    : []

  const files = Array.isArray(image)
    ? image.filter(file => file.mime?.startsWith('application/'))
    : []

  console.log(files)

  const formatDate = () => {
    const date = new Date(timeCreate)
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: 'Смотри идею на сайте!',
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
      }
    } catch (err) {
      console.error('Ошибка при шаринге:', err)
    }
  }

  const handleAddComment = async () => {
    if (!commentText.trim()) return
    console.log('ideaId:', id, 'text:', commentText)
    try {
      await addComment({ ideaId: id, text: commentText }).unwrap()
      setCommentText('')
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error)
    }
  }

  const buildTree = (comments: any[]) => {
    const map = new Map<string, any>()
    comments.forEach(c => map.set(c.id, { ...c, children: [] }))

    const roots: any[] = []

    comments.forEach(c => {
      if (c.parent_id) {
        const parent = map.get(c.parent_id)
        if (parent) parent.children.push(map.get(c.id))
      } else {
        roots.push(map.get(c.id))
      }
    })

    return roots
  }

  const structuredComments = buildTree(comments)

  return (
    <section className={classes.ideasDetailPage}>
      <div className={classes.ideasDetailPage__upper}>
        <h1>{titleIdea}</h1>
        <p>{subtitleIdea}</p>
      </div>

      <div className={classes.ideasDetailPage__content}>
        <div className={classes.ideasDetailPage__content__upWrapper}>
          <span>
            {formatDate()}{' '}
            <Image
              className={classes.calendarImg}
              src="/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
            />
          </span>
          <button
            className={classes.ideasDetailPage__content__upWrapper__share}
            onClick={handleShare}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <Image
              className={classes.shareImg}
              src="/share.svg"
              alt="share"
              width={24}
              height={24}
            />
            {share}
          </button>
        </div>

        <h1 className={classes.ideasDetailPage__content__title}>{title}</h1>

        <div
          className={classes.ideasDetailPage__content__imageWrapper}
          style={images.length === 0 ? { gap: '0' } : { gap: '32px' }}
        >
          {images.length > 0 ? (
            <Image
              className={classes.ideasDetailPage__content__imageWrapper__image}
              src={getImageIdea(id, images[0].file_key) || '/grey.jpg'}
              alt="main-image"
              width={815}
              height={512}
            />
          ) : (
            <Image
              className={classes.ideasDetailPage__content__imageWrapper__image}
              src="/grey.jpg"
              alt="placeholder"
              width={815}
              height={512}
            />
          )}

          <div
            className={classes.ideasDetailPage__content__imageWrapper__others}
          >
            {images.slice(1).map((img, idx) => (
              <Image
                key={idx}
                className={
                  classes.ideasDetailPage__content__imageWrapper__others__image
                }
                src={getImageIdea(id, img.file_key) || '/grey.jpg'}
                alt={`other-image-${idx}`}
                width={168}
                height={106}
              />
            ))}
          </div>
        </div>

        <p className={classes.ideasDetailPage__content__desc}>{desc}</p>
        {/* 🧾 Прикреплённые файлы */}
        {files.length > 0 && (
          <div className={classes.ideasDetailPage__files}>
            <h3>{filesHave}</h3>
            <ul>
              {files.map((file, idx) => {
                const fileUrl = getImageIdea(id, file.file_key)
                const ext = file.mime?.split('/')[1] || ''
                const isPdf = ext.includes('pdf')
                const isWord = ext.includes('word') || ext.includes('msword')
                const isExcel =
                  ext.includes('excel') || ext.includes('spreadsheet')

                const icon = isPdf
                  ? '/pdf.svg'
                  : isWord
                    ? '/word.svg'
                    : isExcel
                      ? '/excel.svg'
                      : '/file.svg'

                return (
                  <li key={idx} className={classes.fileItem}>
                    <Image
                      src={icon}
                      alt={ext}
                      width={24}
                      height={24}
                      className={classes.fileIcon}
                    />
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.fileLink}
                    >
                      {file.name || `${fileName} ${idx + 1}`}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      <h1 className={classes.ideasDetailPage__others__title}>{otherIdeas}</h1>
      <div className={classes.ideasDetailPage__others}>
        {isLoading && <p>Загрузка...</p>}
        {ideas
          .filter(idea => idea.id !== id)
          .map((idea, index) => (
            <IdeaCard
              slug={idea.slug || ''}
              uniqueId={idea.id}
              key={idea.id ?? index}
              date={idea.created_at || ''}
              likes={idea.likes_count || 0}
              link={idea.link || ''}
              subtitle={idea.description_md || ''}
              title={idea.title || ''}
              userName={idea.author_id}
              imageUrl={getImageUrlFromMedia(idea.media)}
              status={idea.status || 'DRAFT'}
            />
          ))}
      </div>

      {/* 💬 Комментарии */}
      <div className={classes.ideasInfo__comments}>
        <h1>{commentsTitle}</h1>

        <div className={classes.ideasInfo__comments__inputWrapper}>
          <input
            className={classes.ideasInfo__comments__input}
            type="text"
            placeholder={input}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <button
            className={classes.ideasInfo__comments__button}
            onClick={handleAddComment}
            disabled={isAdding}
          >
            {isAdding ? sending : send}
          </button>
        </div>

        <hr />

        {structuredComments.length ? (
          structuredComments.map(comment => (
            <IdeaCommentCard sendingTxt={sending} sendTxt={send} inputTxt={inputTxt} title={reply} key={comment.id} com={comment} ideaId={id} />
          ))
        ) : (
          <div style={{ margin: '0 auto' }}>{noComments}</div>
        )}
      </div>
    </section>
  )
}
