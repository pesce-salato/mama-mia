import { channelNsBuilder } from '@/utils/channel-ns-builder'
import { generateDialogChannel } from './dialog'

const channel = channelNsBuilder('toolService')

export const ToolServiceChannel = Object.freeze({
  dialog: generateDialogChannel(channel),
})
