import { MainProcessContext } from '@/processes/main/type'
import { ipcMain } from 'electron'
import { WindowServiceChannel } from '@/services/window/type/channel'
import { focus } from '@/services/window/utils/focus'

export const registerMainEvent = (context: MainProcessContext) => {
  ipcMain.on(WindowServiceChannel.main.focus, () => {
    focus(context.mainWindow)
  })
}
