import { Page } from 'puppeteer-core'

export type PageEventCallback = (event: any) => void

export const pageEventListenerBuilder = async (page: Page) => {
  const cache = new Map<string, PageEventCallback[]>()

  await page.exposeFunction('onCustomEvent', (e: any) => {
    const callbacks = cache.get(e.type) || []
    callbacks.forEach((func) => func(e.event))
  })

  return async (type: string, callback: PageEventCallback) => {
    const callbacks = cache.get(type) || []
    cache.set(type, Array.from(new Set(callbacks).add(callback)))

    await page.evaluateOnNewDocument((type) => {
      document.addEventListener(type, (e) => {
        // the detail of event data is lost to main
        ;(window as any).onCustomEvent({ type, event: e })
      })
    }, type)
  }
}
