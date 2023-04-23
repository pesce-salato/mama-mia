import { ExecutorService } from '@/services/executor/main'

export interface Services {
  executor: ExecutorService
}

export const generateServices = (): Services => {
  return {
    executor: new ExecutorService(),
  }
}
