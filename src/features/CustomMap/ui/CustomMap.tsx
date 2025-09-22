'use client'

import dynamic from 'next/dynamic'
import classes from './CustomMap.module.scss'

const MapClient = dynamic(() => import('./MapClient'), { ssr: false })

export default function CustomMap() {
  return (
    <div className={classes.mapSection}>
      <MapClient key={1} />
    </div>
  )
}
