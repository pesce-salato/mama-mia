import { BrowserWindow } from 'electron'
import { type Services } from '@/services/main'

export interface MainProcessContext {
  mainWindow?: BrowserWindow | undefined
  allowQuitting: boolean
  webpackEntry: {
    mainWindowPreload: string
    mainWindow: string
  }
  services?: Services
}
