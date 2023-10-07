import { ipcRenderer } from 'electron'
import { CredentialServiceChannel } from '@/services/credential/type/channel'
import {
  CredentialDetail,
  CredentialGetValue,
} from '@/services/credential/type/detail'
import { ActionResult } from '@/@types/action'

export const generateBaseActions = () => {
  return {
    create: (
      credential: Omit<CredentialDetail, 'id'>
    ): Promise<string | undefined> =>
      ipcRenderer.invoke(CredentialServiceChannel.base.create, credential),
    usePluginToGetCredential: (
      pluginId: string
    ): Promise<CredentialGetValue | undefined> =>
      ipcRenderer.invoke(
        CredentialServiceChannel.base.usePluginToGetCredential,
        pluginId
      ),
    init: (): Promise<ActionResult<boolean>> =>
      ipcRenderer.invoke(CredentialServiceChannel.base.init),
  }
}
