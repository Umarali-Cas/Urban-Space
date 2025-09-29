'use client'

import React, { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import classes from './CustomMap.module.scss'
import { useMapFeatures } from '../hooks/useMapFeatures'
import { MapModal } from '@/entities/MapModal'

interface MapData {
  id: string
  lat: number
  lng: number
  title: string
  desc: string
  imageUrl?: string
}

export default function MapClient() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [mapReady, setMapReady] = useState(false)

  const [selectedData, setSelectedData] = useState<MapData | null>(null)

  const openModal = (data: MapData) => {
    setSelectedData(data)
  }

  const createCustomMarker = ({
    bg,
    shadow,
  }: {
    bg: string
    shadow: string
  }) => {
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

    markerEl.addEventListener('mouseenter', () => {
      markerEl.style.filter = 'brightness(0.9)'
    })
    markerEl.addEventListener('mouseleave', () => {
      markerEl.style.filter = 'brightness(1)'
    })

    const img = document.createElement('img')
    img.src = '/map.svg'
    img.style.width = '60%'
    img.style.height = '60%'
    markerEl.appendChild(img)

    return markerEl
  }

  // Подключаем маркеры / полигоны
  useMapFeatures({
    map: mapReady ? mapRef.current : null,
    markers: [
      {
        id: 'marker-1',
        coordinates: [74.62199857668969, 42.879476414488146],
        element: createCustomMarker({ bg: '#078800ff', shadow: '#00951982' }),
        onClick: () =>
          openModal({
            id: 'marker-1',
            title: 'Первый маркер',
            desc: 'Описание первого маркера',
            imageUrl: '/grey.jpg',
            lat: 42.879476414488146,
            lng: 74.62199857668969,
          }),
      },
      {
        id: 'marker-2',
        coordinates: [76.1876395059962, 42.21732119352707],
        element: createCustomMarker({ bg: '#ff0000ea', shadow: '#b0000082' }),
        onClick: () =>
          openModal({
            id: 'marker-2',
            title: 'Второй маркер',
            desc: 'Дополнительный текст',
            lat: 42.21732119352707,
            lng: 76.1876395059962,
          }),
      },
    ],
    polygons: [
      {
        id: 'polygon-1',
        coordinates: [
          [
            [74.5, 41.4],
            [74.7, 41.4],
            [74.7, 41.6],
            [74.5, 41.6],
            [74.5, 41.4],
          ],
        ],
        fillColor: '#ff0000',
        fillOpacity: 0.4,
        onClick: lngLat =>
          openModal({
            id: 'polygon-1',
            title: 'Полигон 1',
            desc: 'Описание полигона 1',
            imageUrl: '/grey.jpg',
            lat: lngLat.lat,
            lng: lngLat.lng,
          }),
      },
      {
        id: 'polygon-2',
        coordinates: [
          [
            [72.9813279943824, 41.69988911045577],
            [73.89766034531843, 41.62225603819054],
            [73.13247559866049, 41.054838805503444],
            [72.9813279943824, 41.69988911045577],
          ],
        ],
        fillColor: '#078800',
        fillOpacity: 0.4,
        onClick: lngLat =>
          openModal({
            id: 'polygon-2',
            title: 'Полигон 2',
            desc: 'Описание полигона 2',
            lat: lngLat.lat,
            lng: lngLat.lng,
          }),
      },
    ],
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

      // Добавляем слой границы Кыргызстана
      map.addLayer(
        {
          id: 'kyrgyzstan-border',
          type: 'line',
          source: 'openmaptiles',            // возможно имя другое — проверь в style.json
          'source-layer': 'boundary',        // возможно другое имя слоя
          paint: {
            'line-color': '#ff0000',
            'line-width': 3,
          },
          filter: [
            'all',
            ['==', 'admin_level', 2],         // границы стран
            ['==', 'iso_a2', 'KG'],            // код Кыргызстана
          ],
        },
        // вставляем перед слоем с лейблами, чтобы граница была видна
        findLabelLayerId(map) // функция, определяющая правильный слой перед которым вставить
      )
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

// вспомогательная функция: находит первый слой с текстом/символами, перед которым можно вставлять
function findLabelLayerId(map: maplibregl.Map): string | undefined {
  const layers = map.getStyle().layers
  if (!layers) return undefined
  for (const layer of layers) {
    if (layer.type === 'symbol' && layer.layout && (layer.layout['text-field'] || layer.layout['icon-image'])) {
      return layer.id
    }
  }
  return undefined
}
