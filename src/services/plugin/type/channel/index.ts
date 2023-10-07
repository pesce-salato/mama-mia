import { channelNsBuilder } from '@/utils/channel-ns-builder'
import { generateBaseChannel } from './base'

const channel = channelNsBuilder('pluginService')

export const PluginServiceChannel = Object.freeze({
  base: generateBaseChannel(channel),
})
