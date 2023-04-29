import { MainProcessContext } from '@/processes/main/type'
import { registerMainEvent } from '@/services/window/main/events/main'

export class WindowService {
  private context: MainProcessContext

  constructor(context: MainProcessContext) {
    this.context = context
    registerMainEvent(this.context)
  }
}
