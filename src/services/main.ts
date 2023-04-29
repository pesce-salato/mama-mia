import { ExecutorService } from '@/services/executor/main'
import { MainProcessContext } from '@/processes/main/type'
import { WindowService } from '@/services/window/main'

export interface Services {
  executor: ExecutorService
  window: WindowService
}

export const generateServices = (context: MainProcessContext): Services => {
  return {
    executor: new ExecutorService(),
    window: new WindowService(context),
  }
}
