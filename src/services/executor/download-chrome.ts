import { BrowserFetcher } from 'puppeteer-core'
import { io } from '@/services/io'

export const downloadChrome = async (path: string, revision: string) => {
  const fetcher = new BrowserFetcher({
    path: path,
    product: 'chrome',
  })

  console.error(fetcher.localRevisions())

  await fetcher.download(revision, (x, y) => {
    console.log(x, y)
  })

  console.log(path)
  console.log('finished')
}
