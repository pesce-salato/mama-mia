import { LowWithLodash } from '@/utils/db/with-lodash'
import { PluginDetail } from '@/services/plugin'

export const importPlugin = (
  db: LowWithLodash<PluginDetail[]>,
  path: string
) => {
  // import zip plugin
  if (path.endsWith('zip')) {
  }
  // link to local plugin dir
  else {
  }
}
