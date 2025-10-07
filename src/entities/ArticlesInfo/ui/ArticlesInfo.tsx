import Image from 'next/image'
import { ArticlesInfoProps } from '../types/type'
import classes from './ArticlesInfo.module.scss'
import { useGetArticlesQuery } from '@/widgets/Articles/api/articlesApi'
import Link from 'next/link'
import { ArticlesCard } from '@/entities/ArticlesCard'
import { useDetailPageLocale } from '@/i18n/useNativeLocale'
import { getImageIdea } from '@/entities/IdeasDetailPage/getImageIdea'
import { Key } from 'react'

export function ArticlesInfo({
  all,
  title,
  desc,
  timeCreate,
}: ArticlesInfoProps) {
  const { data: articles = [], isLoading } = useGetArticlesQuery({ limit: 7 })
  const { otherArticles, titleArticle, subtitleArticle, share } =
    useDetailPageLocale()

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
        // если браузер поддерживает Web Share API
        await navigator.share({
          title: document.title,
          text: 'Смотри идею на сайте!',
          url,
        })
      } else {
        // fallback: просто копируем ссылку в буфер обмена
        await navigator.clipboard.writeText(url)
        // можно добавить свой кастомный тост: "Ссылка скопирована"
      }
    } catch (err) {
      console.error('Ошибка при шаринге:', err)
    }
  }

  return (
    <section className={classes.articlesInfo}>
      <div className={classes.articlesInfo__upper}>
        <h1>{titleArticle}</h1>
        <p>{subtitleArticle}</p>
      </div>
      <div className={classes.articlesInfo__content}>
        <div className={classes.articlesInfo__content__upWrapper}>
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
          style={images.length > 0 ? { gap: '0' } : { gap: '32' }}
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
          .filter(article => article.id !== all.id) // исключаем текущую статью
          .map(article => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className={classes.articles__container__content__track__item}
            >
              <ArticlesCard
                color="#000"
                key={article.id}
                article={article.summary || 'Нет описания'}
                articleName={article.title || 'Без названия'}
                userName={article.author_id ?? 'Неизвестный'}
              />
            </Link>
          ))}
      </div>
    </section>
  )
}
