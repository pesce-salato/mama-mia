import { ipcRenderer } from 'electron'
import { RendererEventRegister } from '@/utils/render-event/type'

export const generateRendererEventRegister = <T = any>(
  channel: string
): RendererEventRegister<T> => {
  return (callback) => {
    ipcRenderer.on(channel, callback)

    return () => ipcRenderer.removeListener(channel, callback)
  }
}
