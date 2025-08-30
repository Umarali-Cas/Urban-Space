'use client'

import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  CircleMarker,
} from 'react-leaflet'
import L from 'leaflet'
import classes from './CustomMap.module.scss'
import mapIcon from '../assets/icons/map.svg'
import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'

interface MarkerType {
  pos: [number, number]
  color: string
  borderColor: string
  title: string
}

interface PolygonOptions {
  coordinates: [number, number][]
  color: string
  fillColor: string
  title: string
}

const createSvgIcon = (iconUrl: string): L.Icon => {
  return new L.Icon({
    iconUrl: iconUrl,
    iconSize: [28, 28],
    iconAnchor: [16, 32],
    className: classes.customIcon,
  })
}

const markers: MarkerType[] = [
  {
    pos: [42.8732, 74.592],
    color: '#008F00',
    borderColor: '#008F0030',
    title: 'Marker 1',
  },
  {
    pos: [41.7089, 74.2605],
    color: '#008F00',
    borderColor: '#008F0030',
    title: 'Marker 2',
  },
  {
    pos: [42.1564, 73.5391],
    color: '#008F00',
    borderColor: '#008F0030',
    title: 'Marker 3',
  },
]

export default function MapClient() {
  const polygon: PolygonOptions = {
    coordinates: [
      [42.568843104315015, 75.70855521992907],
      [42.4247905090785, 76.20273836210214],
      [42.27200967979303, 76.03844333847104],
      [42.23787704915985, 75.67982364189575],
      [42.487449667496286, 75.59981958109763],
    ],
    color: 'green',
    fillColor: 'lightgreen',
    title: 'Зеленая Зона',
  }

  function ResizeHandler() {
    const map = useMap()

    useEffect(() => {
      map.invalidateSize()
    }, [map])

    return null
  }

  return (
    <MapContainer
      center={[41.47522939797829, 74.61934986021016]}
      zoom={7}
      className={classes.mapContainer}
      attributionControl={false}
    >
      <ResizeHandler />
      <TileLayer url="http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

      {markers.map((marker, index) => (
        <React.Fragment key={`marker-${index}`}>
          <CircleMarker
            key={`circle-${index}`}
            center={marker.pos}
            radius={18}
            pathOptions={{
              color: marker.borderColor,
              fillColor: marker.color,
              fillOpacity: 1,
              weight: 15,
            }}
            className={classes.customCircle}
          />

          <Marker
            key={`icon-${index}`}
            position={marker.pos}
            icon={createSvgIcon(mapIcon.src)}
            eventHandlers={{
              click: () => {
                alert(marker.title)
              },
            }}
          >
            {/* <Popup key={`popup-${index}`}>{marker.title}</Popup> */}
          </Marker>
        </React.Fragment>
      ))}

      <Polygon
        className={classes.customPolygon}
        positions={polygon.coordinates}
        pathOptions={{
          color: polygon.color,
          fillColor: polygon.fillColor,
          fillOpacity: 0.3,
        }}
        eventHandlers={{
          click: () => {
            alert(polygon.title)
          },
        }}
      >
      </Polygon>
    </MapContainer>
  )
}
