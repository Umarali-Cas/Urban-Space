import { NewsCard } from '@/entities/NewsCard'
import classes from './News.module.scss'
import image from '../assets/images/Image-1.png'

export function News({title, desc} : {title: string, desc: string}) {
  return (
    <section className={classes.news}>
      <h1 className={classes.news__title}>{title}</h1>
      <p className={classes.news__subtitle}>
        {desc}
      </p>
      <div className={classes.news__box}>
        <NewsCard
          title="Форум «Умный город 2025»"
          subtitle="Обсуждение современных технологий в городском планировании и их внедрение"
          date="10.06.2025"
          link="#"
          imageUrl={image.src}
        />
        <NewsCard
          title="Форум «Умный город 2025»"
          subtitle="Обсуждение современных технологий в городском планировании и их внедрение"
          date="10.06.2025"
          link="#"
          imageUrl={image.src}
        />
      </div>
    </section>
  )
}
