import { LowWithLodash } from '@/utils/db/with-lodash'
import { PluginDetail } from '@/services/plugin'
import { nanoid } from 'nanoid'
import { ActionResult } from '@/@types/action'
import { extractZip } from '@/utils/extract-zip'
import Path from 'path'
import { io } from '@/services/io'
import { getNowString } from '@/utils/date/get-now-string'

export const importPlugin = async (
  db: LowWithLodash<PluginDetail[]>,
  path: string,
  isDefault = false
): Promise<ActionResult<boolean>> => {
  try {
    const id = nanoid()
    const savePluginDir = Path.join(io.config.path.plugins, id)
    const extractResult = await extractZip(path, savePluginDir)

    if (!extractResult.data) {
      return extractResult
    }

    db.data.push({
      id,
      importedDate: getNowString(),
      isDefault,
    })

    await db.write()

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
