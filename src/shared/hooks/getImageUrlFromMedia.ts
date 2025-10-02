/* eslint-disable @typescript-eslint/no-explicit-any */
export function getImageUrlFromMedia(media: any[] = []): string | undefined {
  const imageFile = media.find(file => file.mime?.startsWith('image/'))
  if (!imageFile?.file_key) return undefined

return imageFile?.file_key
  ? `https://urbanspaceblob.blob.core.windows.net/storage/${imageFile.file_key}`
  : '/grey.jpg'
}
