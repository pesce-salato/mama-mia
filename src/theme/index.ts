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
  },
})
