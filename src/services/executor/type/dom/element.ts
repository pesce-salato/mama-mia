export interface ExecutorServiceDomElement {
  className: string[]
  id?: string
  attributes: Record<string, string>
  tagName: string
  index: number
  parent?: ExecutorServiceDomElement
}
