import { type IpcRendererEvent } from 'electron'

export type RendererEventCallback<T> = (
  event: IpcRendererEvent,
  data: T
) => void
export type RendererEventRegister<T> = (
  callback: RendererEventCallback<T>
) => () => void
