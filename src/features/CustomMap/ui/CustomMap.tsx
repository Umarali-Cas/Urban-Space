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
        <Button key={1} text='Проблемы' className={classes.mapSection__container__problems}/>
        <Button key={2} text='Предложения' className={classes.mapSection__container__suggestions}/>
        <Button key={3} text='Реализованные прокты' className={classes.mapSection__container__projects}/>
      </div>
      <MapClient key={1}/>
    </div>
  )
}
