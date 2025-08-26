'use client'

import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import L from 'leaflet'
import classes from './CustomMap.module.scss'
import mapIcon from '../assets/icons/map.svg'

type MarkerType = {
  pos: [number, number] // кортеж, а не просто number[]
  icon: L.Icon
  title: string
}

const customIcon = new L.Icon({
  iconUrl: mapIcon.src,
  iconSize: [34, 34],
  iconAnchor: [16, 32],
  className: classes.customIcon,
})

const markers: MarkerType[] = [
  {
    pos: [42.873201129230864, 74.59199229658574],
    icon: customIcon,
    title: 'Marker 1',
  },
  {
    pos: [41.70897127858807, 74.2605769924793],
    icon: customIcon,
    title: 'Marker 2',
  },
  {
    pos: [42.156467541888325, 73.53919465184207],
    icon: customIcon,
    title: 'Marker 3',
  },
  {
    pos: [40.623491193158934, 73.74878505063303],
    icon: customIcon,
    title: 'Marker 4',
  },
  {
    pos: [42.17588611870231, 76.45599436834964],
    icon: customIcon,
    title: 'Marker 5',
  },
]

export default function MapClient() {
  const polygon: [number, number][] = [
    [42.568843104315015, 75.70855521992907],
    [42.4247905090785, 76.20273836210214],
    [42.27200967979303, 76.03844333847104],
    [42.23787704915985, 75.67982364189575],
    [42.487449667496286, 75.59981958109763],
  ]

  return (
    <MapContainer
      center={[41.47522939797829, 74.61934986021016]}
      zoom={6}
      zoomControl={true} // Отключаем стандартные кнопки
      scrollWheelZoom={true}
      wheelPxPerZoomLevel={320} // Увеличьте значение для более плавного зума
      zoomAnimation={true}
      zoomAnimationThreshold={1} // Уменьшите порог для более частой анимации
      fadeAnimation={true} // Добавьте fade анимацию
      markerZoomAnimation={true} // Анимация маркеров
      className={classes.mapContainer}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'

        // url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        // attribution="© <a href='https://www.stadiamaps.com/' target='_blank'>Stadia Maps</a> © <a href='https://openmaptiles.org/' target='_blank'>OpenMapTiles</a> © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"

        //--------------------------------------

        // url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=ru"
        // attribution="&copy; <a href='https://wikimediafoundation.org/'>Wikimedia</a> contributors"

        // url="/api/tile?z={z}&x={x}&y={y}"
        // attribution="&copy; <a href='https://wikimediafoundation.org/'>Wikimedia</a> contributors"
      />

      {markers.map((marker, index) => (
        <Marker key={index} position={marker.pos} icon={marker.icon}>
          <Popup>{marker.title}</Popup>
        </Marker>
      ))}

      <Polygon
        positions={polygon}
        className={classes.mapContainer__polygon}
        pathOptions={{
          color: 'green',
          fillColor: 'lightgreen',
          fillOpacity: 0.3,
        }}>
        <Popup>Зеленая Зона</Popup>
      </Polygon>
    </MapContainer>
  )
}
