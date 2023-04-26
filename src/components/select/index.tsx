import {
  Box,
  Flex,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
  useToken,
} from '@chakra-ui/react'
import { Fragment, useCallback, useMemo } from 'react'
import { SelectContext, SelectProps } from './type'
import { useChildren } from './children'
import { SelectValue } from './value'
import { SelectMenu } from './menu'
import { SelectOption } from './option'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

export const Select = (props: SelectProps) => {
  const {
    children,
    isDisabled,
    colorScheme = 'purple',
    placeholder,
    value,
    isPortal,
    onChange,
    ...otherProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onOptionClick = useCallback(
    (optionValue: string) => {
      let result = [...value]
      if (result.includes(optionValue)) {
        result = result.filter((item) => item !== optionValue)
      } else {
        result = [...result, optionValue]
      }
      onChange(result)
      onClose()
    },
    [value, onClose, onChange]
  )

  const context = useMemo<SelectContext>(
    () => ({
      isDisabled,
      colorScheme,
      value,
      onOptionClick,
    }),
    [isDisabled, colorScheme, onClose, value]
  )

  const { menuElement, valueElement } = useChildren(children)

  const ContentWrapper = useMemo(
    () => (isPortal ? Portal : Fragment),
    [isPortal]
  )

  const [activeColor] = useToken('colors', [`${colorScheme}.500`])

  const activeStyle = useMemo(
    () => ({
      borderColor: activeColor,
      boxShadow: `${activeColor} 0px 0px 0px 1px`,
    }),
    [activeColor]
  )

  return (
    <SelectContext.Provider value={context}>
      <Popover
        matchWidth
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Flex
            minWidth={0}
            transitionProperty="common"
            transitionDuration="normal"
            alignItems="center"
            borderRadius="md"
            borderWidth={1}
            height={10}
            paddingX={4}
            gap={4}
            background="white"
            _expanded={activeStyle}
            _focus={activeStyle}
            {...otherProps}
          >
            <Box flex={1}>
              {value.length ? (
                valueElement
              ) : (
                <Text color="gray.500">{placeholder}</Text>
              )}
            </Box>
            <Icon fontSize="24px" as={isOpen ? HiChevronUp : HiChevronDown} />
          </Flex>
        </PopoverTrigger>
        <ContentWrapper>
          <PopoverContent
            boxShadow="var(--chakra-shadows-md), 0 0 4px rgba(0, 0, 0, 0.05)"
            borderRadius="lg"
            borderWidth={0}
            width="100%"
          >
            {menuElement}
          </PopoverContent>
        </ContentWrapper>
      </Popover>
    </SelectContext.Provider>
  )
}

export { SelectValue, SelectMenu, SelectOption }
