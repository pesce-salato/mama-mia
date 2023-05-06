import lodash from 'lodash'
import { Low } from 'lowdb'

// Extend Low class with a new `chain` field
export class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}
