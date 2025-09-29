/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import classes from './ArticlesPage.module.scss'
import { ArticlesCard } from '@/entities/ArticlesCard'
import {
  useGetArticlesQuery,
  useGetTotalCountQuery,
} from '@/widgets/Articles/api/articlesApi'
import Link from 'next/link'
import Image from 'next/image'
import {
  useInputSearchLocale,
  useNothingDefined,
} from '@/i18n/useNativeLocale'
import { AddArticleOrIdea } from '@/entities/AddArticleOrIdea/ui/AddArticleOrIdea'

export default function ArticlesWrapp({
  title,
  desc,
}: {
  title: string
  desc: string
}) {
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const limit = 6
  const offset = (page - 1) * limit

  // debounce для поиска
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput)
      setPage(1)
    }, 500)
    return () => clearTimeout(handler)
  }, [searchInput])


  const {
    data: articles = [],
    isLoading,
    error,
  } = useGetArticlesQuery({
    limit,
    offset,
    search: debouncedSearch,
  })

  const { data: totalCountData } = useGetTotalCountQuery()

  const CardsBox = () => {
    if (articles.length === 0) {
      return (
        <div className={classes.noArticles}>
          <Image src="/nothing.svg" alt="404" width={600} height={400} />
          <p>{useNothingDefined()}</p>
        </div>
      )
    }
    return (
      <>
        {articles.map((article: any) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className={classes.articlesPage__cardsContainer__item}
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
      <h1 className={classes.articlesPage__title}>{title}</h1>
      <p className={classes.articlesPage__description}>{desc}</p>
      <AddArticleOrIdea show={true} isArticle={true} />

      {/* Сортировка */}
      <div className={classes.sorting}>
        <input
          type="text"
          className={classes.sorting__input}
          placeholder={useInputSearchLocale()}
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>

      <div
        style={
          articles.length !== 0
            ? { justifyContent: 'space-between' }
            : { justifyContent: 'center' }
        }
        className={classes.articlesPage__cardsContainer}
      >
        {isLoading ? (
          <p
            style={{ textAlign: 'center', color: 'gray' }}
            className={classes.loading}
          >
            Загрузка...
          </p>
        ) : error ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              marginTop: '20px',
            }}
            className={classes.noArticles}
          >
            <Image
              className="global-image-nothing"
              src="/nothing.svg"
              alt="404"
              width={600}
              height={400}
            />
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              {useNothingDefined()}
            </p>
          </div>
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
            className={`${classes.pagination__button} ${page === p ? classes.active : ''}`}
          >
            {p}
          </button>
        ))}
      </div>
    </section>
  )
}
