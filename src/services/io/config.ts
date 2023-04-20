import { app } from 'electron'
import Path from 'path'

export const config = Object.freeze({
  path: {
    dependencies: Path.join(app.getPath('userData'), 'dependencies'),
  },
})
