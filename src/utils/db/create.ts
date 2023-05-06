import { JSONFile } from 'lowdb/lib/adapters/node/JSONFile'
import { LowWithLodash } from '@/utils/db/with-lodash'

export const createDb = <T>(path: string, defaultValue?: T) => {
  return new LowWithLodash<T>(new JSONFile<T>(path), defaultValue)
}
