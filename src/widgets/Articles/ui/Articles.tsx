import { ArticlesCard } from '@/entities/ArticlesCard'
import classes from './Articles.module.scss'
import image from '../assets/Image-1.png'

export function Articles() {
  const cards = [
    <ArticlesCard
      key="1"
      article="Your expectations will fly sky high. I felt like I was soaring."
      articleName="Название статьи"
      role="Публицист"
      userName="Wanda Wingleton"
      avatarUrl={image.src}
    />,
    <ArticlesCard
      key="2"
      article="Your expectations will fly sky high. I felt like I was soaring."
      articleName="Название статьи"
      role="Публицист"
      userName="Wanda Wingleton"
      avatarUrl={''}
    />,
    <ArticlesCard
      key="3"
      article="Your expectations will fly sky high. I felt like I was soaring."
      articleName="Название статьи"
      role="Публицист"
      userName="Wanda Wingleton"
      avatarUrl={''}
    />,
  ]

  

  const duplicatedCards = [...cards, ...cards, ...cards, ...cards]

  // В будущем можно будет заменить на логику получения данных из API

  return (
    <section className={classes.articles}>
      <div className={classes.articles__wrapper}>
        <div className={classes.articles__container}>
          <div className={classes.articles__container__titleWrapper}>

          <h1 className={classes.articles__container__title}>Урбан - статьи</h1>
          <p className={classes.articles__container__subtitle}>
            Ознакомьтесь с последними новостями
          </p>
          </div>
          <div className={classes.articles__container__content}>
            <div className={classes.articles__container__content__track}>
              {duplicatedCards.map((card, index) => (
                <div key={`${index}-${card.key}`} className={classes.articles__container__content__track__item}>
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