import Image, { StaticImageData } from 'next/image'
import classes from './IdeasDetailPage.module.scss'
import { useGetIdeasQuery } from '@/widgets/LastIdeas/api/IdeasApi'
import { IdeaCard } from '../IdeaCard'
import { useDetailPageLocale } from '@/i18n/useNativeLocale'
import { getImageIdea } from './getImageIdea'
import { getImageUrlFromMedia } from '@/shared/hooks/getImageUrlFromMedia'

export function IdeasDetailPage({
  title,
  desc,
  image,
  timeCreate,
  id,
}: {
  title: string
  desc: string
  image: StaticImageData | string
  timeCreate: string
  id: string
}) {
  const { data: ideas = [], isLoading } = useGetIdeasQuery({ limit: 4 })
  const { titleIdea, subtitleIdea, share, otherIdeas } = useDetailPageLocale()

  const images = Array.isArray(image)
    ? image.filter(file => file.mime?.startsWith('image/'))
    : []

  const formatDate = () => {
    const date = new Date(timeCreate)
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  const handleShare = async () => {
    const url = window.location.href

    try {
      if (navigator.share) {
        // если браузер поддерживает Web Share API
        await navigator.share({
          title: document.title,
          text: 'Смотри идею на сайте!',
          url,
        })
      } else {
        // fallback: просто копируем ссылку в буфер обмена
        await navigator.clipboard.writeText(url)
        // можно добавить свой кастомный тост: "Ссылка скопирована"
      }
    } catch (err) {
      console.error('Ошибка при шаринге:', err)
    }
  }

  return (
    <section className={classes.ideasDetailPage}>
      <div className={classes.ideasDetailPage__upper}>
        <h1>{titleIdea}</h1>
        <p>{subtitleIdea}</p>
      </div>
      <div className={classes.ideasDetailPage__content}>
        <div className={classes.ideasDetailPage__content__upWrapper}>
          <span>
            {formatDate()}{' '}
            <Image
              className={classes.calendarImg}
              src="/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
            />
          </span>
          <button
            className={classes.ideasDetailPage__content__upWrapper__share}
            onClick={handleShare}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <Image
              className={classes.shareImg}
              src="/share.svg"
              alt="share"
              width={24}
              height={24}
            />
            {share}
          </button>
        </div>
        <h1 className={classes.ideasDetailPage__content__title}>{title}</h1>
        <div
          className={classes.ideasDetailPage__content__imageWrapper}
          style={images.length === 0 ? { gap: '0' } : { gap: '32px' }}
        >
          {images.length > 0 ? (
            <Image
              className={classes.ideasDetailPage__content__imageWrapper__image}
              src={getImageIdea(id, images[0].file_key) || '/grey.jpg'}
              alt="main-image"
              width={815}
              height={512}
            />
          ) : (
            <Image
              className={classes.ideasDetailPage__content__imageWrapper__image}
              src="/grey.jpg"
              alt="placeholder"
              width={815}
              height={512}
            />
          )}
          <div
            className={classes.ideasDetailPage__content__imageWrapper__others}
          >
            {images.slice(1).map((img, idx) => (
              <Image
                key={idx}
                className={
                  classes.ideasDetailPage__content__imageWrapper__others__image
                }
                src={getImageIdea(id, img.file_key) || '/grey.jpg'}
                alt={`other-image-${idx}`}
                width={168}
                height={106}
              />
            ))}
          </div>
        </div>
        <p className={classes.ideasDetailPage__content__desc}>{desc}</p>
      </div>
      <h1 className={classes.ideasDetailPage__others__title}>{otherIdeas}</h1>
      <div className={classes.ideasDetailPage__others}>
        {isLoading && <p>Загрузка...</p>}
        {ideas
          .filter(idea => idea.id !== id) // исключаем текущую идею
          .map((idea, index) => (
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
              imageUrl={getImageUrlFromMedia(idea.media)}
              status={idea.status || 'DRAFT'}
            />
          ))}
      </div>
    </section>
  )
}
