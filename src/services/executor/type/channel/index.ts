import { channelNsBuilder } from '@/utils/channel-ns-builder'
import { generateSelfCheckChannel } from './self-check'
import { generatePageDomSelectorChannel } from './page-dom-selector'

const channel = channelNsBuilder('executorService')

export const ExecutorServiceChannel = Object.freeze({
  selfCheck: generateSelfCheckChannel(channel),
  pageDomSelector: generatePageDomSelectorChannel(channel),
})
