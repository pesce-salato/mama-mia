import { channelNsBuilder } from '@/utils/channel-ns-builder'

export const generateBaseChannel = (
  channel: ReturnType<typeof channelNsBuilder>
) => {
  const ns = channelNsBuilder(channel('base'))

  return {
    init: ns('init'),
  }
}
