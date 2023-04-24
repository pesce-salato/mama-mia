import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { IconButton } from '@chakra-ui/react'
import { HiChevronLeft, HiChevronRight, HiPaperClip } from 'react-icons/hi'
import Cls from 'classnames'
import Style from './index.module.scss'

export const ActionButtons = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const toHome = useCallback(() => {
    if (location.pathname !== '/home') {
      navigate('/home')
    }
  }, [navigate, location])

  const back = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const forward = useCallback(() => {
    navigate(1)
  }, [navigate])

  return (
    <>
      <IconButton
        onClick={back}
        variant="ghost"
        aria-label="back"
        className="no-drag"
        size="sm"
        fontSize="24px"
        icon={<HiChevronLeft className={Style.icon} />}
      />
      <IconButton
        onClick={forward}
        marginLeft="12px"
        variant="ghost"
        aria-label="forward"
        className="no-drag"
        size="sm"
        fontSize="24px"
        icon={<HiChevronRight className={Style.icon} cursor="pointer" />}
      />
      <IconButton
        marginLeft="24px"
        onClick={toHome}
        variant="ghost"
        size="sm"
        className="no-drag"
        colorScheme="purple"
        aria-label="home"
        icon={<HiPaperClip className={Cls(Style.logo, Style.icon)} />}
      />
    </>
  )
}
