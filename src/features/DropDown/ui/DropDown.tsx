'use client'

import { useState } from 'react'
import classes from './DropDown.module.scss'

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
  const defaultDate = [
    2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016,
    2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007,
    2006, 2005, 2004, 2003, 2002, 2001, 2000,
  ]

  const options = arr && arr.length > 0 ? arr : defaultDate
  const [selected, setSelected] = useState<Option>(options[0])
  const [open, setOpen] = useState(false)

  const getLabel = (item: Option) =>
    typeof item === 'object' && 'label' in item ? item.label : item

  const getValue = (item: Option) =>
    typeof item === 'object' && 'value' in item ? item.value : item

  return (
    <div className={`${classes.dropDown} ${className}`}>
      <button
        className={`${classes.dropDown__button} ${button}`}
        onClick={e => {
          e.preventDefault() // предотвращаем сабмит формы
          setOpen(prev => !prev)
        }}
        type={type}
      >
        {getLabel(selected)}{' '}
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
