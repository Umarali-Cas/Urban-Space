export function getImageIdea(userId?: string, fileKey?: string): string | undefined {
  if (!userId || !fileKey) return undefined

  return `https://urbanspaceblob.blob.core.windows.net/storage/${fileKey}`
}