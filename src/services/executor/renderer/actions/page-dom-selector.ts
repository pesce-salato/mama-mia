import { ipcRenderer } from 'electron'
import { ExecutorServiceChannel } from '@/services/executor/type/channel'
import { ExecutorServiceSelectorVerifyPageResult } from '@/services/executor/type/dom/element'

export const generatePageDomSelectorActions = () => {
  return {
    open: () => ipcRenderer.send(ExecutorServiceChannel.pageDomSelector.open),
    close: () => ipcRenderer.send(ExecutorServiceChannel.pageDomSelector.close),
    verify: (
      selector: string
    ): Promise<ExecutorServiceSelectorVerifyPageResult[]> =>
      ipcRenderer.invoke(
        ExecutorServiceChannel.pageDomSelector.verify,
        selector
      ),
  }
}
