import { ipcRenderer } from 'electron'
import { ExecutorServiceChannel } from '@/services/executor/type/channel'

export const generateSelfCheckActions = () => {
  return {
    start: () => ipcRenderer.send(ExecutorServiceChannel.selfCheck.start),
  }
}
