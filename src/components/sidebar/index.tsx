import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { Box } from '@chakra-ui/react'
import { type IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'
import Style from './index.module.scss'

interface MenuDetail {
  icon: IconType
  title: string
  active: boolean
}

export const Sidebar = () => {
  const location = useLocation()
  const { t } = useTranslation()

  const isVisible = useMemo(
    () => !['/preprocess'].includes(location.pathname),
    [location.pathname]
  )

  const menus = useMemo<MenuDetail[]>(() => {
    return []
  }, [location])

  if (!isVisible) {
    return null
  }

  return <Box width="192px" height="100%"></Box>
}
