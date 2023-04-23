import { ExecutorService } from '@/services/executor/renderer'

export interface Services {
  executor: ExecutorService
}

export const generateServices = (): Services => {
  return {
    executor: new ExecutorService(),
  }
}
