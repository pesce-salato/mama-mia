import { Children, ReactElement, ReactNode, useCallback, useMemo } from 'react'

export const useChildFinder = (children?: ReactNode) => {
  const list = useMemo(() => Children.toArray(children), [children])

  return useCallback(
    (type: any): ReturnType<typeof Children.toArray> =>
      list.filter((item) => (item as any)?.type === type),
    [list]
  )
}
