import { BrowserWindow } from 'electron'

export interface MainContext {
  mainWindow?: BrowserWindow | undefined
  allowQuitting: boolean
  webpackEntry: {
    mainWindowPreload: string
    mainWindow: string
  }
}
