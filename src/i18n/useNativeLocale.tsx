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
  const { locale } = useParams() as { locale: string }
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
      }
  }
}
