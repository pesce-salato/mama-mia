import { ElementHandle } from 'puppeteer-core'

export const getElementTagName = async (element: ElementHandle<Element>) => {
  return await (await element.getProperty('tagName')).jsonValue()
}
