import { config } from '@/services/io/config'
import { ActionResult } from '@/@types/action'
import Fs from 'fs'
import { mkdir } from 'fs/promises'

export const initIoStruct = async (): Promise<ActionResult<boolean>> => {
  const needExistDir = [
    config.path.appData,
    config.path.cache,
    config.path.dataSnapshot,
    config.path.db,
    config.path.plugins,
    config.path.dependencies,
  ]

  try {
    for (const dir of needExistDir) {
      if (!Fs.existsSync(dir)) {
        await mkdir(dir)
      }
    }
    return {
      data: true,
    }
  } catch (e) {
    return {
      data: false,
      msg: e.toString(),
    }
  }
}
