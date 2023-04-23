import { channelNsBuilder } from '@/utils/channel-ns-builder'

export const generateSelfCheckChannel = (
  channel: ReturnType<typeof channelNsBuilder>
) => {
  const selfCheck = channelNsBuilder(channel('selfCheck'))

  return {
    start: selfCheck('start'),
    beforeDownload: selfCheck('beforeDownload'),
    downloading: selfCheck('downloading'),
    afterDownload: selfCheck('after'),
    end: selfCheck('end'),
  }
}
