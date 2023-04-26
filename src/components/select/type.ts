import { type HTMLChakraProps, type ThemeTypings } from '@chakra-ui/system'
import { createContext } from 'react'

export interface SelectProps extends Omit<HTMLChakraProps<'div'>, 'onChange'> {
  isDisabled?: boolean
  placeholder?: string
  colorScheme?: ThemeTypings['colorSchemes']
  isPortal?: boolean
  value: string[]
  onChange?: (value: string[]) => void
}

export type SelectMenuProps = HTMLChakraProps<'div'>

export type SelectValueProps = HTMLChakraProps<'div'>

export interface SelectOptionProps extends HTMLChakraProps<'div'> {
  isDisabled?: boolean
  colorScheme?: ThemeTypings['colorSchemes']
  value: string
}

export interface SelectContext {
  isDisabled?: boolean
  colorScheme?: ThemeTypings['colorSchemes']
  value: string[]
  onOptionClick: (value: string) => void
}

export const SelectContext = createContext<SelectContext>({
  value: [],
  onOptionClick: (_value) => {
    // default
  },
})
