import { ipcMain } from 'electron'
import { ExecutorServiceChannel } from '@/services/executor/type/channel'
import { downloadBrowser } from '@/services/executor/utils/download-browser'

export const registerSelfCheckEvent = (
  browserPath: string,
  revision: string
) => {
  ipcMain.on(ExecutorServiceChannel.selfCheck.start, async (event) => {
    const sender = event.sender
    const downloadResult = await downloadBrowser(browserPath, revision, {
      startDownload: () => {
        sender.send(ExecutorServiceChannel.selfCheck.beforeDownload, {
          revision,
        })
      },
      downloadProgress: (x, y) => {
        sender.send(ExecutorServiceChannel.selfCheck.downloading, {
          current: x,
          total: y,
        })
      },
      endDownload: (succeed, message) => {
        sender.send(ExecutorServiceChannel.selfCheck.afterDownload, {
          succeed,
          message,
        })
      },
    })
    sender.send(ExecutorServiceChannel.selfCheck.end, {
      succeed: downloadResult,
    })
  })
}
