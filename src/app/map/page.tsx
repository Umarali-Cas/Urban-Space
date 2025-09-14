import { MapSearch } from '@/widgets/MapSearch'
import classes from './MapPage.module.scss'

export default function Map() {
  return (
    <section className={classes.map}>
      <MapSearch />
    </section>
  )
}
