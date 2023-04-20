import type PerfectScrollbar from 'perfect-scrollbar'

export type ScrollbarInstance = PerfectScrollbar

const ScrollbarPsToEventMatch = {
  /**
   * This event fires when the y-axis is scrolled in either direction
   */
  'ps-scroll-y': 'onScrollY',
  /**
   * This event fires when the x-axis is scrolled in either direction.
   */
  'ps-scroll-x': 'onScrollX',
  /**
   * This event fires when scrolling upwards.
   */
  'ps-scroll-up': 'onScrollUp',
  /**
   * This event fires when scrolling downwards.
   */
  'ps-scroll-down': 'onScrollDown',
  /**
   * This event fires when scrolling to the left.
   */
  'ps-scroll-left': 'onScrollLeft',
  /**
   * This event fires when scrolling to the right.
   */
  'ps-scroll-right': 'onScrollRight',
  /**
   * This event fires when scrolling reaches the start of the y-axis.
   */
  'ps-y-reach-start': 'onYReachStart',
  /**
   * This event fires when scrolling reaches the end of the y-axis (useful for infinite scroll).
   */
  'ps-y-reach-end': 'onYReachEnd',
  /**
   * This event fires when scrolling reaches the start of the x-axis.
   */
  'ps-x-reach-start': 'onXReachStart',
  /**
   * This event fires when scrolling reaches the end of the x-axis.
   */
  'ps-x-reach-end': 'onXReachEnd',
}

export const ScrollbarEventToPsMap = Object.keys(
  ScrollbarPsToEventMatch
).reduce((acc, key) => {
  const value = (ScrollbarPsToEventMatch as any)[key] as string
  acc[value] = key
  return acc
}, {} as Record<string, string>)

export interface ScrollbarRef {
  instance: ScrollbarInstance
  containerElement: HTMLDivElement | undefined
}

export interface ScrollbarHelpers {
  /**
   * 三方库[perfect-scrollbar](https://perfectscrollbar.com/) 实例对象
   */
  instance?: ScrollbarInstance
  /**
   * 容器dom实例
   */
  container?: HTMLDivElement
}

export type ScrollbarAxesEnum = 'both' | 'x' | 'y' | 'none'

export type ScrollbarEventProps = {
  /**
   * y轴滚动
   */
  onScrollY?: (e: Event) => void
  /**
   * x轴滚动
   */
  onScrollX?: (e: Event) => void
  /**
   * 向上滚动
   */
  onScrollUp?: (e: Event) => void
  /**
   * 向下滚动
   */
  onScrollDown?: (e: Event) => void
  /**
   * 向左滚动
   */
  onScrollLeft?: (e: Event) => void
  /**
   * 向右滚动
   */
  onScrollRight?: (e: Event) => void
  /**
   * y轴抵达最开始
   */
  onYReachStart?: (e: Event) => void
  /**
   * y轴抵达最后
   */
  onYReachEnd?: (e: Event) => void
  /**
   * x轴抵达最开始
   */
  onXReachStart?: (e: Event) => void
  /**
   * x轴抵达最后
   */
  onXReachEnd?: (e: Event) => void
}

export type ScrollbarPositionEnum =
  | '-moz-initial'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset'
  | '-webkit-sticky'
  | 'absolute'
  | 'fixed'
  | 'relative'
  | 'sticky'
