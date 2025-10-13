'use client'

import { useLocale } from 'next-intl'

export function useInputSearchLocale() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return 'Поиск...'
    case 'en':
      return 'Search...'
    case 'kg':
      return 'издөө...'
    default:
      return 'Поиск...'
  }
}

export function useLoginButton() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return 'Войти'
    case 'en':
      return 'Login'
    case 'kg':
      return 'Кирүү'
    default:
      return 'Войти'
  }
}

export function useSelectFile() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return 'Прикрепите файлы'
    case 'en':
      return 'Attach files'
    case 'kg':
      return 'Файлдарды тиркөө'
    default:
      return 'Прикрепите файлы'
  }
}

export function useGetActionUser() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return {
        titleArticle: 'Поделитесь своими мыслями и исследованиями об урбанистике',
        buttonArticle: 'Добавить статью',
        titleIdea: 'Поделитесь своими идеями улучшения условий для горожан',
        buttonIdea: 'Добавить идею'
      }
    case 'en':
      return {
        titleArticle: 'Share your thoughts and research on urbanism',
        buttonArticle: 'Add article',
        titleIdea: 'Share your ideas for improving conditions for citizens',
        buttonIdea: 'Add idea'
      }
    case 'kg':
      return {
        titleArticle: 'Урбанизм боюнча өз оюңузду жана изилдөөңүздү бөлүшүңүз',
        buttonArticle: 'Макалаларды көшүңүз',
        titleIdea: 'Шаар тургундарына шарттарды жакшыртуу боюнча өз идеяларыңыз менен бөлүшүңүз',
        buttonIdea: 'Идеаларды көшүңүз'
      }
    default:
      return {
        titleArticle: 'Поделитесь своими мыслями и исследованиями об урбанистике',
        buttonArticle: 'Добавить статью',
        titleIdea: 'Поделитесь своими идеями улучшения условий для горожан',
        buttonIdea: 'Добавить идею'
      }
  }
}

export function useProfileLocale() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return {
        profile: 'Мой профиль',
        articles: "Мои статьи",
        notArticles: 'У вас пока нет опубликованных статей.',
        ideas: 'Мои идеи',
        noIdeas: 'У вас пока нет опубликованных идей.'
      }
    case 'en':
      return {
        profile: 'My profile',
        articles: "My articles",
        notArticles: 'You have no published articles yet.',
        ideas: 'My ideas',
        noIdeas: 'You have no published ideas yet.'
      }
    case 'kg':
      return {
        profile: 'Менин профилем',
        articles: "Менин макалаларым",
        notArticles: 'Сизде азырынча жарыяланган макалалар жок.',
        ideas: 'Менин идеяларым',
        noIdeas: 'Сизде азырынча жарыяланган идеялар жок.'
      }
    default:
      return {
        profile: 'Мой профиль',
        articles: "Мои статьи",
        notArticles: 'У вас пока нет опубликованных статей.',
        ideas: 'Мои идеи',
        noIdeas: 'У вас пока нет опубликованных идей.'
      }
  }
}

export function useNavBarTiles() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return ['Банк Урбан-идей', 'Урбан-статьи', 'Краудфандинг', 'Краудсорсинг', 'О нас']
    case 'en':
      return ['Urban Ideas Bank', 'Urban Articles', 'Crowdfunding', 'Crowdsourcing', 'About us']
    case 'kg':
      return ['Урбан идеялар банкы', 'макалалар', 'Краудфандинг', 'Краудсорсинг', 'Биз жөнүндө']
    default:
      return ['Банк Урбан-идей', 'Урбан-статьи', 'Краудфандинг', 'Краудсорсинг', 'О нас']
  }
}

export function useDropDownSearchs() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return [
        { label: 'Новые', value: 'new' },
        { label: 'Популярные', value: 'popular' },
        { label: 'Активные', value: 'active' },
      ]
    case 'en':
      return [
        { label: 'New', value: 'new' },
        { label: 'Popular', value: 'popular' },
        { label: 'Active', value: 'active' },
      ]
    case 'kg':
      return [
        { label: 'жаңылар', value: 'new' },
        { label: 'популярдуу', value: 'popular' },
        { label: 'активдүү', value: 'active' },
      ]
    default:
      return [
        { label: 'Новые', value: 'new' },
        { label: 'Популярные', value: 'popular' },
        { label: 'Активные', value: 'active' },
      ]
  }
}

