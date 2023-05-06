import { CredentialPlugin } from '@/services/plugin'
import { ExecutorService } from '@/services/executor/main'
import { getDomain } from '@/utils/get-domain'
import { CredentialDetail } from '@/services/credential/type/detail'
import { IoService } from '@/services/io/main'

export const getPageCookieCredentialHelper = async (
  executorService: ExecutorService,
  ioService: IoService
) => {
  const { browser } = await executorService.openBrowser()

  const getAllPageCredential = async (): Promise<
    Omit<CredentialDetail, 'id'>[]
  > => {
    if (browser.isConnected()) {
      const pages = await browser.pages()
      const cache = new Map<string, Omit<CredentialDetail, 'id'>>()

      for (const page of pages) {
        const domain = getDomain(page.url())
        const cookies = await page.cookies()
        const dataId = await ioService.dataSnapshot.create(cookies)
        cache.set(domain, {
          domain,
          dataId,
        })
      }

      return Array.from(cache.values())
    } else {
      return []
    }
  }

  const closeBrowser = () => browser.close()

  const closeBrowserEventRegister = (callback: () => void) => {
    browser.on('disconnected', callback)
  }

  return { getAllPageCredential, closeBrowser, closeBrowserEventRegister }
}
