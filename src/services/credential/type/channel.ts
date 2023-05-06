import { channelNsBuilder } from '@/utils/channel-ns-builder'

const channel = channelNsBuilder('credentialService')

export const CredentialServiceChannel = Object.freeze({
  create: channel('create'),
  list: channel('list'),
  useDefaultToGet: channel('useDefaultToGet'),
})
