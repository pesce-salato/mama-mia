import { LowWithLodash } from '@/utils/db/with-lodash'
import { CredentialDetail } from '@/services/credential/type/detail'
import { createDb } from '@/utils/db/create'
import { db } from '@/services/db'
import { type MainProcessContext } from '@/processes/main/type'

export class CredentialService {
  private db: LowWithLodash<CredentialDetail[]>
  private context: MainProcessContext

  constructor(context: MainProcessContext) {
    this.context = context
    this.db = createDb(db.config.credentials, [])
  }
}
