import { CredentialPluginGetValue } from '@/services/plugin'

export interface CredentialDetail
  extends Omit<CredentialPluginGetValue, 'data'> {
  id: string
  pluginId?: string
  dataId: string
}
