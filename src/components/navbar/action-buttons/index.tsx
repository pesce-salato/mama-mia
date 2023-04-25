import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { TbSettingsFilled } from 'react-icons/tb'
import { HiChevronLeft, HiChevronRight, HiPaperClip } from 'react-icons/hi'
import Style from './index.module.scss'
import { type IconType } from 'react-icons'

interface ActionDetail {
  icon: IconType
  onClick: () => void
  active?: boolean
}

export const ActionButtons = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const toMatchPage = useCallback(
    (pathname: string) => {
      if (location.pathname !== pathname) {
        navigate(pathname)
      }
    },
    [navigate, location]
  )

  const isInMatchPage = useCallback(
    (pathname: string) => pathname === location.pathname,
    [location]
  )

  const actions = useMemo<ActionDetail[]>(() => {
    return [
      {
        icon: HiChevronLeft,
        onClick: () => navigate(-1),
      },
      {
        icon: HiChevronRight,
        onClick: () => navigate(1),
      },
      {
        icon: TbSettingsFilled,
        onClick: () => toMatchPage('/setting'),
        active: isInMatchPage('/setting'),
      },
      {
        icon: HiPaperClip,
        onClick: () => toMatchPage('/home'),
        active: isInMatchPage('/home'),
      },
    ]
  }, [navigate, toMatchPage, isInMatchPage])

  return (
    <Flex alignItems="center" gap="12px">
      {actions.map(({ icon: Icon, onClick, active }, index) => (
        <IconButton
          key={index}
          onClick={onClick}
          variant="ghost"
          aria-label="back"
          className="no-drag"
          size="sm"
          colorScheme={active ? 'purple' : 'gray'}
          fontSize="24px"
          icon={<Icon className={Style.icon} />}
        />
      ))}
    </Flex>
  )
}
