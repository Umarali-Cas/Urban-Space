/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import classes from './CustomMap.module.scss'
import { useMapFeatures } from '../hooks/useMapFeatures'
import { MapModal } from '@/entities/MapModal'

interface MapClientProps {
  mapData: any
}

interface MapData {
  id: string
  lat: number
  lng: number
  theme: string
  description: string
  image?: {
    url?: string
    alt?: string
  }
  polygon?: number[][]
}

export default function MapClient({ mapData }: MapClientProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [mapReady, setMapReady] = useState(false)
  // const { data: mapData, isLoading } = useGetPublicDataQuery({ limit: 20, offset: 0 })

  const [selectedData, setSelectedData] = useState<MapData | null>(null)

  const openModal = (data: MapData) => {
    setSelectedData(data)
  }

  const createCustomMarker = ({ bg, shadow }: { bg: string; shadow: string }) => {
    const markerEl = document.createElement('div')
    markerEl.style.width = '25px'
    markerEl.style.height = '25px'
    markerEl.style.borderRadius = '50%'
    markerEl.style.backgroundColor = bg
    markerEl.style.boxShadow = `0 0 0 4px ${shadow}`
    markerEl.style.cursor = 'pointer'
    markerEl.style.display = 'flex'
    markerEl.style.justifyContent = 'center'
    markerEl.style.alignItems = 'center'

    const img = document.createElement('img')
    img.src = '/map.svg'
    img.style.width = '60%'
    img.style.height = '60%'
    markerEl.appendChild(img)

    return markerEl
  }

  // строим массив маркеров и полигонов из API
  const markers = (mapData || []).map((item: MapData) => ({
    id: item.id,
    coordinates: [item.lng, item.lat] as [number, number],
    element: createCustomMarker({ bg: '#078800ff', shadow: '#00951982' }),
    onClick: () =>
      openModal({
        ...item,
      }),
  }))

const polygons = (mapData || [])
  .filter((item: { polygon: string | any[] }) => Array.isArray(item.polygon) && item.polygon.length > 2)
  .map((item: MapData) => {
    const coords = item.polygon ? item.polygon.map((p: number[]) => [p[1], p[0]]) : [];

    // замыкаем контур (последняя точка = первая)
    if (coords.length > 0) {
      const first = coords[0]
      const last = coords[coords.length - 1]
      if (first[0] !== last[0] || first[1] !== last[1]) {
        coords.push(first)
      }
    }


    return {
      id: `polygon-${item.id}`,
      coordinates: [coords], // строго [[ [lng,lat], ... ]]
      fillColor: '#ff0000',
      fillOpacity: 0.4,
      onClick: (lngLat: { lat: number; lng: number }) =>
        openModal({
          ...item,
          lat: lngLat.lat,
          lng: lngLat.lng,
        }),
    }
  })
  // подключаем в хук
  useMapFeatures({
    map: mapReady ? mapRef.current : null,
    markers,
    polygons,
  })

  useEffect(() => {
    if (!mapContainerRef.current) return

    const isMobile = window.innerWidth < 768
    const initialZoom = isMobile ? 4.7 : 5.7

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        'https://api.maptiler.com/maps/0199685b-a8f6-7754-9745-0ddb7e67df92/style.json?key=YRJ9dctyMJuyJh43IZUs',
      center: [74.61934986021016, 41.47522939797829],
      zoom: initialZoom,
      attributionControl: false,
    })

    mapRef.current = map
    map.addControl(new maplibregl.NavigationControl(), 'top-right')

    map.on('load', () => {
      setMapReady(true)
    })

    return () => {
      map.remove()
    }
  }, [])


  return (
    <>
      <div ref={mapContainerRef} className={classes.mapContainer} />
      {selectedData && (
        <MapModal mapData={selectedData} onClose={() => setSelectedData(null)} />
      )}
    </>
  )
}
