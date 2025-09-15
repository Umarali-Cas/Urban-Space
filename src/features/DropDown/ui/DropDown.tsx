'use client'

import { useState } from 'react'
import classes from './DropDown.module.scss'

const defaultDate = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
]

export function DropDown({
  arr,
  onSelect,
  className,
  visibleArrow = true,
}: {
  arr?: Array<string | number>
  onSelect?: (value: string | number) => void
  className?: string
  visibleArrow?: boolean
}) {
  const options = arr && arr.length > 0 ? arr : defaultDate
  const [selected, setSelected] = useState<string | number>(options[0])
  const [open, setOpen] = useState(false)

  return (
    <div className={`${classes.dropDown} ${className}`}>
      <button
        className={classes.dropDown__button}
        onClick={() => setOpen(prev => !prev)}
      >
        {selected} <span style={{ display: visibleArrow ? 'block' : 'none' }} className={classes.arrow}>{open ? '▲' : '▼'}</span>
      </button>

      <ul
        className={`${classes.dropDown__list} ${
          open ? classes.open : classes.closed
        }`}
      >
        {options.map(item => (
          <li
            key={item}
            className={classes.dropDown__list__item}
            onClick={() => {
              setSelected(item)
              setOpen(false)
              onSelect?.(item) // уведомляем родителя
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
