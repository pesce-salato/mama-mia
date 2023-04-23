import { MainContext } from './type'
import { app, BrowserWindow } from 'electron'

export const getMainWindowHelpers = (context: MainContext) => {
  const hideWindow = () => {
    if (context.mainWindow && !context.mainWindow.isDestroyed()) {
      context.mainWindow.hide()
    }
  }

  const showWindow = () => {
    if (context.mainWindow && !context.mainWindow.isDestroyed()) {
      context.mainWindow.show()
    }
  }

  const createWindow = (): void => {
    // Create the browser window.
    context.mainWindow = new BrowserWindow({
      minHeight: 618,
      minWidth: 1000,
      width: 1000,
      height: 618,
      titleBarStyle: 'hidden',
      webPreferences: {
        preload: context.webpackEntry.mainWindowPreload,
        devTools: !app.isPackaged,
      },
    })

    context.mainWindow.on('close', (event) => {
      if (context.allowQuitting === false) {
        event.preventDefault()
        hideWindow()
      } else {
        context.mainWindow = undefined
      }
    })

    // remove original menu
    context.mainWindow.removeMenu()
    // and load the index.html of the app.
    context.mainWindow.loadURL(context.webpackEntry.mainWindow)
  }

  return { createWindow, hideWindow, showWindow }
}
