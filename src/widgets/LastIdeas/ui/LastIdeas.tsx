'use client'

import { IdeaCard } from '@/entities/IdeaCard'
import classes from './LastIdeas.module.scss'
import { LastIdeasProps } from '../types/type'
import { useState } from 'react'
import { useGetIdeasQuery, useGetTotalCountQuery } from '../api/IdeasApi'

export function LastIdeas({ title, subtitle, viewCards = 6 }: LastIdeasProps) {
  const [page, setPage] = useState(1)
  const limit = viewCards
  const offset = (page - 1) * limit

  const {
    data: ideas = [],
    isLoading,
    error,
  } = useGetIdeasQuery({
    limit,
    offset,
  })

  const { data: totalCount } = useGetTotalCountQuery()

  console.log(ideas.map(idea => idea.id))
  console.log(totalCount)

  const totalPages = totalCount ? Math.ceil(totalCount / limit) : 0
  // const totalPages = 5;

  return (
    <section className={classes.lastIdeas}>
      <h1 className={classes.lastIdeas__title}>{title}</h1>
      <p className={classes.lastIdeas__subtitle}>{subtitle}</p>

      {isLoading && (
        <p style={{ textAlign: 'center', color: 'gray' }}>Загрузка...</p>
      )}
      {error && (
        <p style={{ textAlign: 'center', color: 'gray' }}>Ошибка загрузки</p>
      )}

      <div className={classes.lastIdeas__ideas}>
        {ideas.length === 0 && !isLoading && !error ? (
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
            Нет идей
          </p>
        ) : (
          ideas.map((idea, index) => (
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
            />
          ))
        )}
      </div>

      {/* 🔢 Пагинация */}
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
