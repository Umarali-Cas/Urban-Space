'use client'

import { ArticlesCard } from '@/entities/ArticlesCard'
import classes from './Articles.module.scss'
import image from '../assets/Image-1.png'
import { useEffect, useState } from 'react'

export function Articles() {
  const [isHide, setIsHide] = useState(false)

  useEffect(() => { //Адаптация под мобильные устройства, временно пока нет бекенда
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setIsHide(true);
      } else {
        setIsHide(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <section className={classes.articles}>
      <div className={classes.articles__wrapper}>
        <div className={classes.articles__container}>
          <h1 className={classes.articles__container__title}>Урбан - статьи</h1>
          <p className={classes.articles__container__subtitle}>
            Ознакомьтесь с последними новостями
          </p>
          <div className={classes.articles__container__content}>
            <ArticlesCard
              article="Your expectations will fly sky high. I felt like I was soaring."
              articleName="Название статьи"
              role="Публицист"
              userName="Wanda Wingleton"
              avatarUrl={''}
            />
            {!isHide && (
              <>
              <ArticlesCard
                article="Your expectations will fly sky high. I felt like I was soaring."
                articleName="Название статьи"
                role="Публицист"
                userName="Wanda Wingleton"
                avatarUrl={image.src}
              />

              <ArticlesCard
                article="Your expectations will fly sky high. I felt like I was soaring."
                articleName="Название статьи"
                role="Публицист"
                userName="Wanda Wingleton"
                avatarUrl={image.src}
                />
                </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
