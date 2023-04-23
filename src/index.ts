import { app } from 'electron'
import { generateServices } from '@/services/main'
import { getMainWindowHelpers } from '@/main/main-window'
import { MainContext } from '@/main/type'
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const context: MainContext = {
  allowQuitting: false,
  webpackEntry: {
    mainWindowPreload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    mainWindow: MAIN_WINDOW_WEBPACK_ENTRY,
  },
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

// reset application menu
// if (app.isPackaged) {
//   Menu.setApplicationMenu(null)
// }

const { createWindow, showWindow } = getMainWindowHelpers(context)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (context.mainWindow === undefined) {
    createWindow()
  } else {
    showWindow()
  }
})

app.on('before-quit', () => (context.allowQuitting = true))

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const services = generateServices()
