import Path from 'path'
import { io } from '@/services/io'
import { registerSelfCheckEvent } from './events/self-check'
import { registerPageDomSelectorEvent } from '@/services/executor/main/events/page-dom-selector'
import { openBrowser } from '@/services/executor/utils/open-browser'

export class ExecutorService {
  public static readonly revision = '1108766'
  public static readonly browserPath = Path.join(
    io.config.path.dependencies,
    'chromium'
  )

  constructor() {
    registerSelfCheckEvent(
      ExecutorService.browserPath,
      ExecutorService.revision
    )
    registerPageDomSelectorEvent(
      ExecutorService.browserPath,
      ExecutorService.revision
    )
  }

  public openBrowser = async () =>
    openBrowser(ExecutorService.browserPath, ExecutorService.revision)
}
