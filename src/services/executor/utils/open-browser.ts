import Puppeteer, { BrowserFetcher } from 'puppeteer-core'

export const openBrowser = async (
  browserPath: string,
  revision: string,
  incognito = true,
  headless = false
) => {
  const fetcher = new BrowserFetcher({
    path: browserPath,
    product: 'chrome',
  })

  const browser = await Puppeteer.launch({
    executablePath: fetcher.revisionInfo(revision).executablePath,
    headless,
    defaultViewport: null,
    args: [incognito && '--incognito'].filter((item) => item),
  })
  const context = await browser.createIncognitoBrowserContext()

  const openPage = async (url?: string) => {
    const initialPage = (await browser.pages())[0]

    if (!initialPage.url()) {
      await initialPage.goto(url)
      return initialPage
    }

    const newPage = await (incognito ? context : browser).newPage()
    await newPage.goto(url)

    return newPage
  }

  return {
    browser,
    openPage,
  }
}
