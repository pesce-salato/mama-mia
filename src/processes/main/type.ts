import { BrowserWindow } from 'electron'

export interface MainProcessContext {
  mainWindow?: BrowserWindow | undefined
  allowQuitting: boolean
  webpackEntry: {
    mainWindowPreload: string
    mainWindow: string
  }
}
