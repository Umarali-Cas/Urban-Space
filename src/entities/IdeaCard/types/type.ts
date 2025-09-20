import { StaticImageData } from 'next/image'

export interface IdeaCardProps {
    title: string
    subtitle: string
    userName: string
    date: string
    likes: number
    link: string
    imageUrl?: string | StaticImageData
    avatarUrl?: string | StaticImageData
    uniqueId: number | string
    slug: string
    status: string
    onSelect?: () => void
  }