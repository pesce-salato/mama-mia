import { channelNsBuilder } from '@/utils/channel-ns-builder'
import { generateBaseChannel } from '@/services/credential/type/channel/base'

const channel = channelNsBuilder('credentialService')

export const CredentialServiceChannel = Object.freeze({
  base: generateBaseChannel(channel),
})
