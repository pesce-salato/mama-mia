import { ipcMain } from 'electron'
import { LowWithLodash } from '@/utils/db/with-lodash'
import { MainProcessContext } from '@/processes/main/type'
import { ActionResult } from '@/@types/action'
import { PluginDetail, PluginSearchCondition } from '@/services/plugin'
import { PluginServiceChannel } from '@/services/plugin/type/channel'
import { checkPlugin } from '@/services/plugin/utils/check-plugin'
import { linkPlugin } from '@/services/plugin/utils/link-plugin'
import { importPlugin } from '@/services/plugin/utils/import-plugin'
import { searchPlugin } from '@/services/plugin/utils/search-plugin'

export const registerBaseEvent = (
  db: LowWithLodash<PluginDetail[]>,
  context: MainProcessContext
) => {
  ipcMain.handle(
    PluginServiceChannel.base.check,
    async (_event, path: string) => {
      return await checkPlugin(path)
    }
  )

  ipcMain.handle(
    PluginServiceChannel.base.link,
    async (_event, path: string) => {
      return await linkPlugin(db, path)
    }
  )

  ipcMain.handle(
    PluginServiceChannel.base.search,
    async (_event, condition?: PluginSearchCondition) => {
      return await searchPlugin(condition, db)
    }
  )

  ipcMain.handle(
    PluginServiceChannel.base.import,
    async (_event, path: string) => {
      return await importPlugin(db, path)
    }
  )

  ipcMain.handle(
    PluginServiceChannel.base.init,
    async (): Promise<ActionResult<boolean>> => {
      try {
        await db.read()
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
  )
}
