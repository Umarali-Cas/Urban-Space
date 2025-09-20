import Image from 'next/image'
import { ArticlesInfoProps } from '../types/type'
import classes from './ArticlesInfo.module.scss'
import { useGetArticlesQuery } from '@/widgets/Articles/api/articlesApi'
import Link from 'next/link'
import { ArticlesCard } from '@/entities/ArticlesCard'

export function ArticlesInfo({ title, desc }: ArticlesInfoProps) {
  const { data: articles = [], isLoading } = useGetArticlesQuery({ limit: 6 })

  return (
    <section className={classes.articlesInfo}>
      <div className={classes.articlesInfo__upper}>
        <h1>Урбан-статьи</h1>
        <p>Ознакомьтесь с последними новостями</p>
      </div>
      <div className={classes.articlesInfo__content}>
        <div className={classes.articlesInfo__content__upWrapper}>
          <span>20 января</span>
          <a href="#">Поделится</a>
        </div>
        <h1 className={classes.articlesInfo__content__title}>{title}</h1>
        <div className={classes.articlesInfo__content__imageWrapper}>
          <Image
            className={classes.articlesInfo__content__imageWrapper__image}
            src="/grey.jpg"
            alt="image"
            width={815}
            height={512}
          />
          <div className={classes.articlesInfo__content__imageWrapper__others}>
            <Image
              className={
                classes.articlesInfo__content__imageWrapper__others__image
              }
              src="/grey.jpg"
              alt="image"
              width={168}
              height={106}
            />
            <Image
              className={
                classes.articlesInfo__content__imageWrapper__others__image
              }
              src="/grey.jpg"
              alt="image"
              width={168}
              height={106}
            />
            <Image
              className={
                classes.articlesInfo__content__imageWrapper__others__image
              }
              src="/grey.jpg"
              alt="image"
              width={168}
              height={106}
            />
            <Image
              className={
                classes.articlesInfo__content__imageWrapper__others__image
              }
              src="/grey.jpg"
              alt="image"
              width={168}
              height={106}
            />
          </div>
        </div>
        <p className={classes.articlesInfo__content__desc}>{desc}</p>
      </div>
      <h1 className={classes.articlesInfo__others__title}>Другие статьи</h1>
      <div className={classes.articlesInfo__others}>
        {isLoading && <p>Загрузка...</p>}
        {articles.map(article => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className={classes.articles__container__content__track__item}
          >
            <ArticlesCard
              color="#000"
              key={article.id}
              article={article.summary || 'Нет описания'}
              articleName={article.title || 'Без названия'}
              role={article.tags ?? 'Автор'}
              userName={article.slug ?? 'Неизвестный'}
              avatarUrl={article.attachments?.[0]?.url ?? ''}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
