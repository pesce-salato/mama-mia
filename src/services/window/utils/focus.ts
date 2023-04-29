import { BrowserWindow } from 'electron'

export const focus = (window: BrowserWindow) => {
  window.show()
  window.focus()
}
