/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { ArticlesCard } from '@/entities/ArticlesCard'
import classes from './ArticlesPage.module.scss'
import { useGetArticlesQuery } from '@/widgets/Articles/api/articlesApi'

export default function ArticlesPage() {
  const { data: articles = [], isLoading, error } = useGetArticlesQuery()

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
          <div
            key={article.id}
            className={classes.articles__container__content__track__item}
          >
            <ArticlesCard
              article={article.summary}
              articleName={article.title}
              role={article.tags ?? 'Автор'}
              userName={article.slug ?? 'Неизвестный'}
              avatarUrl={article.attachments ?? ''}
            />
          </div>
        ))}
      </>
    )
  }

  console.log(articles)

  // if (isLoading) return <p>Загрузка...</p>
  // if (error) return <p>Ошибка загрузки статей</p>

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
    </section>
  )
}
