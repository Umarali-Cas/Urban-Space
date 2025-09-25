import Image, { StaticImageData } from 'next/image'
import classes from './IdeasDetailPage.module.scss'
import { ArticlesCard } from '@/entities/ArticlesCard'
import { useGetIdeasQuery } from '@/widgets/LastIdeas/api/IdeasApi'
import { IdeaCard } from '../IdeaCard'

export function IdeasDetailPage({
  title,
  desc,
  image,
}: {
  title: string
  desc: string
  image: StaticImageData | string
}) {
  const { data: ideas = [], isLoading } = useGetIdeasQuery({ limit: 6 })

  return (
    <section className={classes.ideasDetailPage}>
      <div className={classes.ideasDetailPage__upper}>
        <h1>Урбан-идеи</h1>
        <p>Ознакомьтесь с последними предложениями</p>
      </div>
      <div className={classes.ideasDetailPage__content}>
        <div className={classes.ideasDetailPage__content__upWrapper}>
          <span>20 января</span>
          <a href="#">Поделится</a>
        </div>
        <h1 className={classes.ideasDetailPage__content__title}>{title}</h1>
        <div className={classes.ideasDetailPage__content__imageWrapper}>
          <Image
            className={classes.ideasDetailPage__content__imageWrapper__image}
            src={image || "/grey.jpg"}
            alt="image"
            width={815}
            height={512}
          />
          <div
            className={classes.ideasDetailPage__content__imageWrapper__others}
          >
            <Image
              className={
                classes.ideasDetailPage__content__imageWrapper__others__image
              }
              src="/grey.jpg"
              alt="image"
              width={168}
              height={106}
            />
            <Image
              className={
                classes.ideasDetailPage__content__imageWrapper__others__image
              }
              src="/grey.jpg"
              alt="image"
              width={168}
              height={106}
            />
            <Image
              className={
                classes.ideasDetailPage__content__imageWrapper__others__image
              }
              src="/grey.jpg"
              alt="image"
              width={168}
              height={106}
            />
            <Image
              className={
                classes.ideasDetailPage__content__imageWrapper__others__image
              }
              src="/grey.jpg"
              alt="image"
              width={168}
              height={106}
            />
          </div>
        </div>
        <p className={classes.ideasDetailPage__content__desc}>{desc}</p>
      </div>
      <h1 className={classes.ideasDetailPage__others__title}>Другие идеи</h1>
      <div className={classes.ideasDetailPage__others}>
        {isLoading && <p>Загрузка...</p>}
        {ideas.map((idea, index) => (
            <IdeaCard
              slug={idea.slug || ''}
              uniqueId={idea.id}
              key={idea.id ?? index}
              date={idea.created_at || ''}
              likes={idea.likes_count || 0}
              link={idea.link || ''}
              subtitle={idea.description_md || ''}
              title={idea.title || ''}
              userName={idea.author_name}
              avatarUrl={idea.author_avatar}
              imageUrl={idea.media?.[0]?.meta?.url}
              status={idea.status || 'DRAFT'}
            />
        ))}
      </div>
    </section>
  )
}
