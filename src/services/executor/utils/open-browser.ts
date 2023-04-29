import Puppeteer, { BrowserFetcher } from 'puppeteer-core'

export const openBrowser = async (browserPath: string, revision: string) => {
  const fetcher = new BrowserFetcher({
    path: browserPath,
    product: 'chrome',
  })

  const browser = await Puppeteer.launch({
    executablePath: fetcher.revisionInfo(revision).executablePath,
    headless: false,
    defaultViewport: null,
    // defaultViewport: {
    //   width: 0,
    //   height: 0,
    // },
  })

  const openPage = async (url?: string) => {
    const initialPage = (await browser.pages())[0]

    if (!initialPage.url()) {
      await initialPage.goto(url)
      return initialPage
    }

    const newPage = await browser.newPage()
    await newPage.goto(url)

    return newPage
  }

  return {
    browser,
    openPage,
  }
}
