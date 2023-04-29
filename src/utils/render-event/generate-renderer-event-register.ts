import { ipcRenderer } from 'electron'
import { RendererEventRegister } from '@/utils/render-event/type'

export const generateRendererEventRegister = <T = any>(
  channel: string,
  method?: 'on' | 'once'
): RendererEventRegister<T> => {
  return (callback) => {
    ipcRenderer[method || 'on'](channel, callback)

    return () => ipcRenderer.removeListener(channel, callback)
  }
}
