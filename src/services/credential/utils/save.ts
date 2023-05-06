import { LowWithLodash } from '@/utils/db/with-lodash'
import { CredentialDetail } from '@/services/credential/type/detail'

export const saveCredential = async (
  db: LowWithLodash<CredentialDetail[]>,
  credential: CredentialDetail
) => {
  const searchIndex = db.chain.findIndex({ id: credential.id }).value()
  if (searchIndex >= 0) {
    db.chain.push(credential)
  }
  await db.write()
}
