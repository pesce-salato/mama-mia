import Path from 'path'
import { io } from '@/services/io'
import { registerSelfCheckEvent } from './events/self-check'

//
// const browser = await Puppeteer.launch({
//   executablePath: fetcher.revisionInfo(revision).executablePath,
//   // headless: false,
//   defaultViewport: {
//     width: 0,
//     height: 0,
//   },
// })
//
// const page = await browser.newPage()
//
// await page.goto('https://www.baidu.com/')
//
// await page.screenshot({
//   path: Path.join(app.getPath('desktop'), 'test.png'),
//   fullPage: true,
//   omitBackground: true,
// })

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
  }
}
