import { ipcRenderer, type OpenDialogOptions } from 'electron'
import { ToolServiceChannel } from '@/services/tool/type/channel'

export const generateDialogActions = () => {
  return {
    showOpenDialog: (options?: OpenDialogOptions): Promise<string[]> =>
      ipcRenderer.invoke(ToolServiceChannel.dialog.showOpenDialog, options),
  }
}
