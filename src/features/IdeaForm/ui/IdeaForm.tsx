'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet'
import { DivIcon } from 'leaflet'
import classes from './IdeaForm.module.scss'
import profilePic from '../assets/user-icon.svg'
import { DropDown } from '@/features/DropDown'

const defaultIcon = new DivIcon({
  className: classes.customIcon,
  iconSize: [25, 25],
  iconAnchor: [12, 41],
})

function LocationPicker({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void
}) {
  const [position, setPosition] = useState<[number, number] | null>(null)

  useMapEvents({
    click(e) {
      const coords: [number, number] = [e.latlng.lat, e.latlng.lng]
      setPosition(coords)
      onSelect(coords[0], coords[1])
    },
  })

  return position ? <Marker position={position} icon={defaultIcon} /> : null
}

export function IdeaForm() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  )
  const [preview, setPreview] = useState<string | null>(null) // для превью фото
  const [category, setCategory] = useState<string>('Проблемы')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    if (coords) {
      formData.append('lat', coords.lat.toString())
      formData.append('lng', coords.lng.toString())
    }
    formData.append('category', category) // добавляем категорию

    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      if (key === 'image' && value instanceof File) {
        data[key] = value.name
      } else {
        data[key] = String(value)
      }
    })

    console.log('Отправленные данные:', data)

    // сброс
    form.reset()
    setCoords(null)
    setPreview(null)
    setCategory('Проблемы') // сброс категории
  }

  function ResizeHandler() {
    const map = useMap()

    useEffect(() => {
      map.invalidateSize()
    }, [map])

    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  return (
    <form className={classes.ideaForm} onSubmit={handleSubmit}>
      <h2 className={classes.ideaForm__title}>Описание</h2>

      <label>
        Тема
        <input
          type="text"
          name="theme"
          maxLength={100}
          placeholder="Тема (название инициативы, макс. 100 символов)"
          required
        />
      </label>

      <label>
        Описание
        <input type="text" name="description" placeholder="Описание" required />
      </label>

      <label>
        Локация
        <span>Укажите локацию (нажмите на карте)</span>
        <div style={{ height: '250px', width: '100%', marginTop: '8px' }}>
          <MapContainer
            center={[41.47522939797829, 74.61934986021016]}
            zoom={6}
            style={{ height: '100%', width: '100%', borderRadius: '12px' }}
            attributionControl={false}
          >
            <ResizeHandler />
            <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
            <LocationPicker onSelect={(lat, lng) => setCoords({ lat, lng })} />
          </MapContainer>
        </div>
        {coords && (
          <small>
            Выбрано: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
          </small>
        )}
      </label>

      <label>
        Категория
        <DropDown
          button={classes.dropDown__button}
          arr={['Проблемы', 'Предложения', 'Реализованные проекты']}
          onSelect={val => setCategory(String(val))}
          className={classes.dropDown}
          visibleArrow={true}
        />
        <input type="hidden" name="category" value={category} />
      </label>

      <label className={classes.ideaForm__fileInput}>
        Фото профиля
        <div
          className={classes.ideaForm__fileInput__container}
          style={{
            backgroundImage: preview ? `url(${preview})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            height: `${!preview ? '88px' : '400px'}`,
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
              <span>Прикрепите фото профиля</span>
            </div>
          )}
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
      </label>

      <label>
        Теги #
        <input type="text" name="tags" placeholder="#" />
      </label>

      <button type="submit">Отправить</button>
    </form>
  )
}
