import { IdeaCard } from '@/entities/IdeaCard'
import classes from './LastIdeas.module.scss'

export function LastIdeas() {
  return (
    <section className={classes.lastIdeas}>
      <h1 className={classes.lastIdeas__title}>Последние добавленные идеи</h1>
      <p className={classes.lastIdeas__subtitle}>
        Свежие предложения от участников сообщества
      </p>
      <div className={classes.lastIdeas__ideas}>
        <IdeaCard
          title="Велосипедные дорожки в центре города"
          subtitle="Создание безопасной сети велосипедных дорожек для улучшения экологии и мобильности"
          userName="Анна Петрова"
          date="24.01.2025"
          likes={10}
          link="/idea/1"
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqVPB84wI3t0rAKcAtfiPNnRMJBZKUFR8-8A&s"
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsps9vg5OwA8atxhgDRRAZyyX5ahtjhI70A&s"
        />
        <IdeaCard
          title="Велосипедные дорожки в центре города"
          subtitle="Создание безопасной сети велосипедных дорожек для улучшения экологии и мобильности"
          userName="Анна Петрова"
          date="24.01.2025"
          likes={10}
          link="/idea/1"
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqVPB84wI3t0rAKcAtfiPNnRMJBZKUFR8-8A&s"
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsps9vg5OwA8atxhgDRRAZyyX5ahtjhI70A&s"
        />
        <IdeaCard
          title="Велосипедные дорожки в центре города"
          subtitle="Создание безопасной сети велосипедных дорожек для улучшения экологии и мобильности"
          userName="Анна Петрова"
          date="24.01.2025"
          likes={10}
          link="/idea/1"
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqVPB84wI3t0rAKcAtfiPNnRMJBZKUFR8-8A&s"
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsps9vg5OwA8atxhgDRRAZyyX5ahtjhI70A&s"
        />
      </div>
        <button className={classes.lastIdeas__button}>Показать еще</button>
    </section>
  )
}
