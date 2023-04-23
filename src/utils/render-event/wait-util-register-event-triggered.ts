import { RendererEventRegister } from '@/utils/render-event/type'
import { type IpcRendererEvent } from 'electron'

export const waitUtilRegisterEventTriggered = async <T>(
  register: RendererEventRegister<T>
) => {
  return new Promise<{ event: IpcRendererEvent; data: T }>((resolve) => {
    register((event, data) => resolve({ event, data }))
  })
}
