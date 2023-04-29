import { ExecutorService } from '@/services/executor/renderer'
import { WindowService } from '@/services/window/renderer'

export interface Services {
  executor: ExecutorService
  window: WindowService
}

export const generateServices = (): Services => {
  return {
    executor: new ExecutorService(),
    window: new WindowService(),
  }
}
