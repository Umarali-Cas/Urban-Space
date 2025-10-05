// src/hooks/useMapFeatures.ts
import { useEffect } from 'react'
import { Map, Marker, LngLatLike } from 'maplibre-gl'

type MarkerConfig = {
  id: string
  coordinates: [number, number] // [lng, lat]
  element?: HTMLElement
  title?: string
  desc?: string
  color?: string
  onClick?: () => void
  onHover?: () => void
}

type PolygonConfig = {
  id: string
  coordinates: number[][][] // [[[lng,lat], ...]]
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

    const markerInstances: Marker[] = []

    const addFeatures = () => {
      // === Маркеры ===
      markers.forEach(m => {
        const marker = m.element
          ? new Marker({ element: m.element })
          : new Marker({ color: m.color || '#00951982' })

        marker.setLngLat(m.coordinates as LngLatLike).addTo(map)

        if (m.onClick) {
          marker.getElement().addEventListener('click', m.onClick)
        }
        if (m.onHover) {
          const enter = () => {
            m.onHover?.()
            map.getCanvas().style.cursor = 'pointer'
          }
          const leave = () => {
            map.getCanvas().style.cursor = ''
          }
          marker.getElement().addEventListener('mouseenter', enter)
          marker.getElement().addEventListener('mouseleave', leave)
        }

        markerInstances.push(marker)
      })

      // === Полигоны ===
      polygons.forEach(p => {
  const geojson = {
    type: 'Feature' as const,
    geometry: { type: 'Polygon' as const, coordinates: p.coordinates }, // используем напрямую
    properties: {},
  }

  if (!map.getSource(p.id)) {
    map.addSource(p.id, { type: 'geojson', data: geojson })

    // fill (должен быть выше stroke, чтобы клики работали)
    map.addLayer({
      id: p.id,
      type: 'fill',
      source: p.id,
      paint: {
        'fill-color': p.fillColor || '#0000ff',
        'fill-opacity': p.fillOpacity ?? 0.3,
      },
    })

    // stroke
    map.addLayer({
      id: `${p.id}-stroke`,
      type: 'line',
      source: p.id,
      paint: {
        'line-color': '#6d6d6dff',
        'line-width': 2,
      },
    })
  }

  // hover
  if (p.onHover) {
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

  // click
  if (p.onClick) {
    map.on('click', p.id, e => {
      // убедимся, что features существуют
      if (e.features && e.features.length) {
        p.onClick!(e.lngLat)
      }
    })
  }
})
    }

    if (!map.isStyleLoaded()) {
      map.once('style.load', addFeatures)
    } else {
      addFeatures()
    }

    // === Очистка ===
    return () => {
      if (!map || typeof map.getLayer !== 'function') return

      markerInstances.forEach((m, i) => {
        const cfg = markers[i]
        if (cfg?.onClick) {
          m.getElement().removeEventListener('click', cfg.onClick)
        }
        m.remove()
      })

      polygons.forEach(p => {
        if (map.getLayer(p.id)) map.removeLayer(p.id)
        if (map.getLayer(`${p.id}-stroke`)) map.removeLayer(`${p.id}-stroke`)
        if (map.getSource(p.id)) map.removeSource(p.id)
      })
    }
  }, [map, markers, polygons])
}
