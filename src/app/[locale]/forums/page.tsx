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
      <h1 style={{ margin: '0 auto' }} className={classes.forums__title}>
        О нас
      </h1>
      <hr
        style={{
          width: '90%',
          height: '1px',
          background: 'grey',
          margin: '20px auto',
        }}
      />
      <div
        className={classes.about}
        style={{ marginBottom: '1rem', lineHeight: 1.6, color: '#333333' }}
      >
        <p>
          URBAN SPACE - инновационная цифровая платформа для развития и
          улучшения городской и сельской среды Кыргызстана. Мы создаем
          интерактивное пространство, где молодые специалисты в области
          информационных технологий, урбанистики, архитектуры, экологии и
          активисты могут обмениваться идеями, разрабатывать продукты и проекты,
          а также вовлекать заинтересованные стороны в их реализацию. Платформа
          объединяет экспертизу, творчество и технологии для создания
          современных, комфортных и устойчивых городов и населённых пунктов.
        </p>
        <p>
          URBAN SPACE объединяет ключевые инструменты для развития городской и
          сельской среды:
        </p>
        <p>
          Банк урбан-идей — цифровая база инновационных проектов, включая
          архитектурные концепции, транспортные модели, умные технологии и
          экологические инициативы. Этот модуль позволяет делиться идеями и
          воплощать их в жизнь.
        </p>
        <p>
          Урбан-Scholar - аналитические материалы, исследования, успешные кейсы и экспертные мнения по  развитию городов и населённых пунктов. Модуль помогает специалистам и жителям принимать информированные решения.
        </p>
        <p>Краудсорсинг-сбор предложений от жителей для выявления и решения актуальных проблем городской и сельской среды.</p>
        <p>Краудфандинг -привлечение средств для реализации актуальных идей и проектов на платформе.</p>
      </div>
      <hr
        style={{
          width: '90%',
          height: '1px',
          background: 'grey',
          margin: '20px auto',
        }}
      />

      <h1 style={{ margin: '0 auto' }} className={classes.forums__title}>
        Контакты
      </h1>
      <p style={{ margin: '0 auto', color: '#7a8894' }} className={classes.forums__description}>
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
