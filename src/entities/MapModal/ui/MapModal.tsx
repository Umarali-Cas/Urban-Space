/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, AnimatePresence } from 'framer-motion'
import classes from './MapModal.module.scss'
import Image from 'next/image'

export function MapModal({
  mapData,
  onClose,
}: {
  mapData: any
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {mapData && (
        <motion.div
          className={classes.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className={classes.overlay__mapModal}
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <button
              type="button"
              className={classes.overlay__mapModal__closeButton}
              onClick={onClose}
            >
              ×
            </button>

            <h1 className={classes.overlay__mapModal__title}>
              {mapData.title}
            </h1>

            {mapData.imageUrl && (
              <Image
                className={classes.overlay__mapModal__image}
                src={mapData.imageUrl}
                alt="map"
                width={300}
                height={200}
              />
            )}
            <p>{mapData.desc}</p>

            <div className={classes.content}>
              <p>Широта: {mapData.lat}</p>
              <p>Долгота: {mapData.lng}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
