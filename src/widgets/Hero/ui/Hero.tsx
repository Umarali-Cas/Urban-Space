'use client'

import Image from 'next/image'
import classes from './Hero.module.scss'
import poster from '../assets/images/Lightbox Poster.png'

export function Hero({ title }: { title: string }) {
  return (
    <section className={classes.hero}>
      <h1 className={classes.hero__title}>{title}</h1>
      <div className={classes.hero__box}>
        <div className={classes.hero__box__border}>
          <span className={classes.hero__box__border__dot}></span>
          <span className={classes.hero__box__border__dot}></span>
          <span className={classes.hero__box__border__dot}></span>
        </div>
        <Image
          src={poster}
          alt="hero-image"
          className={classes.hero__box__image}
          loading="lazy"
        />
      </div>
    </section>
  )
}
