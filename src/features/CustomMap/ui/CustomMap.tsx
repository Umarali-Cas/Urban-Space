'use client'

import dynamic from 'next/dynamic'
import classes from './CustomMap.module.scss'
import { Button } from '@/shared/Button'
import { DropDown } from '@/features/DropDown'

const MapClient = dynamic(() => import('./MapClient'), { ssr: false })

export default function CustomMap() {
  return (
    <div className={classes.mapSection}>
      <div className={classes.mapSection__container}>
        <DropDown />
        <Button text='Проблемы' className={classes.mapSection__container__problems}/>
        <Button text='Предложения' className={classes.mapSection__container__suggestions}/>
        <Button text='Реализованные прокты' className={classes.mapSection__container__projects}/>
      </div>
      <MapClient />
    </div>
  )
}
