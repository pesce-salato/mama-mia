import { CredentialPluginGetValue } from '@/services/plugin'

export const CredentialDefaultPluginId = 'default-cookie-plugin'

export interface CredentialDetail
  extends Omit<CredentialPluginGetValue, 'data'> {
  id: string
  pluginId: string
  createdAt: string
  updateAt?: string
  dataId: string
}

export type CredentialGetValue = Omit<
  CredentialDetail,
  'id' | 'createdAt' | 'pluginId'
>
