import { ipcRenderer } from 'electron'
import { CredentialServiceChannel } from '@/services/credential/type/channel'
import {
  CredentialDetail,
  CredentialGetValue,
} from '@/services/credential/type/detail'

export const generateBaseActions = () => {
  return {
    create: (
      credential: Omit<CredentialDetail, 'id'>
    ): Promise<string | undefined> =>
      ipcRenderer.invoke(CredentialServiceChannel.base.create, credential),
    getData: (pluginId: string): Promise<CredentialGetValue | undefined> =>
      ipcRenderer.invoke(CredentialServiceChannel.base.getData, pluginId),
  }
}
