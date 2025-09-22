import { ForumCard } from '@/entities/ForumCard/ui/ForumCard'
import classes from './Forums.module.scss'

const info = {
  phone: '+996500500500',
  email: '@urban.kg',
  address: 'Бишкек , Улица, Дом',
  social: [
    {
      url: '',
      name: 'канал',
    },
    {
      url: '',
      name: 'Ссылка на канал - "Название канала"',
    },
    {
      url: '',
      name: 'Ссылка на канал - "Название канала по абв и где"',
    },
  ],
}

export default function Forums() {
  return (
    <section className={classes.forums}>
      <h1 className={classes.forums__title}>Контакты</h1>
      <p className={classes.forums__description}>
        Наши контакты и ссылки на каналы
      </p>
      <div className={classes.forums__links}>
        <p>
          Номер телефона: <br />
          <a href={`tel:${info.phone}`}>{info.phone}</a>
        </p>
        <p>
          Почта: <br />
          <a href={`mailto:${info.email}`}>{info.email}</a>
        </p>
        <p>
          Адрес: <br />
          <span className={classes.forums__links__address}>{info.address}</span>
        </p>
        <div className={classes.forums__links__social}>
          <p>Наши каналы:</p>
          <ul>
            {info.social.map((item, index) => (
              <ForumCard media={item.url} title={item.name} key={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
