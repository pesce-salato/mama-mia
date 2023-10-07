import Fs from 'fs/promises'
import { ActionResult } from '@/@types/action'
import { PluginDetail, PluginDetailWithConfig } from '@/services/plugin'
import { LowWithLodash } from '@/utils/db/with-lodash'
import { getPluginDir } from '@/services/plugin/utils/get-plugin-dir'
import Path from 'path'
import { PluginConfig } from '@/services/plugin/config'

export const getPluginDetailWithConfig = async (
  id: string,
  db: LowWithLodash<PluginDetail[]>
): Promise<ActionResult<PluginDetailWithConfig | undefined>> => {
  try {
    const detail = db.chain.find({ id }).value()

    if (!detail) {
      return {
        data: undefined,
        msg: `plugin ${id} info not found`,
      }
    }

    const pluginDir = getPluginDir(detail)

    return {
      data: {
        ...detail,
        config: JSON.parse(
          (
            await Fs.readFile(
              Path.join(pluginDir, PluginConfig.fileStruct.config)
            )
          ).toString()
        ),
      },
    }
  } catch (e) {
    return {
      data: undefined,
      msg: e.toString(),
    }
  }
}
