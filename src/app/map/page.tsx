import CustomMap from "@/features/CustomMap/ui/CustomMap";
import classes from './MapPage.module.scss'

export default function Map() {
  return (
    <section className={classes.map}>
      <CustomMap />
    </section>
  )
}
