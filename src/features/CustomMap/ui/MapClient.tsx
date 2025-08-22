'use client'

import { MapContainer, TileLayer, Marker, Popup, Polygon, } from 'react-leaflet'
import L from 'leaflet'
import classes from './CustomMap.module.scss'

const customIcon = new L.Icon({
  iconUrl: '#',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  className: classes.customIcon,
})

export default function MapClient() {
  const polygon: [number, number][] = [
    [51.51, -0.1],
    [51.5, -0.12],
    [51.52, -0.12],
  ]

  return (
    <MapContainer
      center={[41.70897127858807, 74.2605769924793]}
      zoom={7}
      zoomControl={false}
      wheelPxPerZoomLevel={10}
      scrollWheelZoom={true}
      zoomAnimation={true}
      zoomAnimationThreshold={2}
      className={classes.mapContainer}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />

      <Marker position={[42.873201129230864, 74.59199229658574]} icon={customIcon}>
        <Popup>Наш офис</Popup>
      </Marker>

      <Polygon
        positions={polygon}
        pathOptions={{
          color: 'blue',
          fillColor: 'lightblue',
          fillOpacity: 0.3,
        }}
      />

    </MapContainer>
  )
}
