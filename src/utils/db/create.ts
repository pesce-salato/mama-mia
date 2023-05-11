// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { JSONFile } from 'lowdb/node'
import { LowWithLodash } from '@/utils/db/with-lodash'

export const createDb = <T>(path: string, defaultValue?: T) => {
  return new LowWithLodash<T>(new JSONFile<T>(path), defaultValue)
}
