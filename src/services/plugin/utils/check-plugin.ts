import Path from 'path'
import Fs from 'fs'
import { readFile } from 'fs/promises'
import { io } from '@/services/io'
import { nanoid } from 'nanoid'
import { extractZip } from '@/utils/extract-zip'
import { ActionResult } from '@/@types/action'
import { checkConfig } from './check-config'
import { PluginConfig } from '@/services/plugin/config'

export const checkPlugin = async (
  path: string
): Promise<ActionResult<boolean>> => {
  let checkDir = ''

  try {
    if (path.endsWith('.zip')) {
      const tempDir = Path.join(io.config.path.cache, nanoid())

      const extractResult = await extractZip(path, tempDir)

      if (!extractResult.data) {
        return extractResult
      }

      checkDir = tempDir
    } else {
      checkDir = path
    }

    const scriptFilePath = Path.join(checkDir, PluginConfig.fileStruct.script)
    const configFilePath = Path.join(checkDir, PluginConfig.fileStruct.config)

    for (const path of [scriptFilePath, configFilePath]) {
      if (!Fs.existsSync(path)) {
        return {
          data: false,
          msg: `file ${Path.parse(path).base} is lost`,
        }
      }
    }

    const configContent = JSON.parse(
      (await readFile(configFilePath)).toString()
    )

    return checkConfig(configContent)
  } catch (e) {
    return {
      data: false,
      msg: e.toString(),
    }
  }
}
