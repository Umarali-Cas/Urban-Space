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
import { useGetMapQuery } from '../api/mapApi'
import { useGetAreasQuery } from '../api/getAreasApi'

const createSvgIcon = (iconUrl: string): L.Icon => {
  return new L.Icon({
    iconUrl: iconUrl,
    iconSize: [28, 28],
    iconAnchor: [16, 32],
    className: classes.customIcon,
  })
}

export default function MapClient() {
  const { data: places = [] } = useGetMapQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: areas = [] } = useGetAreasQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  })
  console.log('areas:', areas)
  console.log('places:', places)

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
      <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

      {places.map((marker, index) => (
        <React.Fragment key={`marker-${index}`}>
          <CircleMarker
            key={`circle-${index}`}
            center={marker.pos}
            radius={18}
            pathOptions={{
              color: marker.border_Color,
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
          </Marker>
        </React.Fragment>
      ))}
      {areas &&
        areas.map((polygon, index) => (
          <Polygon
            key={`polygon-${index}`}
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
          />
        ))}
    </MapContainer>
  )
}
