import { SelectContext, SelectOptionProps } from '@/components/select/type'
import { Box, Flex, Icon, useToken } from '@chakra-ui/react'
import { useContext, useMemo } from 'react'
import { HiCheck } from 'react-icons/hi'

export const SelectOption = (props: SelectOptionProps) => {
  const { children, isDisabled: isOptionDisabled, ...otherProps } = props
  const context = useContext(SelectContext)

  const isDisabled = useMemo(
    () => context.isDisabled || isOptionDisabled,
    [context.isDisabled, isOptionDisabled]
  )

  const isActive = useMemo(
    () => context.value.includes(props.value),
    [context.value, props.value]
  )

  const colorScheme = useMemo(
    () => props.colorScheme || context.colorScheme,
    [props.colorScheme, context.colorScheme]
  )

  const [activeColor, activeBackground] = useToken('colors', [
    `${colorScheme}.500`,
    `${colorScheme}.50`,
  ])

  return (
    <Flex
      padding={2}
      borderRadius="md"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      color={isActive ? activeColor : 'gray.900'}
      _notLast={{
        marginBottom: '8px',
      }}
      opacity={isDisabled ? 0.6 : 1}
      _hover={{
        background: activeBackground,
      }}
      minWidth={0}
      width="100%"
      gap={1}
      alignItems="center"
      transitionProperty="common"
      transitionDuration="normal"
      {...otherProps}
      onClick={() => {
        if (!isDisabled) {
          context.onOptionClick(props.value)
        }
      }}
    >
      <Box flex={1} height="100%">
        {children}
      </Box>
      <Icon as={HiCheck} fontSize="18px" opacity={isActive ? 1 : 0} />
    </Flex>
  )
}
