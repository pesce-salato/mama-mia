export const getDomain = (url: string) => {
  return new URL(url).hostname.replace(/^[^.]+\./g, '').trim()
}
