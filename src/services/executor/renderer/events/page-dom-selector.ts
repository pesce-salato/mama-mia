import { ExecutorServiceChannel } from '@/services/executor/type/channel'
import { generateRendererEventRegister } from '@/utils/render-event/generate-renderer-event-register'
import { ExecutorServiceDomElement } from '@/services/executor/type/dom/element'

export const generatePageDomSelectorEvents = () => {
  return {
    choose: generateRendererEventRegister<ExecutorServiceDomElement>(
      ExecutorServiceChannel.pageDomSelector.choose
    ),
    closed: generateRendererEventRegister(
      ExecutorServiceChannel.pageDomSelector.closed
    ),
  }
}
