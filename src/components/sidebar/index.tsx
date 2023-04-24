import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import Style from './index.module.scss'

export const Sidebar = () => {
  const location = useLocation()

  const isVisible = useMemo(
    () => !['/preprocess'].includes(location.pathname),
    [location.pathname]
  )

  if (!isVisible) {
    return null
  }

  return <Box width="192px" height="100%"></Box>
}
