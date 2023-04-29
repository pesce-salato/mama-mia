import { channelNsBuilder } from '@/utils/channel-ns-builder'

export const generateMainChannel = (
  channel: ReturnType<typeof channelNsBuilder>
) => {
  const ns = channelNsBuilder(channel('main'))

  return {
    focus: ns('focus'),
  }
}
