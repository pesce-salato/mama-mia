import {
  PluginDetail,
  PluginDetailWithConfig,
  PluginSearchCondition,
} from '@/services/plugin'
import { LowWithLodash } from '@/utils/db/with-lodash'
import { ActionResult } from '@/@types/action'
import { getPluginDetailWithConfig } from '@/services/plugin/utils/get-plugin-detail-with-config'

type Filter<T> = (e: T) => boolean

export const searchPlugin = async (
  condition: PluginSearchCondition | undefined,
  db: LowWithLodash<PluginDetail[]>
): Promise<ActionResult<PluginDetailWithConfig[]>> => {
  const afterFilters: Filter<PluginDetailWithConfig>[] = []

  if (condition?.type) {
    afterFilters.push((e) => e.config.type === condition?.type)
  }

  const listActionResult = await Promise.all(
    db.data.map(({ id }) => getPluginDetailWithConfig(id, db))
  )

  let list = listActionResult
    .filter((item) => item.data)
    .map((item) => item.data)

  for (const filter of afterFilters) {
    list = list.filter(filter)
  }

  return {
    data: list,
  }
}
