import dynamic from 'next/dynamic'
import classes from './MapSearch.module.scss'
import Image from 'next/image'
import search from '../assets/icons/search.svg'

const CustomMap = dynamic(() => import('@/features/CustomMap/ui/CustomMap'))

export function MapSearch() {
  return (
    <section className={classes.mapSearch}>
      <h1 className={classes.mapSearch__title}>Эко-карта</h1>
      <div className={classes.mapSearch__search}>
        <Image src={search} alt='search' width={16} height={16} className={classes.mapSearch__search__icon}/>
        <input
          type="text"
          placeholder="Поиск"
          className={classes.mapSearch__search__input}
        />
      </div>
      <CustomMap />
    </section>
  )
}
