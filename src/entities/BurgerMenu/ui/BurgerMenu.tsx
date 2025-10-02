'use client'

import React, { useEffect, useState, useRef } from 'react'
import classes from './BurgerMenu.module.scss'
import Link from 'next/link'
import { BurgerMenuItems } from '../lib/BurgerMenu.helpers'
import { Button } from '@/shared/Button'

export function BurgerMenu({
  localizedTitles,
  btn,
  isVisibleLoginButton,
}: {
  localizedTitles: string[]
  btn: string
  isVisibleLoginButton: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [width, setWidth] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showButton = () => {
    if (width !== null && width < 555 && isVisibleLoginButton) {
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 0',
          }}
        >
          <Link
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            href="/login"
            onClick={() => setIsOpen(false)}
          >
            <Button style={{ width: '95%', borderRadius: '8px' }} text={btn} />
          </Link>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <>
      {width !== null && width < 1355 && (
        <div className={classes.burgerMenu} ref={ref}>
          <button
            className={`${classes.burgerMenu__icon} ${isOpen ? classes.burgerMenu__icon__active : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`${classes.burgerMenu__icon__line} ${isOpen ? classes.burgerMenu__icon__active__line : ''}`}
            ></span>
            <span
              className={`${classes.burgerMenu__icon__line} ${isOpen ? classes.burgerMenu__icon__active__line : ''}`}
            ></span>
            <span
              className={`${classes.burgerMenu__icon__line} ${isOpen ? classes.burgerMenu__icon__active__line : ''}`}
            ></span>
          </button>

          <ul
            className={classes.burgerMenu__list}
            style={{
              maxHeight: isOpen ? '500px' : '0', // достаточно большое число, чтобы вместить весь список
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
            }}
          >
            {BurgerMenuItems.map((item, index) => (
              <li className={classes.burgerMenu__list__item} key={item.href}>
                <Link
                  className={classes.burgerMenu__list__item__link}
                  href={item.href}
                  prefetch
                  onClick={() => setIsOpen(false)}
                >
                  {localizedTitles?.[index] ?? item.title}
                </Link>
              </li>
            ))}

            {showButton()}

            {/* {width !== null && width < 555 && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 0',
                }}
              >
                <Link
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  href="/login"
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    style={{ width: '95%', borderRadius: '8px' }}
                    text={btn}
                  />
                </Link>
              </div>
            )} */}
          </ul>
        </div>
      )}
    </>
  )
}
