'use client'

import { IdeaCard } from '@/entities/IdeaCard'
import classes from './LastIdeas.module.scss'
import { LastIdeasProps } from '../types/type'
import testImage from '../assets/images/testDog.png'
import { useState } from 'react'

const ideas = [
  {
    title: 'Велосипедные дорожки в центре города',
    subtitle:
      'Создание безопасной сети велосипедных дорожек для улучшения экологии и мобильности',
    userName: 'Анна Петрова',
    date: '24.01.2025',
    likes: 10,
    link: '#',
    imageUrl: testImage,
    avatarUrl: '',
  },
  {
    title: 'Зеленые зоны для отдыха',
    subtitle: 'Благоустройство скверов и парков для жителей города',
    userName: 'Иван Смирнов',
    date: '25.01.2025',
    likes: 15,
    link: '#',
    imageUrl: testImage,
    avatarUrl: '',
  },
  {
    title: 'Развитие общественного транспорта',
    subtitle: 'Оптимизация маршрутов автобусов и трамваев',
    userName: 'Мария Кузнецова',
    date: '26.01.2025',
    likes: 8,
    link: '#',
    imageUrl: testImage,
    avatarUrl: '',
  },
  {
    title: 'Умные урны',
    subtitle: 'Внедрение умных урн с сортировкой мусора',
    userName: 'Дмитрий Иванов',
    date: '27.01.2025',
    likes: 12,
    link: '#',
    imageUrl: testImage,
    avatarUrl: '',
  },
  {
    title: 'Умные урны',
    subtitle: 'Внедрение умных урн с сортировкой мусора',
    userName: 'Дмитрий Иванов',
    date: '27.01.2025',
    likes: 12,
    link: '#',
    imageUrl: testImage,
    avatarUrl: '',
  },
  {
    title: 'Умные урны',
    subtitle: 'Внедрение умных урн с сортировкой мусора',
    userName: 'Дмитрий Иванов',
    date: '27.01.2025',
    likes: 12,
    link: '#',
    imageUrl: testImage,
    avatarUrl: '',
  },
  {
    title: 'Умные урны',
    subtitle: 'Внедрение умных урн с сортировкой мусора',
    userName: 'Дмитрий Иванов',
    date: '27.01.2025',
    likes: 12,
    link: '#',
    imageUrl: testImage,
    avatarUrl: '',
  },
]

export function LastIdeas({
  title,
  subtitle,
  viewCards = 3,
}: LastIdeasProps) {
  const [visibleCount, setVisibleCount] = useState(viewCards)

  const visibleIdeas = ideas.slice(0, visibleCount)
  return (
    <section className={classes.lastIdeas}>
      <h1 className={classes.lastIdeas__title}>{title}</h1>
      <p className={classes.lastIdeas__subtitle}>{subtitle}</p>
      <div className={classes.lastIdeas__ideas}>
        {visibleIdeas.map((idea, index) => (
          <IdeaCard key={index} {...idea} />
        ))}
      </div>
      <button className={classes.lastIdeas__button} onClick={() =>  setVisibleCount((prev) => prev + 6)}>Показать еще</button>
    </section>
  )
}
