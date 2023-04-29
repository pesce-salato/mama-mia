import { ipcRenderer } from 'electron'
import { WindowServiceChannel } from '@/services/window/type/channel'

export const generateMainActions = () => ({
  focus: () => ipcRenderer.send(WindowServiceChannel.main.focus),
})
