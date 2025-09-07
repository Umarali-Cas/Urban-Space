/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { ArticlesCard } from '@/entities/ArticlesCard'
import classes from './ArticlesPage.module.scss'
import { useGetArticlesQuery, useGetTotalCountQuery } from '@/widgets/Articles/api/articlesApi'
import { useState } from 'react'
import Link from 'next/link'

export default function ArticlesPage() {
  const [page, setPage] = useState(1)
  const limit = 6 // сколько карточек на страницу
  const offset = (page - 1) * limit

  const {
    data: articles = [],
    isLoading,
    error,
  } = useGetArticlesQuery({
    limit,
    offset,
  })

  const { data: totalCountData } = useGetTotalCountQuery()

  const CardsBox = () => {
    if (articles.length === 0) {
      return (
        <p
          style={{
            textAlign: 'center',
            color: 'gray',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textWrap: 'nowrap',
          }}
        >
          На данный момент нет статей
        </p>
      )
    }
    return (
      <>
{articles.map((article: any) => (
  <Link
    key={article.id}
    href={`/articles/${article.slug}`}
    className={classes.articles__container__content__track__item}
  >
    <ArticlesCard
      articleName={article.title}
      article={article.summary}
      role={article.tags ?? 'Автор'}
      userName={article.slug ?? 'Неизвестный'}
      avatarUrl={article.attachments ?? ''}
    />
  </Link>
))}
      </>
    )
  }

  return (
    <section className={classes.articlesPage}>
      <h1 className={classes.articlesPage__title}>Урбан-статьи</h1>
      <p className={classes.articlesPage__description}>
        Ознакомьтесь с последними статьями
      </p>
      <div className={classes.articlesPage__cardsContainer}>
        {isLoading || error ? (
          <p
            style={{
              textAlign: 'center',
              color: 'gray',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textWrap: 'nowrap',
            }}
          >
            Загрузка...
          </p>
        ) : (
          <CardsBox />
        )}
      </div>

      {/* Пагинация */}
      <div className={classes.pagination}>
        {Array.from({ length: totalCountData ?? 0 }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`${classes.pagination__button} ${
              page === p ? classes.active : ''
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </section>
  )
}
