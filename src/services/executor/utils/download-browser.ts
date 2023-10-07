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
  const hosts = [undefined, 'https://npm.taobao.org/mirrors']

  let fetcher = new BrowserFetcher({
    path: path,
    product: 'chrome',
  })

  if (!fetcher.localRevisions().includes(revision)) {
    await events?.startDownload?.()

    for (const host of hosts) {
      fetcher = new BrowserFetcher({
        path: path,
        product: 'chrome',
        host,
      })

      if (await fetcher.canDownload(revision)) {
        break
      } else {
        fetcher = undefined
      }
    }

    if (!fetcher) {
      await events?.endDownload?.(false, 'network error')
      return false
    }

    try {
      await fetcher.download(revision, events?.downloadProgress)
      await events?.endDownload?.(true)
      return true
    } catch (e) {
      await events?.endDownload?.(false, e.toString())
      return false
    }
  }
  return true
}
