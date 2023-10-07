import { channelNsBuilder } from '@/utils/channel-ns-builder'

export const generateBaseChannel = (
  channel: ReturnType<typeof channelNsBuilder>
) => {
  const ns = channelNsBuilder(channel('base'))

  return {
    import: ns('import'),
    link: ns('link'),
    check: ns('check'),
    init: ns('init'),
    search: ns('search'),
  }
}
