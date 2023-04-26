import { type ReactNode, useMemo } from 'react'
import { SelectValue } from '@/components/select/value'
import { SelectMenu } from '@/components/select/menu'
import { useChildFinder } from '@/hooks/child-finder'

export const useChildren = (children?: ReactNode) => {
  const finder = useChildFinder(children)

  return useMemo(() => {
    const valueElement = finder(SelectValue)[0]
    const menuElement = finder(SelectMenu)[0]

    return { valueElement, menuElement }
  }, [finder])
}
