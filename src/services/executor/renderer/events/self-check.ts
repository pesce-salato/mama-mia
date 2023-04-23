import { ExecutorServiceChannel } from '@/services/executor/type/channel'
import { generateRendererEventRegister } from '@/utils/render-event/generate-renderer-event-register'

export const generateSelfCheckEvents = () => {
  return {
    beforeDownload: generateRendererEventRegister<{ revision: string }>(
      ExecutorServiceChannel.selfCheck.beforeDownload
    ),
    downloading: generateRendererEventRegister<{
      current: number
      total: number
    }>(ExecutorServiceChannel.selfCheck.downloading),
    afterDownload: generateRendererEventRegister<{
      message?: string
      succeed: boolean
    }>(ExecutorServiceChannel.selfCheck.afterDownload),
    end: generateRendererEventRegister<{
      succeed: boolean
    }>(ExecutorServiceChannel.selfCheck.end),
  }
}
