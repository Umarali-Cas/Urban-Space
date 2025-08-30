import { ArticlesCard } from '@/entities/ArticlesCard'
import classes from './ArticlesPage.module.scss'

const cards = [
  <ArticlesCard
    key="1"
    article="Your expectations will fly sky high. I felt like I was soaring."
    articleName="Название статьи"
    role="Публицист"
    userName="Wanda Wingleton"
    avatarUrl={''}
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
  <ArticlesCard
    key="4"
    article="Your expectations will fly sky high. I felt like I was soaring."
    articleName="Название статьи"
    role="Публицист"
    userName="Wanda Wingleton"
    avatarUrl={''}
  />,
  <ArticlesCard
    key="5"
    article="Your expectations will fly sky high. I felt like I was soaring."
    articleName="Название статьи"
    role="Публицист"
    userName="Wanda Wingleton"
    avatarUrl={''}
  />,
  <ArticlesCard
    key="6"
    article="Your expectations will fly sky high. I felt like I was soaring."
    articleName="Название статьи"
    role="Публицист"
    userName="Wanda Wingleton"
    avatarUrl={''}
  />,
]

export default function ArticlesPage() {
  return (
    <section className={classes.articlesPage}>
      <h1 className={classes.articlesPage__title}>Урбан-статьи</h1>
      <p className={classes.articlesPage__description}>Ознакомьтесь с последними статьями</p>
      <div className={classes.articlesPage__cardsContainer}>{cards}</div>
    </section>
  )
}
