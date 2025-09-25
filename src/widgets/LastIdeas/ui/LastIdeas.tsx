/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { IdeaCard } from '@/entities/IdeaCard'
import classes from './LastIdeas.module.scss'
import { LastIdeasProps } from '../types/type'
import { useState, useEffect } from 'react'
import { useGetIdeasQuery, useGetTotalCountQuery } from '../api/IdeasApi'
import Image from 'next/image'
import { DropDown } from '@/features/DropDown'
import {
  useCrowdfundingData,
  useDropDownSearchs,
  useInputSearchLocale,
  useNothingDefined,
} from '@/i18n/useNativeLocale'

export function LastIdeas({
  title,
  subtitle,
  viewCards = 6,
  selected,
  showSelectButton = false,
}: LastIdeasProps) {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<'new' | 'popular' | 'active'>('new')
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const limit = viewCards
  const offset = (page - 1) * limit

  const data = useCrowdfundingData()

  // debounce для поиска
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput)
      setPage(1) // сбрасываем на первую страницу
    }, 500)
    return () => clearTimeout(handler)
  }, [searchInput])

  const sortOptions = useDropDownSearchs()

  const {
    data: ideas = [],
    isLoading,
    error,
  } = useGetIdeasQuery({
    limit,
    offset,
    sort_by: sortBy,
    search: debouncedSearch,
  })

  const { data: totalCount } = useGetTotalCountQuery()
  const totalPages = totalCount ? Math.ceil(totalCount / limit) : 0

  return (
    <section className={classes.lastIdeas}>
      <h1 className={classes.lastIdeas__title}>{title}</h1>
      <p
        style={showSelectButton ? { color: 'black' } : { color: '#7A8894' }}
        className={classes.lastIdeas__subtitle}
      >
        {subtitle}
      </p>

      {showSelectButton && (
        <p className={classes.lastIdeas__description}>{data.label}</p>
      )}

      <div className={classes.sorting}>
        <input
          type="text"
          className={classes.sorting__input}
          placeholder={useInputSearchLocale()}
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <DropDown
          arr={sortOptions as unknown as string[]}
          onSelect={val => {
            setPage(1)
            setSortBy(val as 'new' | 'popular' | 'active')
          }}
          className={classes.sorting__dropdown}
        />
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center', color: 'gray' }}>Загрузка...</p>
      ) : error ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginTop: '20px',
          }}
          className={classes.noIdeas}
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
      ) : ideas.length === 0 ? (
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
          {useNothingDefined()}
        </p>
      ) : (
        <div className={classes.lastIdeas__ideas}>
          {ideas.map((idea, index) => (
            <IdeaCard
              slug={idea.slug || ''}
              uniqueId={idea.id}
              key={idea.id ?? index}
              date={idea.created_at || ''}
              likes={idea.likes_count || 0}
              link={idea.link || ''}
              subtitle={idea.description_md || ''}
              title={idea.title || ''}
              userName={idea.author_name}
              avatarUrl={idea.author_avatar}
              imageUrl={idea.media?.[0]?.meta?.url}
              onSelect={
                showSelectButton && selected ? () => selected(idea) : undefined
              } // передаём выбранную идею наверх
              status={idea.status || 'DRAFT'}
            />
          ))}
        </div>
      )}

      {/* Пагинация */}
      <div className={classes.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`${classes.pageButton} ${page === num ? classes.active : ''}`}
          >
            {num}
          </button>
        ))}
      </div>
    </section>
  )
}
