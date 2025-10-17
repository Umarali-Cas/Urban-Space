'use client'

import { ArticlesCard } from '@/entities/ArticlesCard'
import classes from './Articles.module.scss'
import { useGetArticlesQuery } from '@/widgets/Articles/api/articlesApi'
import Link from 'next/link'

export function Articles({ title, desc }: { title: string; desc: string }) {
  const { data: articles = [], isLoading } = useGetArticlesQuery({ limit: 6 })

  // формируем карточки из статей
  const cards = articles.map(article => (
    <Link
      key={article.id}
      href={`/articles/${article.slug}`}
      className={classes.articles__container__content__track__item}
    >
      <ArticlesCard
        info={false}
        comments={article.comments_count || '0'}
        views={article.views_count || '0'}
        color={'#ffffff'}
        key={article.id}
        article={article.summary ?? ''}
        articleName={article.title ?? ''}
        userName={article.author_id ?? ''}
        timeDate={article.created_at ?? ''}
      />
    </Link>
  ))

  // дублируем для бесконечного скролла
  const duplicatedCards = [...cards, ...cards, ...cards, ...cards]

  if (isLoading)
    return <p style={{ textAlign: 'center', color: 'gray' }}>Загрузка...</p>

  return (
    <section className={classes.articles}>
      <div className={classes.articles__wrapper}>
        <div className={classes.articles__container}>
          <div className={classes.articles__container__titleWrapper}>
            <h1 className={classes.articles__container__title}>{title}</h1>
            <p className={classes.articles__container__subtitle}>{desc}</p>
          </div>
          <div className={classes.articles__container__content}>
            <div className={classes.articles__container__content__track}>
              {duplicatedCards.map((card, index) => (
                <div
                  key={`${index}-${card.key}`}
                  className={classes.articles__container__content__track__item}
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
