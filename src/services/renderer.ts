import { ExecutorService } from '@/services/executor/renderer'
import { WindowService } from '@/services/window/renderer'
import { CredentialService } from '@/services/credential/renderer'
import { ToolService } from '@/services/tool/renderer'
import { PluginService } from '@/services/plugin/renderer'
import { IoService } from '@/services/io/renderer'

export interface Services {
  executor: ExecutorService
  window: WindowService
  credential: CredentialService
  tool: ToolService
  plugin: PluginService
  io: IoService
}

export const generateServices = (): Services => {
  return {
    executor: new ExecutorService(),
    window: new WindowService(),
    credential: new CredentialService(),
    tool: new ToolService(),
    plugin: new PluginService(),
    io: new IoService(),
  }
}
