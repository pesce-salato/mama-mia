import Fs from 'fs/promises'
import Path from 'path'
import { dynamicScriptBuilder } from '@/utils/dynamic-script-builder'
import { PluginConfig } from '@/services/plugin/config'
import { LowWithLodash } from '@/utils/db/with-lodash'
import { PluginDetail } from '@/services/plugin'
import { ActionResult } from '@/@types/action'
import { getPluginDir } from '@/services/plugin/utils/get-plugin-dir'

export const usePlugin = async <T>(
  db: LowWithLodash<PluginDetail[]>,
  id: string
): Promise<ActionResult<T | undefined>> => {
  try {
    const pluginDetail = db.chain.find({ id }).value()

    if (!pluginDetail) {
      return {
        data: undefined,
        msg: `plugin ${id} info not found`,
      }
    }

    const pluginDir = getPluginDir(pluginDetail)

    const script = (
      await Fs.readFile(Path.join(pluginDir, PluginConfig.fileStruct.script))
    ).toString()

    const { plugin } = dynamicScriptBuilder<{ plugin: T }>(script)

    return {
      data: plugin,
    }
  } catch (e) {
    return {
      data: undefined,
      msg: e.toString(),
    }
  }
}
