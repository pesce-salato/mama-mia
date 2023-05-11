import { ExecutorService } from '@/services/executor/renderer'
import { WindowService } from '@/services/window/renderer'
import { CredentialService } from '@/services/credential/renderer'
import { ToolService } from '@/services/tool/renderer'

export interface Services {
  executor: ExecutorService
  window: WindowService
  credential: CredentialService
  tool: ToolService
}

export const generateServices = (): Services => {
  return {
    executor: new ExecutorService(),
    window: new WindowService(),
    credential: new CredentialService(),
    tool: new ToolService(),
  }
}
