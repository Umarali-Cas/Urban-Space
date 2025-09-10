/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import classes from './ArticlesPage.module.scss'
import { ArticlesCard } from '@/entities/ArticlesCard'
import {
  useGetArticlesQuery,
  useGetTotalCountQuery,
} from '@/widgets/Articles/api/articlesApi'
import Link from 'next/link'
import { DropDown } from '@/features/DropDown'

export default function ArticlesPage() {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<'new' | 'popular' | 'active'>('new')

  const limit = 6
  const offset = (page - 1) * limit
  const [search, setSearch] = useState('')

  const {
    data: articles = [],
    isLoading,
    error,
  } = useGetArticlesQuery({
    limit,
    offset,
    sort_by: sortBy,
    search,
  })

  const { data: totalCountData } = useGetTotalCountQuery()

  const CardsBox = () => {
    if (articles.length === 0) {
      return <p className={classes.noArticles}>На данный момент нет статей</p>
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
              color={'#000000'}
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

      {/* Сортировка */}
      <div className={classes.sorting}>
        <input
          type="text"
          className={classes.sorting__input}
          placeholder="Поиск статей..."
          value={search}
          onChange={e => {
            setPage(1) // сбрасываем на первую страницу
            setSearch(e.target.value)
          }}
        />
        <DropDown
          arr={['Новые', 'Популярные', 'Активные']}
          onSelect={val => {
            setPage(1) // сбрасываем на первую страницу
            setSortBy(val as 'new' | 'popular' | 'active')
          }}
          className={classes.sorting__dropdown}
        />
      </div>

      <div className={classes.articlesPage__cardsContainer}>
        {isLoading ? (
          <p className={classes.loading}>Загрузка...</p>
        ) : error ? (
          <p className={classes.error}>Статей нет</p>
        ) : (
          <CardsBox />
        )}
      </div>

      {/* Пагинация */}
      <div className={classes.pagination}>
        {Array.from(
          { length: Math.ceil((totalCountData ?? 0) / limit) },
          (_, i) => i + 1
        ).map(p => (
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
