import { registerDialogEvent } from '@/services/tool/main/events/dialog'
import { MainProcessContext } from '@/processes/main/type'

export class ToolService {
  private readonly context: MainProcessContext
  constructor(context: MainProcessContext) {
    this.context = context
    registerDialogEvent(this.context)
  }
}
