import { HTMLChakraProps } from '@chakra-ui/system'
import { Box } from '@chakra-ui/react'

export const PageWrapper = (props: HTMLChakraProps<'div'>) => {
  return <Box padding="12px" boxSizing="border-box" {...props} />
}
