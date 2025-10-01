/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import classes from './DropDown.module.scss'
import Cookies from 'js-cookie'
import topArrow from '../assets/icons/top-arrow-svgrepo-com.svg'
import bottomArrow from '../assets/icons/bottom-arrow-svgrepo-com.svg'
import Image from 'next/image'

type LangOption = { label: ReactNode; value: string }
type Option = string | number | LangOption

export function DropDown({
  arr,
  onSelect,
  className,
  visibleArrow = true,
  button,
  type = 'button',
  itemsClassName,
  isLanguage = false,
}: {
  arr?: Option[]
  onSelect?: (value: string | number) => void
  className?: string
  visibleArrow?: boolean
  button?: string
  itemsClassName?: string
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

  const [selected, setSelected] = useState<Option | ''>('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null) // реф на контейнер
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // установка выбранного значения из куки
  useEffect(() => {
    const locale = Cookies.get('locale')
    if (locale) {
      if (isLanguage) {
        const found = options.find(
          item =>
            typeof item === 'object' && 'value' in item && item.value === locale
        ) as Option | undefined
        if (found) {
          setSelected(found)
          return
        }
      } else {
        const found = options.find(
          item => item === (locale as unknown as Option)
        )
        if (found) {
          setSelected(found)
          return
        }
      }
    }
    setSelected(options[0])
  }, [options, isLanguage])

  // закрываем dropdown при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getLabel = (item: Option | ''): ReactNode =>
    item && typeof item === 'object' && 'label' in item
      ? item.label
      : (item as ReactNode)

  const getValue = (item: Option | ''): string | number =>
    item && typeof item === 'object' && 'value' in item
      ? item.value
      : (item as string | number)

  return (
    <div className={`${classes.dropDown} ${className ?? ''}`} ref={ref}>
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
        {visibleArrow && (
          <span className={classes.arrow} suppressHydrationWarning>
            {open ? (
              <Image src={topArrow} alt="arrow" width={16} height={16} />
            ) : (
              <Image src={bottomArrow} alt="arrow" width={16} height={16} />
            )}
          </span>
        )}
      </button>

      <ul
        className={`${classes.dropDown__list} ${
          open ? classes.open : classes.closed
        } ${itemsClassName ?? ''}`}
      >
        {options.map(item => (
          <li
            key={String(getValue(item))}
            style={
              mounted
                ? { justifyContent: isLanguage ? 'center' : 'space-between' }
                : undefined
            }
            className={`${classes.dropDown__list__item} ${itemsClassName ?? ''}`}
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
