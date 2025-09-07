'use client'

import { useState } from 'react'
import classes from './DropDown.module.scss'

const date = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
]

export function DropDown() {
  const [selected, setSelected] = useState<number>(date[0])
  const [open, setOpen] = useState(false)

  return (
    <div className={classes.dropDown}>
      {/* Кнопка */}
      <button
        className={classes.dropDown__button}
        onClick={() => setOpen(prev => !prev)}
      >
        {selected} <span className={classes.arrow}>{open ? '▲' : '▼'}</span>
      </button>

      {/* Список */}
      <ul
        className={`${classes.dropDown__list} ${
          open ? classes.open : classes.closed
        }`}
      >
        {date.map(item => (
          <li
            key={item}
            className={classes.dropDown__list__item}
            onClick={() => {
              setSelected(item)
              setOpen(false)
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
