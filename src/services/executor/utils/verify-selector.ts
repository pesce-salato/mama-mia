import { Browser, ElementHandle } from 'puppeteer-core'
import {
  ExecutorServiceSelectorVerifyHitPoint,
  ExecutorServiceSelectorVerifyPageResult,
} from '@/services/executor/type/dom/element'
import Path from 'path'
import { config } from '@/services/io/config'
import { nanoid } from 'nanoid'
import { getElementTagName } from '@/services/executor/utils/get-element-tag-name'
import { hideMaskExecutor } from '@/services/executor/utils/use-page-dom-selector'

export const verifySelector = async (browser: Browser, selector: string) => {
  const pages = await browser.pages()

  const getHitPoint = async (
    node: ElementHandle<Element>
  ): Promise<ExecutorServiceSelectorVerifyHitPoint> => {
    const screenshotPath = Path.join(config.path.cache, nanoid() + '.png')
    await node.screenshot({
      path: screenshotPath,
      omitBackground: true,
    })
    const tagName = await getElementTagName(node)
    return {
      tagName,
      screenshotPath,
    }
  }

  const result: ExecutorServiceSelectorVerifyPageResult[] = []

  for (const page of pages) {
    await page.bringToFront()
    await hideMaskExecutor(page, async () => {
      let nodes: ElementHandle[]

      try {
        nodes = await page.$$(selector)
      } catch {
        nodes = []
      }

      if (nodes.length) {
        const hitPoints: ExecutorServiceSelectorVerifyHitPoint[] = []
        for (const node of nodes) {
          hitPoints.push(await getHitPoint(node))
        }
        result.push({ page: page.url(), hitPoints })
      }
    })
  }

  return result
}
