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
import { useCrowdsourcingData, useSelectFile } from '@/i18n/useNativeLocale'
import { useCreateCrowdsourceMutation } from '../api/CrowdsourceApi'

const DEFAULT_CENTER: [number, number] = [74.61934986021016, 41.47522939797829]

type LocationPickerProps = {
  onSelect: (lat: number, lng: number) => void
  selected: { lat: number; lng: number } | null
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
    map.on('click', e => {
      onSelect(e.lngLat.lat, e.lngLat.lng)
    })
    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
      markerRef.current = null
    }
  }, [onSelect])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (!selected) {
      markerRef.current?.remove()
      markerRef.current = null
      return
    }

    const { lat, lng } = selected

    if (markerRef.current) {
      markerRef.current.setLngLat([lng, lat])
    } else {
      const opts = createMarkerElement ? { element: createMarkerElement() } : { color: '#ff0000' }
      markerRef.current = new maplibregl.Marker(opts).setLngLat([lng, lat]).addTo(map)
    }
  }, [selected, createMarkerElement])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: `${height}px`,
        marginTop: '8px',
        borderRadius: '8px',
      }}
    />
  )
}

export function IdeaForm({ formData }: { formData: any }) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('city') // используем валидную категорию
  const [createCrowdsource] = useCreateCrowdsourceMutation()
  const value = useCrowdsourcingData()
  const fileNameLocale = useSelectFile()

  const handleSelect = useCallback((lat: number, lng: number) => {
    setCoords({ lat, lng })
  }, [])

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
    const img = document.createElement('img')
    img.src = '/map.svg'
    img.style.width = '60%'
    img.style.height = '60%'
    markerEl.appendChild(img)
    return markerEl
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null)
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const form = e.currentTarget as HTMLFormElement
  const fd = new FormData(form)

  // Создаём FormData для отправки на сервер
  const formDataObj = new FormData()
  formDataObj.append('theme', fd.get('theme') as string)
  formDataObj.append('description', fd.get('description') as string)
  formDataObj.append('category', category)
  formDataObj.append('tags', (fd.get('tags') as string) || '')
  formDataObj.append('lat', (coords?.lat || 0).toString())
  formDataObj.append('lng', (coords?.lng || 0).toString())

  if (file) {
    formDataObj.append('file', file) // теперь отправляем реальный файл
  }

  try {
    const plainFormData = Object.fromEntries(formDataObj.entries()) as any;
    // Предполагается, что createCrowdsource умеет работать с FormData
    const res = await createCrowdsource(plainFormData).unwrap()
    console.log('✅ Создано:', res)

    // Сброс формы
    form.reset()
    setCoords(null)
    setFile(null)
    setPreview(null)
    setCategory('city')
  } catch (err) {
    console.error('❌ Ошибка при отправке:', err)
  }
}
  return (
    <form className={classes.ideaForm} onSubmit={handleSubmit}>
      <h2 className={classes.ideaForm__title}>{formData.title}</h2>

      <label>
        {formData.them.label}
        <input type="text" name="theme" maxLength={100} placeholder={formData.them.placeholder} required />
      </label>

      <label>
        {formData.description.label}
        <input type="text" name="description" placeholder={formData.description.placeholder} required />
      </label>

      <label>
        {formData.location.label}
        <LocationPicker
          onSelect={handleSelect}
          selected={coords}
          createMarkerElement={createMarkerElement}
          height={250}
        />
        {coords && <small>{typeof value === 'string' ? value : value.label}: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</small>}
      </label>

<label className={classes.ideaForm__categoryLabel}>
  Категория
  <div className={classes.categoryGroup} role="radiogroup" aria-label="Категория идеи">
    {['suggested', 'problems', 'solved'].map(key => (
      <button
        key={key}
        type="button"
        role="radio"
        aria-checked={category === key}
        className={`${classes.categoryItem} ${category === key ? classes.categoryItemActive : ''}`}
        onClick={() => setCategory(key)}
      >
        {key}
      </button>
    ))}
  </div>
  {/* скрытое поле чтобы FormData получало текущую категорию */
  /* при отправке вы уже берёте category из state, но поле полезно для прямого чтения формы */ }
  <input type="hidden" name="category" value={category} />
</label>

      <label className={classes.ideaForm__fileInput}>
        {fileNameLocale}
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
              <Image src={profilePic} alt="profile picture" width={32} height={32} />
              <span>{fileNameLocale}</span>
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
