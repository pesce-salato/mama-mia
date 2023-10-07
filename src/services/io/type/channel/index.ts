import { channelNsBuilder } from '@/utils/channel-ns-builder'
import { generateBaseChannel } from './base'

const channel = channelNsBuilder('ioService')

export const IoServiceChannel = Object.freeze({
  base: generateBaseChannel(channel),
})
