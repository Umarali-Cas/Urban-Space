'use client'

import { IdeaCard } from '@/entities/IdeaCard'
import classes from './LastIdeas.module.scss'
import { LastIdeasProps } from '../types/type'
import { useState } from 'react'
import { useGetIdeasQuery } from '../api/IdeasApi'

export function LastIdeas({ title, subtitle, viewCards = 6 }: LastIdeasProps) {
  const [offset, setOffset] = useState(0)
  const limit = viewCards

  const {
    data: ideas = [],
    isLoading,
    error,
  } = useGetIdeasQuery({
    limit,
    offset,
  })

  const handleLoadMore = () => {
    setOffset(prev => prev + limit)
  }

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
            <IdeaCard key={idea.id ?? index} {...idea} />
          ))
        )}
      </div>

      {ideas.length === limit && (
        <button className={classes.lastIdeas__button} onClick={handleLoadMore}>
          Показать еще
        </button>
      )}
    </section>
  )
}
