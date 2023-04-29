import { channelNsBuilder } from '@/utils/channel-ns-builder'

export const generateSelfCheckChannel = (
  channel: ReturnType<typeof channelNsBuilder>
) => {
  const ns = channelNsBuilder(channel('selfCheck'))

  return {
    start: ns('start'),
    beforeDownload: ns('beforeDownload'),
    downloading: ns('downloading'),
    afterDownload: ns('after'),
    end: ns('end'),
  }
}
