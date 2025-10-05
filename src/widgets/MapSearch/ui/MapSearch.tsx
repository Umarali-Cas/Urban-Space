/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import classes from './MapSearch.module.scss'
import Image from 'next/image'
import searchIcon from '../assets/icons/search.svg'
import { DropDown } from '@/features/DropDown'
import { useGetPublicDataQuery } from '@/features/CustomMap/api/getAreasApi'
import { useSearchCategory } from '@/i18n/useNativeLocale'

const MapClient = dynamic(() => import('@/features/CustomMap/ui/MapClient'), { ssr: false }) as any

// объект соответствия ключей и текстов

export function MapSearch() {
  const locales = useSearchCategory()
  const [search, setSearch] = useState('')
  const [categoryKey, setCategoryKey] = useState<string>('all') // ключ по умолчанию
  
  const CATEGORY_MAP: Record<string, string> = {
    all: locales.category.all,
    suggested: locales.category.suggested,
    problems: locales.category.problems,
    solved: locales.category.solved,
  }

  // Запрос данных с фильтром
  const { data, isLoading } = useGetPublicDataQuery({
    limit: 50,
    offset: 0,
    category: categoryKey === 'all' ? undefined : categoryKey, // всегда английский ключ
    search: search || undefined,
  })

  const filteredData = useMemo(() => data || [], [data])

  return (
    <section className={classes.mapSearch}>
      <h1 className={classes.mapSearch__title}>{locales.title}</h1>

      <div className={classes.mapSearch__search}>
        <Image
          src={searchIcon}
          alt="search"
          width={16}
          height={16}
          className={classes.mapSearch__search__icon}
        />
        <input
          type="text"
          placeholder={locales.input}
          className={classes.mapSearch__search__input}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <DropDown
          arr={Object.values(CATEGORY_MAP)} // показываем переводы
          onSelect={val => {
            // находим ключ по выбранному значению
            const key = Object.entries(CATEGORY_MAP).find(([text]) => text === val)?.[0] || 'all'
            setCategoryKey(key)
          }}
        />
      </div>

      {/* Карта */}
      <MapClient key={1} mapData={filteredData} isLoading={isLoading} />
    </section>
  )
}
