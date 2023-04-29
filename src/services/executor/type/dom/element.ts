export interface ExecutorServiceDomElement {
  className: string[]
  id?: string
  attributes: Record<string, string>
  tagName: string
  index: number
  parent?: ExecutorServiceDomElement
}

export interface ExecutorServiceSelectorVerifyPageResult {
  page: string
  hitPoints: ExecutorServiceSelectorVerifyHitPoint[]
}

export interface ExecutorServiceSelectorVerifyHitPoint {
  screenshotPath: string
  tagName: string
}
