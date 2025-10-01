import classes from './AddModal.module.scss'

export function Uploaded({ isUploaded }: { isUploaded: boolean }) {
  return (
    <div className={classes.uploaded}>
      <h1 className={classes.uploaded__title}>
        {isUploaded ? 'Отправлено на рассмотрение!' : 'Возникли проблемы!'}
      </h1>
      <p className={classes.uploaded__text}>
        {isUploaded
          ? 'Ваша идея будет рассмотрена в ближайшее время'
          : 'Просим сообщить о проблеме по номеру: +996 (700)000000'}
      </p>
      
      <div className={isUploaded ? classes.uploaded__icon__success : classes.uploaded__icon__reject}>
        <div className={isUploaded ? classes.uploaded__line__one : classes.uploaded__line__one__reject}></div>
        <div className={isUploaded ? classes.uploaded__line__two : classes.uploaded__line__two__reject}></div>
      </div>
    </div>
  )
}