export function useSearchCategory() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return {
        title: "Эко-карта",
        input: "Поиск...",
        category: {
          all: "Все категории",
          suggested: "Предложения",
          problems: "Проблемы",
          solved: "Реализованные проекты",
        }
      }
    case 'en':
      return {
        title: "Eco-map",
        input: "Search...",
        category: {
          all: "All categories",
          suggested: "Suggestions",
          problems: "Problems",
          solved: "Realized projects",
        }
      }
    case 'kg':
      return {
        title: "Эко-карта",
        input: "Издөө...",
        category: {
          all: "Бардык категориялар",
          suggested: "Талаптар",
          problems: "Көйгөйлөр",
          solved: "Аяктаган долбоорлор",
        }
      }
    default:
      return {
        title: "Эко-карта",
        input: "Поиск...",
        category: {
          all: "Все категории",
          suggested: "Предложения",
          problems: "Проблемы",
          solved: "Реализованные проекты",
        }
      }
  }
}

export function useMoreButton() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return 'Подробнее'
    case 'en':
      return 'More'
    case 'kg':
      return 'Көбүрөөк'
    default:
      return 'Подробнее'
  }
}

export function useCrowdfundingData() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return {
        label: 'Выберите идею, которую хотите поддержать',
        selected: 'Выбранный проект:',
        unselected: 'Ничего не выбрано',
      }
    case 'en':
      return {
        label: 'Select the idea you want to support',
        selected: 'Selected project:',
        unselected: 'Nothing selected',
      }
    case 'kg':
      return {
        label: 'Сиз колдогуңуз келген идеяны тандаңыз',
        selected: 'тандалган проект:',
        unselected: 'Эчнерсе тандалган жок',
      }
    default:
      return {
        label: 'Выберите идею, которую хотите поддержать',
        selected: 'Выбранный проект:',
        unselected: 'Ничего не выбрано',
      }
  }
}

export function useSupportProjectIdea() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return 'Поддержать проект'
    case 'en':
      return 'Support project'
    case 'kg':
      return 'Проекти колдоо'
    default:
      return 'Поддержать проект'
  }
}

export function useNothingDefined() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return 'Ничего не найдено'
    case 'en':
      return 'Nothing found'
    case 'kg':
      return 'Эчнерсе табылган жок'
    default:
      return 'Ничего не найдено'
  }
}

export function useCrowdsourcingData() {
  const locale = useLocale()
  switch (locale) {
    case 'ru':
      return {
        label: 'Выбрано:',
        pic: 'Фото профиля',
      }
    case 'en':
      return {
        label: 'Selected:',
        pic: 'Profile photo',
      }
    case 'kg':
      return {
        label: 'Тандалган:',
        pic: 'Профиль сүрөтү',
      }
    default:
      return {
        label: 'Выбрано:',
        pic: 'Фото профиля',
      }
  }
}

export function useDetailPageLocale() {
  const { locale } = useLocale() as unknown as { locale: string }
  switch (locale) {
    case 'ru':
      return {
        titleIdea: 'Урбан-идеи',
        subtitleIdea: 'Ознакомьтесь с идеями наших пользователей',
        titleArticle: 'Урбан-статьи',
        subtitleArticle: 'Ознакомьтесь с последними новостями',
        share: 'Поделится',
        map: 'Где пользователь советует реализовать идею',
        otherIdeas: 'Другие публикации',
        otherArticles: 'Другие статьи',
        commentsTitle: 'Комментарии',
      }
    case 'en':
      return {
        titleIdea: 'Urban Ideas',
        subtitleIdea: 'Check out ideas from our users',
        titleArticle: 'Urban Articles',
        subtitleArticle: 'Check out the latest news',
        share: 'Share',
        map: 'Where the user suggests to realize the idea',
        otherIdeas: 'Other publications',
        otherArticles: 'Other articles',
        commentsTitle: 'Comments',
      }
    case 'kg':
      return {
        titleIdea: 'Урбан-идеялар',
        subtitleIdea: 'Биздин колдонуучулардын идеяларын карап көрүңүз',
        titleArticle: 'Урбан-статьялар',
        subtitleArticle: 'Акыркы жаңылыктарды көрүңүз',
        share: 'Бөлүшүү',
        map: 'Колдонуучу идеяны ишке ашырууга кеңеш берген жерде',
        otherIdeas: 'Башка публикациялар',
        otherArticles: 'Башка макалалар',
        commentsTitle: 'Комментариалар',
      }
    default:
      return {
        titleIdea: 'Урбан-идеи',
        subtitleIdea: 'Ознакомьтесь с идеями наших пользователей',
        titleArticle: 'Урбан-статьи',
        subtitleArticle: 'Ознакомьтесь с последними новостями',
        share: 'Поделится',
        map: 'Где пользователь советует реализовать идею',
        otherIdeas: 'Другие публикации',
        otherArticles: 'Другие статьи',
        commentsTitle: 'Комментарии',
      }
  }
}
