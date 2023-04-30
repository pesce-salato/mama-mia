import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import { Flex, IconButton, Tooltip } from '@chakra-ui/react'
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiIdentification,
  HiPaperClip,
  HiPuzzle,
  HiTemplate,
  HiTerminal,
} from 'react-icons/hi'
import { type IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'
import { RiGithubFill } from 'react-icons/ri'
import Style from './index.module.scss'

interface ActionDetail {
  icon: IconType
  onClick: () => void
  active?: boolean
  tooltip?: string
}

export const ActionButtons = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const toMatchPage = useCallback(
    (pathname: string) => {
      if (location.pathname !== pathname) {
        navigate(pathname)
      }
    },
    [navigate, location]
  )

  const isInMatchPage = useCallback(
    (pathname: string) => location.pathname.startsWith(pathname),
    [location]
  )

  const actions = useMemo<ActionDetail[]>(() => {
    const generatePageAction = (
      pathname: string,
      icon: IconType,
      tooltip?: string
    ) => ({
      icon: icon,
      onClick: () => toMatchPage(pathname),
      active: isInMatchPage(pathname),
      tooltip,
    })

    return [
      {
        icon: HiChevronLeft,
        onClick: () => navigate(-1),
      },
      {
        icon: HiChevronRight,
        onClick: () => navigate(1),
      },
      generatePageAction('/home', HiPaperClip, t('menu.home')),
      generatePageAction('/workflows', HiTemplate, t('menu.workflows')),
      generatePageAction('/tasks', HiTerminal, t('menu.tasks')),
      generatePageAction('/plugins', HiPuzzle, t('menu.plugins')),
      generatePageAction(
        '/credentials',
        HiIdentification,
        t('menu.credentials')
      ),
      generatePageAction('/setting', HiCog, t('menu.setting')),
      generatePageAction('/about', RiGithubFill, t('menu.about')),
    ]
  }, [navigate, toMatchPage, isInMatchPage, t])

  return (
    <Flex alignItems="center" gap="12px">
      {actions.map(({ icon: Icon, onClick, active, tooltip }, index) => (
        <Tooltip key={index} label={tooltip} hasArrow arrowSize={6}>
          <IconButton
            onClick={onClick}
            variant="ghost"
            aria-label="back"
            className="no-drag"
            size="sm"
            colorScheme={active ? 'purple' : 'gray'}
            fontSize="24px"
            icon={<Icon className={Style.icon} />}
          />
        </Tooltip>
      ))}
    </Flex>
  )
}
