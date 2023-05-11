import { ipcMain, dialog, type OpenDialogOptions } from 'electron'
import { MainProcessContext } from '@/processes/main/type'
import { ToolServiceChannel } from '@/services/tool/type/channel'

export const registerDialogEvent = (context: MainProcessContext) => {
  ipcMain.handle(
    ToolServiceChannel.dialog.showOpenDialog,
    async (_event, options?: OpenDialogOptions): Promise<string[]> => {
      try {
        const { canceled, filePaths } = await dialog.showOpenDialog(
          context.mainWindow,
          options
        )
        if (canceled) {
          return []
        }

        return filePaths
      } catch (e) {
        console.error(e)
        return []
      }
    }
  )
}
