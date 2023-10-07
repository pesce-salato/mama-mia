import { LowWithLodash } from '@/utils/db/with-lodash'
import { PluginDetail } from '@/services/plugin'
import { nanoid } from 'nanoid'
import { getNowString } from '@/utils/date/get-now-string'
import { ActionResult } from '@/@types/action'

export const linkPlugin = async (
  db: LowWithLodash<PluginDetail[]>,
  path: string,
  isDefault = false
): Promise<ActionResult<boolean>> => {
  db.data.push({
    id: nanoid(),
    localDevPath: path,
    importedDate: getNowString(),
    isDefault,
  })

  await db.write()

  return {
    data: true,
  }
}
