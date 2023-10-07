import { ipcMain } from 'electron'
import { LowWithLodash } from '@/utils/db/with-lodash'
import { CredentialDetail } from '@/services/credential/type/detail'
import { CredentialServiceChannel } from '@/services/credential/type/channel'
import { saveCredential } from '@/services/credential/utils/save'
import { nanoid } from 'nanoid'
import { usePluginToGetCredential } from '@/services/credential/utils/use-plugin-to-get-credential'
import { MainProcessContext } from '@/processes/main/type'
import { ActionResult } from '@/@types/action'

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
    CredentialServiceChannel.base.usePluginToGetCredential,
    async (_event, pluginId: string) =>
      usePluginToGetCredential(pluginId, context)
  )

  ipcMain.handle(
    CredentialServiceChannel.base.init,
    async (): Promise<ActionResult<boolean>> => {
      try {
        await db.read()
        return {
          data: true,
        }
      } catch (e) {
        return {
          data: false,
          msg: e.toString(),
        }
      }
    }
  )
}
