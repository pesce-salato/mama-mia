import { PluginDetail } from '@/services/plugin'
import Path from 'path'
import { io } from '@/services/io'

export const getPluginDir = (detail: PluginDetail) => {
  return detail.localDevPath || Path.join(io.config.path.plugins, detail.id)
}
