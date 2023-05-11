import Fs from 'fs/promises'
import Path from 'path'
import { dynamicScriptBuilder } from '@/utils/dynamic-script-builder'
import { PluginConfig } from '@/services/plugin/config'

export const usePlugin = async <T>(pluginDir: string) => {
  const script = (
    await Fs.readFile(Path.join(pluginDir, PluginConfig.fileStruct.script))
  ).toString()
  const { plugin } = dynamicScriptBuilder<{ plugin: T }>(script)
  return plugin
}
