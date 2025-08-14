import { ArticlesCard } from '@/entities/ArticlesCard'
import classes from './Articles.module.scss'
import image from '../assets/Image-1.png'

export function Articles() {
  return (
    <section className={classes.articles}>
      <div className={classes.articles__wrapper}>
        <div className={classes.articles__container}>
          <h1 className={classes.articles__container__title}>Урбан - статьи</h1>
          <p className={classes.articles__container__subtitle}>
            Ознакомьтесь с последними новостями
          </p>
          <div className={classes.articles__container__content}>
            <ArticlesCard
              article="Your expectations will fly sky high. I felt like I was soaring."
              articleName="Название статьи"
              role="Публицист"
              userName="Wanda Wingleton"
              avatarUrl={''}
            />
            <ArticlesCard
              article="Your expectations will fly sky high. I felt like I was soaring."
              articleName="Название статьи"
              role="Публицист"
              userName="Wanda Wingleton"
              avatarUrl={image.src}
            />
            <ArticlesCard
              article="Your expectations will fly sky high. I felt like I was soaring."
              articleName="Название статьи"
              role="Публицист"
              userName="Wanda Wingleton"
              avatarUrl={''}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
