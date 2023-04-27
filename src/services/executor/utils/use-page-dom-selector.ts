import { Page } from 'puppeteer-core'
import { ExecutorServiceDomElement } from '@/services/executor/type/dom/element'

export type PageSelectedCallback = (data: ExecutorServiceDomElement) => void

interface Context {
  mask?: HTMLElement
}

export const usePageDomSelector = async (
  page: Page,
  callback?: PageSelectedCallback
) => {
  await page.exposeFunction(
    'onCustomEvent:choose',
    (e: ExecutorServiceDomElement) => {
      callback?.(e)
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

      const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
      const scrollLeft =
        window.pageXOffset || docEl.scrollLeft || body.scrollLeft

      const clientTop = docEl.clientTop || body.clientTop || 0
      const clientLeft = docEl.clientLeft || body.clientLeft || 0

      const top = box.top + scrollTop - clientTop
      const left = box.left + scrollLeft - clientLeft

      return { top: Math.round(top), left: Math.round(left) }
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
      mask.style.borderTopLeftRadius = getStyle(
        target,
        'border-top-left-radius'
      )
      mask.style.borderTopRightRadius = getStyle(
        target,
        'border-top-right-radius'
      )
      mask.style.borderBottomRightRadius = getStyle(
        target,
        'border-bottom-right-radius'
      )
      mask.style.borderBottomLeftRadius = getStyle(
        target,
        'border-bottom-left-radius'
      )

      mask.style.width = `${target.offsetWidth}px`
      mask.style.height = `${target.offsetHeight}px`
      const offset = getCoords(target)
      mask.style.transform = `translateX(${offset.left}px) translateY(${offset.top}px)`
    })

    document.addEventListener('click', (e) => {
      console.log('click', e, e.target)
      ;(window as any)['onCustomEvent:choose'](getChooseElementDetail(e))
    })
  })
}
