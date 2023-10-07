import { ipcRenderer } from 'electron'
import { ActionResult } from '@/@types/action'
import { PluginServiceChannel } from '@/services/plugin/type/channel'
import {
  PluginDetailWithConfig,
  PluginSearchCondition,
} from '@/services/plugin'

export const generateBaseActions = () => {
  return {
    init: (): Promise<ActionResult<boolean>> =>
      ipcRenderer.invoke(PluginServiceChannel.base.init),
    check: (path: string): Promise<ActionResult<boolean>> =>
      ipcRenderer.invoke(PluginServiceChannel.base.check, path),
    search: (
      condition?: PluginSearchCondition
    ): Promise<ActionResult<PluginDetailWithConfig[]>> =>
      ipcRenderer.invoke(PluginServiceChannel.base.search, condition),
    link: (path: string): Promise<ActionResult<boolean>> =>
      ipcRenderer.invoke(PluginServiceChannel.base.link, path),
    import: (path: string): Promise<ActionResult<boolean>> =>
      ipcRenderer.invoke(PluginServiceChannel.base.import, path),
  }
}
