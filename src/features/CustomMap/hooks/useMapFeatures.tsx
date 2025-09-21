// src/hooks/useMapFeatures.ts
import { useEffect } from 'react'
import { Map, Marker } from 'maplibre-gl'

type MarkerConfig = {
  id: string
  coordinates: [number, number]
  element?: HTMLElement
  title?: string
  desc?: string
  color?: string
  onClick?: () => void
  onHover?: () => void
}

type PolygonConfig = {
  id: string
  coordinates: number[][][]
  fillColor?: string
  fillOpacity?: number
  onClick?: (lngLat: { lng: number; lat: number }) => void
  onHover?: () => void
}

type UseMapFeaturesProps = {
  map: Map | null
  markers?: MarkerConfig[]
  polygons?: PolygonConfig[]
}

export const useMapFeatures = ({
  map,
  markers = [],
  polygons = [],
}: UseMapFeaturesProps) => {
  useEffect(() => {
    if (!map) return

    let markerInstances: Marker[] = []

    const addFeatures = () => {
      // 🎯 Маркеры
      markerInstances = markers.map(m => {
        const marker = m.element
          ? new Marker({ element: m.element })
          : new Marker({ color: m.color || '#00951982' })

        marker.setLngLat(m.coordinates).addTo(map)

        if (m.onClick) {
          marker.getElement().addEventListener('click', m.onClick)
        }
        if (m.onHover) {
          marker.getElement().addEventListener('mouseenter', () => {
            m.onHover!()
            map.getCanvas().style.cursor = 'pointer'
          })
          marker.getElement().addEventListener('mouseleave', () => {
            map.getCanvas().style.cursor = ''
          })
        }

        return marker
      })

      // 🟦 Полигоны
      polygons.forEach(p => {
        if (!map.getSource(p.id)) {
          map.addSource(p.id, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: { type: 'Polygon', coordinates: p.coordinates },
              properties: {},
            },
          })

          map.addLayer({
            id: p.id,
            type: 'fill',
            source: p.id,
            paint: {
              'fill-color': p.fillColor || '#0000ff',
              'fill-opacity': p.fillOpacity ?? 0.3,
            },
          })

          map.on('mouseenter', p.id, () => {
            map.setPaintProperty(p.id, 'fill-opacity', 0.7)
            map.getCanvas().style.cursor = 'pointer'
            p.onHover?.()
          })
          map.on('mouseleave', p.id, () => {
            map.setPaintProperty(p.id, 'fill-opacity', p.fillOpacity ?? 0.3)
            map.getCanvas().style.cursor = ''
          })
        }

        if (p.onClick) {
          map.on('click', p.id, e => p.onClick!(e.lngLat))
        }
      })
    }

    // Ждём загрузки стиля
    if (!map.isStyleLoaded()) {
      map.once('style.load', addFeatures)
    } else {
      addFeatures()
    }

    // Cleanup: сначала удаляем фичи, потом карту
    return () => {
      // если карта уже удалена – сразу выходим
      if (!map || typeof map.getLayer !== 'function') return

      // удаляем маркеры
      markerInstances.forEach((m, i) => {
        const cfg = markers[i]
        if (cfg?.onClick) m.getElement().removeEventListener('click', cfg.onClick)
        if (cfg?.onHover) {
          m.getElement().removeEventListener('mouseenter', cfg.onHover)
          m.getElement().removeEventListener('mouseleave', () => {
            map.getCanvas().style.cursor = ''
          })
        }
        m.remove()
      })

      // удаляем слои/источники полигонов
      polygons.forEach(p => {
        if (map.getLayer(p.id))  map.removeLayer(p.id)
        if (map.getSource(p.id)) map.removeSource(p.id)
      })
    }
  }, [map, markers, polygons])
}
