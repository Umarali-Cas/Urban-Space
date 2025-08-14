import Image from 'next/image'
import classes from './EcoBaner.module.scss'
import ecoHand from '../assets/icons/ecology hand.svg'

export function EcoBaner() {
  return (
    <section className={classes.ecoBaner}>
      <Image src={ecoHand} alt="eco-hand" className={classes.ecoBaner__hand} width={121} height={158}/>
      <h2 className={classes.ecoBaner__title}>Город будущего <br /> начинается здесь!</h2>
      <span className={classes.ecoBaner__line}></span>
      <p className={classes.ecoBaner__text}>
        Присоединяйтесь к сообществу активных граждан, которые создают лучшие
        городские пространства. Делитесь идеями, участвуйте в проектах, влияйте
        на развитие вашего города.
      </p>
    </section>
  )
}
