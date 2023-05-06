import { ipcMain } from 'electron'
import { LowWithLodash } from '@/utils/db/with-lodash'
import { CredentialDetail } from '@/services/credential/type/detail'
import { CredentialServiceChannel } from '@/services/credential/type/channel'
import { saveCredential } from '@/services/credential/utils/save'
import { nanoid } from 'nanoid'

export const registerEvent = (db: LowWithLodash<CredentialDetail[]>) => {
  ipcMain.handle(
    CredentialServiceChannel.create,
    async (_event, credential: Omit<CredentialDetail, 'id'>) => {
      try {
        const id = nanoid()
        await saveCredential(db, { ...credential, id })
        return id
      } catch {
        return undefined
      }
    }
  )
}
