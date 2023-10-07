import { type MainProcessContext } from '@/processes/main/type'
import { ExecutorService } from '@/services/executor/main'
import { WindowService } from '@/services/window/main'
import { CredentialService } from '@/services/credential/main'
import { IoService } from '@/services/io/main'
import { PluginService } from '@/services/plugin/main'
import { ToolService } from '@/services/tool/main'

export interface Services {
  executor: ExecutorService
  window: WindowService
  credential: CredentialService
  io: IoService
  plugin: PluginService
  tool: ToolService
}

export const generateServices = (context: MainProcessContext): Services => {
  return {
    executor: new ExecutorService(),
    window: new WindowService(context),
    credential: new CredentialService(context),
    io: new IoService(context),
    plugin: new PluginService(context),
    tool: new ToolService(context),
  }
}
