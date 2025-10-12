/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useMemo } from 'react'
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
  const nothing = useNothingDefined()
  const inputPlaceholder = useInputSearchLocale()

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

  const { data: totalCountData = 0 } = useGetTotalCountQuery()
  const totalPages = Math.max(1, Math.ceil(totalCountData / limit))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages])

  // visible pages with ellipsis (compact)
  const visiblePages = useMemo(() => {
    const total = totalPages
    const current = page
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

    const pages: (number | '...')[] = []
    const left = Math.max(2, current - 1)
    const right = Math.min(total - 1, current + 1)

    pages.push(1)
    if (left > 2) pages.push('...')
    for (let i = left; i <= right; i++) pages.push(i)
    if (right < total - 1) pages.push('...')
    pages.push(total)

    return pages
  }, [totalPages, page])

  const goPrev = () => setPage(p => Math.max(1, p - 1))
  const goNext = () => setPage(p => Math.min(totalPages, p + 1))

  const CardsBox = () => {
    if (articles.length === 0) {
      return (
        <div className={classes.noArticles}>
          <Image className='global-image-nothing' src="/nothing.svg" alt="404" width={600} height={400} />
          <p style={{ textAlign: 'center', marginTop: '20px' }}>{nothing}</p>
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
              article={article.body_html}
              userName={article.author_id ?? 'Неизвестный'}
            />
          </Link>
        ))}
      </>
    )
  }

  return (
    <section className={classes.articlesPage}>
      <div className={classes.headerRow}>
        <div>
          <h1 className={classes.articlesPage__title}>{title}</h1>
          <p className={classes.articlesPage__description}>{desc}</p>
          <div className={classes.searchWrap}>
            <input
              type="text"
              className={classes.sorting__input}
              placeholder={inputPlaceholder}
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.headerControls}>

          <AddArticleOrIdea show={true} isArticle={true} />
        </div>
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
            <p className={classes.noArticles__text} style={{ textAlign: 'center', marginTop: '20px' }}>
              {nothing}
            </p>
          </div>
        ) : (
          <CardsBox />
        )}
      </div>

      {/* Pagination */}
      <nav className={classes.pagination} aria-label="Pagination">
        <button
          className={classes.iconButton}
          onClick={() => setPage(1)}
          disabled={page === 1}
          aria-label="Первая страница"
        >
          ⏮
        </button>

        <button
          className={classes.iconButton}
          onClick={goPrev}
          disabled={page === 1}
          aria-label="Предыдущая страница"
        >
          ‹
        </button>

        <div className={classes.pagesList}>
          {visiblePages.map((p, i) =>
            p === '...' ? (
              <span key={i} className={classes.ellipsis}>
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(Number(p))}
                className={`${classes.pageButton} ${page === p ? classes.active : ''}`}
                aria-current={page === p ? 'page' : undefined}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          className={classes.iconButton}
          onClick={goNext}
          disabled={page === totalPages}
          aria-label="Следующая страница"
        >
          ›
        </button>

        <button
          className={classes.iconButton}
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          aria-label="Последняя страница"
        >
          ⏭
        </button>
      </nav>
    </section>
  )
}
