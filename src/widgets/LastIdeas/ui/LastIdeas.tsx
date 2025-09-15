/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { IdeaCard } from '@/entities/IdeaCard'
import classes from './LastIdeas.module.scss'
import { LastIdeasProps } from '../types/type'
import { useEffect, useState } from 'react'
import { useGetIdeasQuery, useGetTotalCountQuery } from '../api/IdeasApi'
import Image from 'next/image'

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
  const [data, setData] = useState<any>(null)
  const [warr, setWarr] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api.urbanspace.sdinis.org/ideas/')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => setWarr(err.message))
      .finally(() => console.log('finally'))
  }, [])

  const totalPages = totalCount ? Math.ceil(totalCount / limit) : 0
  // const totalPages = 5;

  return (
    <section className={classes.lastIdeas}>
      <hr />
      {error && <p>Ошибка: {warr}</p>}
      {data ? <p>{JSON.stringify(data, null, 2)}</p> : <p>Загрузка...</p>}
      <hr />
      <h1 className={classes.lastIdeas__title}>{title}</h1>
      <p className={classes.lastIdeas__subtitle}>{subtitle}</p>

      {isLoading && (
        <p style={{ textAlign: 'center', color: 'gray' }}>Загрузка...</p>
      )}
      {error && (
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
            Идей не найдено
          </p>
        </div>
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
