import { channelNsBuilder } from '@/utils/channel-ns-builder'

export const generatePageDomSelectorChannel = (
  channel: ReturnType<typeof channelNsBuilder>
) => {
  const ns = channelNsBuilder(channel('pageDomSelector'))

  return {
    open: ns('open'),
    choose: ns('choose'),
    close: ns('close'),
    closed: ns('closed'),
    verify: ns('verify'),
  }
}
