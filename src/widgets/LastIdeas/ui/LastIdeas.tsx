/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { IdeaCard } from '@/entities/IdeaCard'
import classes from './LastIdeas.module.scss'
import { LastIdeasProps } from '../types/type'
import { useState, useEffect, useMemo } from 'react'
import { useGetIdeasQuery, useGetTotalCountQuery } from '../api/IdeasApi'
import { getImageUrlFromMedia } from '@/shared/hooks/getImageUrlFromMedia'
import Image from 'next/image'
import {
  useCrowdfundingData,
  useInputSearchLocale,
  useNothingDefined,
} from '@/i18n/useNativeLocale'
import { AddArticleOrIdea } from '@/entities/AddArticleOrIdea/ui/AddArticleOrIdea'

export function LastIdeas({
  title,
  subtitle,
  viewCards = 6,
  selected,
  showSelectButton = false,
  showAddButton = false,
}: LastIdeasProps) {
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const limit = viewCards
  const offset = (page - 1) * limit

  const data = useCrowdfundingData()

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput)
      setPage(1)
    }, 500)
    return () => clearTimeout(handler)
  }, [searchInput])

  const {
    data: ideas = [],
    isLoading,
    error,
  } = useGetIdeasQuery({
    limit,
    offset,
    search: debouncedSearch,
  })

  const { data: totalCount = 0 } = useGetTotalCountQuery()
  const totalPages = Math.max(1, Math.ceil(totalCount / limit))
  const l = useInputSearchLocale()
  const not = useNothingDefined()

  // visible pages with ellipsis (compact window)
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

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages])

  const goPrev = () => setPage(p => Math.max(1, p - 1))
  const goNext = () => setPage(p => Math.min(totalPages, p + 1))

  return (
    <section className={classes.lastIdeas}>
      <div className={classes.headerRow}>
        <div>
          <h1 className={classes.lastIdeas__title}>{title}</h1>
          <p
            className={classes.lastIdeas__subtitle}
            style={showSelectButton ? { color: 'black' } : { color: '#7A8894' }}
          >
            {subtitle}
          </p>
          <div className={classes.searchWrap}>
            <input
              type="text"
              className={classes.sorting__input}
              placeholder={l}
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              aria-label="Поиск идей"
            />
          </div>
        </div>

        <div className={classes.headerControls}>
          <AddArticleOrIdea show={showAddButton} isArticle={false} />
        </div>
      </div>

      {showSelectButton && <p className={classes.lastIdeas__description}>{data.label}</p>}

      {isLoading ? (
        <p className={classes.centerText}>Загрузка...</p>
      ) : error ? (
        <div className={classes.centerEmpty}>
          <Image className={classes.nothing} src="/nothing.svg" alt="404" width={400} height={280} />
          <p className={classes.centerText}>{not}</p>
        </div>
      ) : ideas.length === 0 ? (
        <div className={classes.centerEmpty}>
          <Image className={classes.nothing} src="/nothing.svg" alt="404" width={400} height={280} />
          <p className={classes.centerText}>{not}</p>
        </div>
      ) : (
        <div className={classes.lastIdeas__ideas}>
          {ideas.map((idea, index) => (
            <IdeaCard
              key={idea.id ?? index}
              slug={idea.slug || ''}
              uniqueId={idea.id}
              date={idea.created_at || ''}
              likes={idea.likes_count || 0}
              link={idea.link || ''}
              subtitle={idea.description_md || ''}
              title={idea.title || ''}
              userName={idea.author_id}
              imageUrl={getImageUrlFromMedia(idea.media)}
              onSelect={showSelectButton && selected ? () => selected(idea) : undefined}
              status={idea.status || 'DRAFT'}
            />
          ))}
        </div>
      )}

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
