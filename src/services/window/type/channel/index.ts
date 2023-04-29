import { channelNsBuilder } from '@/utils/channel-ns-builder'
import { generateMainChannel } from './main'

const channel = channelNsBuilder('windowService')

export const WindowServiceChannel = Object.freeze({
  main: generateMainChannel(channel),
})
