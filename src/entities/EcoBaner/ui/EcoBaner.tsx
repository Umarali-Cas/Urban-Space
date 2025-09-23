import Image from 'next/image'
import classes from './EcoBaner.module.scss'
import ecoHand from '../assets/icons/ecology hand.svg'

export function EcoBaner({ title, desc }: { title: string; desc: string }) {
  return (
    <section className={classes.ecoBaner}>
      <Image
        src={ecoHand}
        alt="eco-hand"
        className={classes.ecoBaner__hand}
        width={121}
        height={158}
      />
      <h2 className={classes.ecoBaner__title}>{title}</h2>
      <span className={classes.ecoBaner__line}></span>
      <p className={classes.ecoBaner__text}>{desc}</p>
    </section>
  )
}
