import { DataSnapshot } from './data-snapshot'
import { registerBaseEvent } from '@/services/io/main/events/base'
import { MainProcessContext } from '@/processes/main/type'

export class IoService {
  public dataSnapshot = new DataSnapshot()

  private readonly context: MainProcessContext

  constructor(context: MainProcessContext) {
    this.context = context
    registerBaseEvent(this.context)
  }
}
