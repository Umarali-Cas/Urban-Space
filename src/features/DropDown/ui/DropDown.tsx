/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useState, useEffect, ReactNode } from 'react'
import classes from './DropDown.module.scss'
import Cookies from 'js-cookie'

type LangOption = { label: ReactNode; value: string }
type Option = string | number | LangOption

export function DropDown({
  arr,
  onSelect,
  className,
  visibleArrow = true,
  button,
  type = 'button',
  isLanguage = false, // <- поддерживаем имя, которое ты передаёшь
}: {
  arr?: Option[]
  onSelect?: (value: string | number) => void
  className?: string
  visibleArrow?: boolean
  button?: string
  type?: 'button' | 'submit' | 'reset'
  isLanguage?: boolean
}) {
  const options: Option[] =
    arr && arr.length > 0
      ? arr
      : isLanguage
      ? [
          { value: 'ru', label: 'ru' },
          { value: 'en', label: 'en' },
          { value: 'kg', label: 'kg' },
        ]
      : ['ru', 'en', 'kg']

  // стартовое значение пустое (чтобы не было гидрационных расхождений)
  const [selected, setSelected] = useState<Option | ''>('') 
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const locale = Cookies.get('locale')
    if (locale) {
      if (isLanguage) {
        // если опции — объекты {value, label} — ищем по value
        const found = options.find(
          item => typeof item === 'object' && 'value' in item && item.value === locale
        ) as Option | undefined
        if (found) {
          setSelected(found)
          return
        }
      } else {
        // если опции простые строки/числа
        const found = options.find(item => item === (locale as unknown as Option))
        if (found) {
          setSelected(found)
          return
        }
      }
    }
    setSelected(options[0])
  }, [options, isLanguage])

  const getLabel = (item: Option | ''): ReactNode =>
    item && typeof item === 'object' && 'label' in item ? item.label : (item as ReactNode)

  const getValue = (item: Option | ''): string | number =>
    item && typeof item === 'object' && 'value' in item
      ? item.value
      : (item as string | number)

  return (
    <div className={`${classes.dropDown} ${className ?? ''}`}>
      <button
        className={`${classes.dropDown__button} ${button ?? ''}`}
        onClick={e => {
          e.preventDefault()
          setOpen(prev => !prev)
        }}
        style={isLanguage ? { padding: '9px 8.6px' } : { padding: '9px 12px' }}
        type={type}
      >
        {selected ? getLabel(selected) : null}{' '}
        <span
          style={{ display: visibleArrow ? 'block' : 'none' }}
          className={classes.arrow}
        >
          {open ? '▲' : '▼'}
        </span>
      </button>

      <ul
        className={`${classes.dropDown__list} ${
          open ? classes.open : classes.closed
        }`}
      >
        {options.map(item => (
          <li
            key={String(getValue(item))}
            className={classes.dropDown__list__item}
            onClick={() => {
              setSelected(item)
              setOpen(false)
              onSelect?.(getValue(item))
            }}
          >
            {getLabel(item)}
          </li>
        ))}
      </ul>
    </div>
  )
}
