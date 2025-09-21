/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactElement,
} from 'react'
import Image from 'next/image'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import classes from './IdeaForm.module.scss'
import profilePic from '../assets/user-icon.svg'
import { DropDown } from '@/features/DropDown'
import { useCrowdsourcingData } from '@/i18n/useNativeLocale'

/** Стабильный дефолт для центра карты */
const DEFAULT_CENTER: [number, number] = [74.61934986021016, 41.47522939797829]

/** Пропсы для LocationPicker */
type LocationPickerProps = {
  onSelect: (lat: number, lng: number) => void
  selected: { lat: number; lng: number } | null
  /** при желании можно переопределить центр */
  initialCenter?: [number, number]
  height?: number
  createMarkerElement?: () => HTMLElement
}

function LocationPicker({
  onSelect,
  selected,
  initialCenter = DEFAULT_CENTER,
  height = 250,
  createMarkerElement,
}: LocationPickerProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markerRef = useRef<maplibregl.Marker | null>(null)

  // 1) инициализация карты — один раз
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style:
        'https://api.maptiler.com/maps/0199685b-a8f6-7754-9745-0ddb7e67df92/style.json?key=YRJ9dctyMJuyJh43IZUs',
      center: initialCenter,
      zoom: 5,
      attributionControl: false,
    })

    map.on('click', (e) => {
      onSelect(e.lngLat.lat, e.lngLat.lng)
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markerRef.current = null
    }
  }, [onSelect])

  // 2) прорисовка/движение маркера при изменении selected
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // сброс маркера
    if (!selected) {
      markerRef.current?.remove()
      markerRef.current = null
      return
    }

    const { lat, lng } = selected

    if (markerRef.current) {
      markerRef.current.setLngLat([lng, lat])
    } else {
      const opts = createMarkerElement
        ? { element: createMarkerElement() }
        : { color: '#ff0000' }
      markerRef.current = new maplibregl.Marker(opts)
        .setLngLat([lng, lat])
        .addTo(map)
    }
  }, [selected, createMarkerElement])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: `${height}px`, marginTop: '8px', borderRadius: '8px' }}
    />
  )
}

/** Форма идеи с выбором локации */
export function IdeaForm({ formData }: { formData: any }) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  )
  const [file, setFile] = useState<File | null>(null)

  const [preview, setPreview] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('Проблемы')

  // стабильный колбэк на выбор локации
  const handleSelect = useCallback((lat: number, lng: number) => {
    setCoords({ lat, lng })
  }, [])

  // фабрика вашего кастомного маркера
  const createMarkerElement = useCallback(() => {
    const markerEl = document.createElement('div')
    markerEl.style.width = '25px'
    markerEl.style.height = '25px'
    markerEl.style.borderRadius = '50%'
    markerEl.style.backgroundColor = '#666666'
    markerEl.style.boxShadow = `0 0 0 4px #66666682`
    markerEl.style.display = 'flex'
    markerEl.style.justifyContent = 'center'
    markerEl.style.alignItems = 'center'
    markerEl.style.cursor = 'pointer'

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
  }, [])

  // превью файла
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0] || null
  setFile(selectedFile)
  setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null)
}

  // сабмит формы
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  const form = e.currentTarget as HTMLFormElement
  const fd = new FormData(form)

  if (coords) {
    fd.append('lat', coords.lat.toString())
    fd.append('lng', coords.lng.toString())
  }
  fd.append('category', category)

  // выводим все поля
  const data: Record<string, any> = {}
  fd.forEach((value, key) => {
    if (value instanceof File) {
      data[key] = {
        name: value.name,
        size: value.size,
        type: value.type,
        file: value, // сам объект File
      }
    } else {
      data[key] = value
    }
  })

  console.log('📦 Собранные данные формы:', data)

  // очистка формы (опционально)
  form.reset()
  setCoords(null)
  setFile(null)
  setPreview(null)
  setCategory('Проблемы')
}
  const value = useCrowdsourcingData()
  const categoryNames = Object.values(formData.category.categories)

  return (
    <form className={classes.ideaForm} onSubmit={handleSubmit}>
      <h2 className={classes.ideaForm__title}>{formData.title}</h2>

      <label>
        {formData.them.label}
        <input
          type="text"
          name="theme"
          maxLength={100}
          placeholder={formData.them.placeholder}
          required
        />
      </label>

      <label>
        {formData.description.label}
        <input
          type="text"
          name="description"
          placeholder={formData.description.placeholder}
          required
        />
      </label>

      <label>
        {formData.location.label}
        <LocationPicker
          onSelect={handleSelect}
          selected={coords}
          createMarkerElement={createMarkerElement}
          height={250}
        />
        {coords && (
          <small>
            {typeof value === 'string' ? value : value.label}: {' '}
            {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
          </small>
        )}
      </label>

      <label>
        {formData.category.label}
        </label>
        <DropDown
          button={classes.dropDown__button}
          arr={categoryNames as string[]}
          onSelect={(v) => setCategory(String(v))}
          className={classes.dropDown}
          visibleArrow
        />
        <input type="hidden" name="category" value={category} />

      <label className={classes.ideaForm__fileInput}>
        {typeof value === 'string' ? value : value.pic}
        <div
          className={classes.ideaForm__fileInput__container}
          style={{
            backgroundImage: preview ? `url(${preview})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            height: preview ? '400px' : '88px',
          }}
        >
          {!preview && (
            <div className={classes.ideaForm__fileInput__image}>
              <Image
                src={profilePic}
                alt="profile picture"
                width={32}
                height={32}
              />
              <span>{formData.photo.label}</span>
            </div>
          )}
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
      </label>

      <label>
        {formData.tags.label} {'#'}
        <input type="text" name="tags" placeholder="#" />
      </label>

      <button type="submit">{formData.button.title}</button>
    </form>
  )
}
