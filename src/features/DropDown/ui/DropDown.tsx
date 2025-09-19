/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import classes from './DropDown.module.scss'
import Cookies from 'js-cookie'

type Option = string | number | { label: string; value: string }

export function DropDown({
  arr,
  onSelect,
  className,
  visibleArrow = true,
  button,
  type = 'button',
}: {
  arr?: Option[]
  onSelect?: (value: string | number) => void
  className?: string
  visibleArrow?: boolean
  button?: string
  type?: 'button' | 'submit' | 'reset'
}) {
  const options = arr && arr.length > 0 ? arr : ['ru', 'en', 'kg'] // твои языки

  // 🔹 стартовое значение пустое, чтобы избежать гидрационных расхождений
  const [selected, setSelected] = useState<Option>('') 
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const locale = Cookies.get('locale')
    if (locale && options.includes(locale)) {
      setSelected(locale)
    } else {
      setSelected(options[0])
    }
  }, [options])

  const getLabel = (item: Option) =>
    typeof item === 'object' && 'label' in item ? item.label : item

  const getValue = (item: Option) =>
    typeof item === 'object' && 'value' in item ? item.value : item

  return (
    <div className={`${classes.dropDown} ${className}`}>
      <button
        className={`${classes.dropDown__button} ${button}`}
        onClick={e => {
          e.preventDefault()
          setOpen(prev => !prev)
        }}
        type={type}
      >
        {selected && getLabel(selected)}{' '}
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
            key={getValue(item)}
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
