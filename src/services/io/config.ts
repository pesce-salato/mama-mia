import { app } from 'electron'
import Path from 'path'

const appData = Path.join(app.getPath('userData'), 'app-custom-data')

export const config = Object.freeze({
  path: {
    appData,
    dependencies: Path.join(appData, 'dependencies'),
    db: Path.join(appData, 'db'),
    dataSnapshot: Path.join(appData, 'data-snapshot'),
    plugins: Path.join(appData, 'plugins'),
    cache: Path.join(app.getPath('temp'), 'mama-mia'),
  },
})
