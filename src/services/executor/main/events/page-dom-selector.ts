import { ipcMain } from 'electron'
import { ExecutorServiceChannel } from '@/services/executor/type/channel'
import { usePageDomSelector } from '@/services/executor/utils/use-page-dom-selector'
import { verifySelector } from '@/services/executor/utils/verify-selector'

export const registerPageDomSelectorEvent = (
  browserPath: string,
  revision: string
) => {
  ipcMain.on(ExecutorServiceChannel.pageDomSelector.open, async (event) => {
    const sender = event.sender

    const { closeBrowser, browser } = await usePageDomSelector(
      browserPath,
      revision,
      (e) => {
        sender.send(ExecutorServiceChannel.pageDomSelector.choose, e)
      }
    )

    ipcMain.once(ExecutorServiceChannel.pageDomSelector.close, closeBrowser)
    ipcMain.handle(
      ExecutorServiceChannel.pageDomSelector.verify,
      async (event, selector: string) => {
        return await verifySelector(browser, selector)
      }
    )

    browser.on('disconnected', () => {
      console.error('closed')
      try {
        sender.send(ExecutorServiceChannel.pageDomSelector.closed)
      } catch (e) {
        console.error(e)
      }
    })
  })
}
