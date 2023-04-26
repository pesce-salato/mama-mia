import { HTMLChakraProps } from '@chakra-ui/system'
import { Box, Heading } from '@chakra-ui/react'

interface SettingCardProps extends HTMLChakraProps<'div'> {
  title: string
}
export const SettingCard = (props: SettingCardProps) => {
  const { title, children, ...otherProps } = props
  return (
    <Box
      {...otherProps}
      borderRadius="xl"
      padding="12px"
      borderWidth="2px"
      borderColor="purple.200"
    >
      <Heading textTransform="capitalize" size="md" marginBottom="16px">
        {title}
      </Heading>
      {children}
    </Box>
  )
}
