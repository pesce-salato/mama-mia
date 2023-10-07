import { ipcRenderer } from 'electron'
import { ActionResult } from '@/@types/action'
import { IoServiceChannel } from '@/services/io/type/channel'

export const generateBaseActions = () => {
  return {
    init: (): Promise<ActionResult<boolean>> =>
      ipcRenderer.invoke(IoServiceChannel.base.init),
  }
}
