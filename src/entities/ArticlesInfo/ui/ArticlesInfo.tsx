/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import { ArticlesInfoProps } from '../types/type'
import classes from './ArticlesInfo.module.scss'
import {
  useCreateCommentMutation,
  useGetArticlesQuery,
  useGetCommentsQuery,
} from '@/widgets/Articles/api/articlesApi'
import Link from 'next/link'
import { ArticlesCard } from '@/entities/ArticlesCard'
import { useDetailPageLocale } from '@/i18n/useNativeLocale'
import { getImageIdea } from '@/entities/IdeasDetailPage/getImageIdea'
import { Key, useState } from 'react'
import { ArticleCommentCard } from '@/features/CommentCard/ui/ArticleCommentCard'

export function ArticlesInfo({
  all,
  title,
  desc,
  timeCreate,
}: ArticlesInfoProps) {
  const { data: articles = [], isLoading } = useGetArticlesQuery({ limit: 7 })
  const commentsQuery = useGetCommentsQuery(all.id)
  const { otherArticles, titleArticle, subtitleArticle, share, commentsTitle } =
    useDetailPageLocale()
  const [createComment] = useCreateCommentMutation()

  const [comment, setComment] = useState('')

  const images = Array.isArray(all.attachments)
    ? all.attachments.filter((file: { mime: string }) =>
        file.mime?.startsWith('image/')
      )
    : []

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
          text: 'Смотри статью на сайте!',
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
    if (!comment.trim()) return
    try {
      await createComment({ articleId: all.id, body_md: comment }).unwrap()
      setComment('')
    } catch (err) {
      console.error('Ошибка при добавлении комментария:', err)
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

  const structuredComments = commentsQuery.data ? buildTree(commentsQuery.data) : []

  return (
    <section className={classes.articlesInfo}>
      <div className={classes.articlesInfo__upper}>
        <h1>{titleArticle}</h1>
        <p>{subtitleArticle}</p>
      </div>

      <div className={classes.articlesInfo__content}>
        <div className={classes.articlesInfo__content__upWrapper}>
          <span>
            {formatDate()}
            <Image
              className={classes.calendarImg}
              src="/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
            />
          </span>
          <button
            className={classes.articlesInfo__content__upWrapper__share}
            onClick={handleShare}
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

        <h1 className={classes.articlesInfo__content__title}>{title}</h1>

        <div
          className={classes.articlesInfo__content__imageWrapper}
          style={images.length > 0 ? { gap: '0' } : { gap: '32px' }}
        >
          {images.length > 0 ? (
            <Image
              className={classes.articlesInfo__content__imageWrapper__image}
              src={getImageIdea(all.id, images[0].file_key) || '/grey.jpg'}
              alt="image"
              width={815}
              height={512}
            />
          ) : (
            <Image
              className={classes.articlesInfo__content__imageWrapper__image}
              src="/grey.jpg"
              alt="placeholder"
              width={815}
              height={512}
            />
          )}

          <div className={classes.articlesInfo__content__imageWrapper__others}>
            {images
              .slice(1)
              .map(
                (
                  img: { file_key: string | undefined },
                  idx: Key | null | undefined
                ) => (
                  <Image
                    key={idx}
                    className={
                      classes.articlesInfo__content__imageWrapper__others__image
                    }
                    src={getImageIdea(all.id, img.file_key) || '/grey.jpg'}
                    alt={`other-image-${idx}`}
                    width={168}
                    height={106}
                  />
                )
              )}
          </div>
        </div>

        <p className={classes.articlesInfo__content__desc}>{desc}</p>
      </div>

      <h1 className={classes.articlesInfo__others__title}>{otherArticles}</h1>
      <div className={classes.articlesInfo__others}>
        {isLoading && <p>Загрузка...</p>}
        {articles
          .filter(article => article.id !== all.id)
          .map(article => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className={classes.articles__container__content__track__item}
            >
              <ArticlesCard
                info={true}
                comments={article.comments_count || '0'}
                views={article.views_count || '0'}
                color="#000"
                key={article.id}
                article={article.summary || 'Нет описания'}
                articleName={article.title || 'Без названия'}
                userName={article.author_id ?? 'Неизвестный'}
              />
            </Link>
          ))}
      </div>

      {/* Комментарии */}
      <div className={classes.articlesInfo__comments}>
        <h1>{commentsTitle}</h1>

        <div className={classes.articlesInfo__comments__inputWrapper}>
          <input
            value={comment}
            onChange={e => setComment(e.target.value)}
            className={classes.articlesInfo__comments__input}
            type="text"
            placeholder="Оставить комментарий"
          />
          <button
            onClick={handleAddComment}
            className={classes.articlesInfo__comments__button}
          >
            Отправить
          </button>
        </div>

        <hr />

        {structuredComments.length > 0 ? (
          structuredComments.map(comment => (
            <ArticleCommentCard key={comment.id} com={comment} articleId={all.id} />
          ))
        ) : (
          <div style={{ textAlign: 'center' }}>Ничего нету</div>
        )}
      </div>
    </section>
  )
}
