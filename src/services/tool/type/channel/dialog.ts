import { channelNsBuilder } from '@/utils/channel-ns-builder'

export const generateDialogChannel = (
  channel: ReturnType<typeof channelNsBuilder>
) => {
  const ns = channelNsBuilder(channel('dialog'))

  return {
    showOpenDialog: ns('openOpenDialog'),
  }
}
