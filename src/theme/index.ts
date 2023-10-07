import { extendTheme } from '@chakra-ui/react'
import { Tooltip } from './tooltip'

export const theme = extendTheme({
  components: {
    Tooltip,
    Button: {
      defaultProps: {
        colorScheme: 'purple',
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'purple.500',
      },
    },
    Spinner: {
      defaultProps: {
        colorScheme: 'purple',
      },
    },
  },
})
