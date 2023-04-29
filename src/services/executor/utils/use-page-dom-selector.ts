import { ExecutorServiceDomElement } from '@/services/executor/type/dom/element'
import { openBrowser } from '@/services/executor/utils/open-browser'
import { Page, Target } from 'puppeteer-core'

export type PageSelectedCallback = (data: ExecutorServiceDomElement) => void

interface Context {
  mask?: HTMLElement
  anchor?: HTMLElement
}

const setMaskOpacity = async (page: Page, opacity: number) => {
  await page.evaluateHandle((opacity: number) => {
    const mask = document.getElementById('mama-mia-selector')
    if (mask) {
      mask.style.opacity = opacity.toString()
    }
  }, opacity)
}

export const hideMaskExecutor = async <T>(
  page: Page,
  func: () => Promise<T>
): Promise<T> => {
  await setMaskOpacity(page, 0)
  const result = await func()
  await setMaskOpacity(page, 1)
  return result
}

export const usePageDomSelector = async (
  browserPath: string,
  revision: string,
  callback: PageSelectedCallback
) => {
  const { browser } = await openBrowser(browserPath, revision)

  const injectHelperCodeToPage = async (page: Page) => {
    await page.exposeFunction(
      'onCustomEvent:choose',
      (e: ExecutorServiceDomElement) => {
        callback(e)
      }
    )

    await page.evaluateOnNewDocument(() => {
      const context: Context = {}

      const getChooseElementDetail = (
        event: MouseEvent
      ): ExecutorServiceDomElement => {
        const target = event.target as HTMLElement

        const getDetail = (element: HTMLElement): ExecutorServiceDomElement => {
          const parentElement = element.parentElement

          return {
            className: Array.from(element.classList.values()),
            id: element.id,
            attributes: element.getAttributeNames().reduce((acc, name) => {
              return { ...acc, [name]: element.getAttribute(name) }
            }, {}),
            tagName: element.tagName,
            index: parentElement
              ? Array.from(parentElement.children).findIndex(
                  (item) => item === element
                )
              : 0,
            parent: parentElement ? getDetail(parentElement) : undefined,
          }
        }

        return getDetail(target)
      }

      const getStyle = (oElm: HTMLElement, css3Prop: string) =>
        getComputedStyle(oElm).getPropertyValue(css3Prop)

      const getCoords = (elem: HTMLElement) => {
        // crossbrowser version
        const box = elem.getBoundingClientRect()

        const body = document.body
        const docEl = document.documentElement

        const scrollTop =
          window.pageYOffset || docEl.scrollTop || body.scrollTop
        const scrollLeft =
          window.pageXOffset || docEl.scrollLeft || body.scrollLeft

        const clientTop = docEl.clientTop || body.clientTop || 0
        const clientLeft = docEl.clientLeft || body.clientLeft || 0

        const top = box.top + scrollTop - clientTop
        const left = box.left + scrollLeft - clientLeft

        return {
          top: Math.round(top),
          left: Math.round(left),
          width: box.width,
          height: box.height,
        }
      }

      document.addEventListener('mouseover', (e) => {
        if (!context.mask) {
          const mask = document.createElement('div')
          context.mask = mask
          mask.id = 'mama-mia-selector'
          mask.style.background = '#805AD566'
          mask.style.border = '2px solid #805AD5'
          mask.style.position = 'absolute'
          mask.style.left = '0px'
          mask.style.top = '0px'
          mask.style.zIndex = '9999999'
          mask.style.pointerEvents = 'none'
          mask.style.boxSizing = 'border-box'
          ;(mask.style as any).backdropFilter = 'grayscale(0.6)'
          document.body.appendChild(mask)
        }
        const target = e.target as HTMLElement
        const mask = context.mask
        const coordInfo = getCoords(target)
        const scale = coordInfo.width / target.offsetWidth
        const scaleStyle = (value: string) => `calc(${value} * ${scale})`

        mask.style.borderTopLeftRadius = scaleStyle(
          getStyle(target, 'border-top-left-radius')
        )
        mask.style.borderTopRightRadius = scaleStyle(
          getStyle(target, 'border-top-right-radius')
        )
        mask.style.borderBottomRightRadius = scaleStyle(
          getStyle(target, 'border-bottom-right-radius')
        )
        mask.style.borderBottomLeftRadius = scaleStyle(
          getStyle(target, 'border-bottom-left-radius')
        )

        mask.style.width = `${coordInfo.width}px`
        mask.style.height = `${coordInfo.height}px`
        mask.style.transform = `translateX(${coordInfo.left}px) translateY(${coordInfo.top}px)`
      })

      document.addEventListener('click', (e) => {
        console.log('click', e, e.target)
        ;(window as any)['onCustomEvent:choose'](getChooseElementDetail(e))
      })
    })

    // refresh to trigger OnNewDocument event
    await page.reload()
  }

  browser.on('targetcreated', async (target: Target) => {
    if (target.type() !== 'page') {
      return
    }
    await injectHelperCodeToPage(await target.page())
  })

  await injectHelperCodeToPage((await browser.pages())[0])

  return { closeBrowser: () => browser.close(), browser }
}
