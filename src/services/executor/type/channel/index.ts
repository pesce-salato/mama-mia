import { channelNsBuilder } from '@/utils/channel-ns-builder'
import { generateSelfCheckChannel } from './self-check'

const channel = channelNsBuilder('executorService')

export const ExecutorServiceChannel = Object.freeze({
  selfCheck: generateSelfCheckChannel(channel),
})
