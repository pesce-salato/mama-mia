import { useCallback, useMemo } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cls from 'classnames'
import { ActionButtons } from '@/components/navbar/action-buttons'
import Style from './index.module.scss'

export const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isVisible = useMemo(
    () => !['/preprocess'].includes(location.pathname),
    [location.pathname]
  )

  const toHome = useCallback(() => {
    if (location.pathname !== '/home') {
      navigate('/home')
    }
  }, [navigate])

  if (!isVisible) {
    return null
  }

  return (
    <Flex
      className={Cls('can-be-drag', Style.root)}
      width="100%"
      height="48px"
      alignItems="center"
      paddingX="12px"
      boxSizing="border-box"
    >
      <Box flex="1"></Box>
      <ActionButtons />
    </Flex>
  )
}
