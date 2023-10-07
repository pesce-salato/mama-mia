import { ipcMain } from 'electron'
import { MainProcessContext } from '@/processes/main/type'
import { IoServiceChannel } from '@/services/io/type/channel'
import { initIoStruct } from '@/services/io/utils/struct'

export const registerBaseEvent = (context: MainProcessContext) => {
  ipcMain.handle(IoServiceChannel.base.init, () => {
    return initIoStruct()
  })
}
