import { generateSelfCheckActions } from './actions/self-check'
import { generateSelfCheckEvents } from './events/self-check'

export class ExecutorService {
  constructor() {
    // default
  }

  public selfCheck = {
    actions: generateSelfCheckActions(),
    events: generateSelfCheckEvents(),
  }
}
