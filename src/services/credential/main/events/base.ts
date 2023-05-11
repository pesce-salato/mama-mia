import { ipcMain } from 'electron'
import { LowWithLodash } from '@/utils/db/with-lodash'
import { CredentialDetail } from '@/services/credential/type/detail'
import { CredentialServiceChannel } from '@/services/credential/type/channel'
import { saveCredential } from '@/services/credential/utils/save'
import { nanoid } from 'nanoid'
import { getCredentialData } from '@/services/credential/utils/get-credential-data'
import { MainProcessContext } from '@/processes/main/type'

export const registerBaseEvent = (
  db: LowWithLodash<CredentialDetail[]>,
  context: MainProcessContext
) => {
  ipcMain.handle(
    CredentialServiceChannel.base.create,
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

  ipcMain.handle(
    CredentialServiceChannel.base.getData,
    async (_event, pluginId: string) => getCredentialData(pluginId, context)
  )
}
