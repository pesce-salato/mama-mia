import { BrowserFetcher } from 'puppeteer-core'
/**
 *
 * @param path browser file save path
 * @param revision search from https://github.com/puppeteer/puppeteer/releases?q=Chromium&expanded=true (r{revision})
 * @param events
 */
export const downloadBrowser = async (
  path: string,
  revision: string,
  events?: {
    startDownload?: () => void | Promise<void>
    downloadProgress?: (now: number, total: number) => void
    endDownload?: (succeed: boolean, message?: string) => void | Promise<void>
  }
) => {
  const fetcher = new BrowserFetcher({
    path: path,
    product: 'chrome',
  })

  if (!fetcher.localRevisions().includes(revision)) {
    await events?.startDownload?.()
    try {
      await fetcher.download(revision, events?.downloadProgress)
      await events?.endDownload?.(true)
      return true
    } catch (e) {
      console.error(e)
      await events?.endDownload?.(false, e.toString())
      return false
    }
  }
  return true
}
