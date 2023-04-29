import { type IconType } from 'react-icons'
import { Icon, IconButton, Tooltip } from '@chakra-ui/react'

export interface IconButtonProps {
  isLoading?: boolean
  loadingTooltip?: string
  tooltip?: string
  icon: IconType
  onClick?: () => void
  ariaLabel: string
  isDisabled?: boolean
}

export const ActionButton = (props: IconButtonProps) => {
  const {
    isLoading,
    loadingTooltip,
    icon,
    onClick,
    tooltip,
    ariaLabel,
    isDisabled,
  } = props
  return (
    <Tooltip
      label={isLoading ? loadingTooltip : tooltip}
      hasArrow
      arrowSize={6}
    >
      <IconButton
        isDisabled={isDisabled}
        isLoading={isLoading}
        onClick={onClick}
        aria-label={ariaLabel}
        icon={<Icon as={icon} />}
        variant="ghost"
        fontSize="22px"
      />
    </Tooltip>
  )
}
