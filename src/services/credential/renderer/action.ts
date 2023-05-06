import { ipcRenderer } from 'electron'
import { CredentialServiceChannel } from '@/services/credential/type/channel'
import { CredentialDetail } from '@/services/credential/type/detail'

export const generateActions = () => {
  return {
    create: (
      credential: Omit<CredentialDetail, 'id'>
    ): Promise<string | undefined> =>
      ipcRenderer.invoke(CredentialServiceChannel.create, credential),
  }
}
