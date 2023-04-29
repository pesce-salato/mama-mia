import { generateSelfCheckActions } from './actions/self-check'
import { generateSelfCheckEvents } from './events/self-check'
import { generatePageDomSelectorActions } from './actions/page-dom-selector'
import { generatePageDomSelectorEvents } from '@/services/executor/renderer/events/page-dom-selector'

export class ExecutorService {
  constructor() {
    // default
  }

  public selfCheck = {
    actions: generateSelfCheckActions(),
    events: generateSelfCheckEvents(),
  }

  public pageDomSelector = {
    actions: generatePageDomSelectorActions(),
    events: generatePageDomSelectorEvents(),
  }
}
