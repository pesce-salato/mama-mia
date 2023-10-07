import { usePlugin } from '../utils/use-plugin'
import { LowWithLodash } from '@/utils/db/with-lodash'
import { PluginDetail } from '@/services/plugin'
import { MainProcessContext } from '@/processes/main/type'
import { createDb } from '@/utils/db/create'
import { db } from '@/services/db'
import { registerBaseEvent } from '@/services/plugin/main/events/base'

export class PluginService {
  public readonly db: LowWithLodash<PluginDetail[]>
  private readonly context: MainProcessContext

  constructor(context: MainProcessContext) {
    this.context = context
    this.db = createDb(db.config.plugins, [])

    registerBaseEvent(this.db, context)
  }

  public readonly use = <T>(id: string) => usePlugin<T>(this.db, id)
}
