/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useParams } from 'next/navigation'

export function getInputSearchLocale() {
  const { locale } = useParams() as { locale: string }
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

export function dropDownSearchs() {
  const { locale } = useParams() as { locale: string }
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

export function moreButton() {
  const { locale } = useParams() as { locale: string }
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

export function crowdfundingData() {
  const { locale } = useParams() as { locale: string }
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

export function getSupportProjectIdea() {
  const { locale } = useParams() as { locale: string }
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

export function nothingDefined() {
  const { locale } = useParams() as { locale: string }
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

export function crowdsourcingData() {
  const { locale } = useParams() as { locale: string }
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
      return 'Ничего не найдено'
  }
}