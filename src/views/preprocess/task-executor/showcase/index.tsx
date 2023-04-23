import { Task, TaskContext } from '../'
import {
  Box,
  CircularProgress,
  Flex,
  Image,
  SlideFade,
  Text,
} from '@chakra-ui/react'

export const Showcase = (props: { data: Task & TaskContext }) => {
  const {
    data: { message, icon, loading, progress, result },
  } = props

  return (
    <SlideFade in>
      <Box
        borderRadius="md"
        shadow="md"
        paddingX={1}
        paddingY={2}
        background={loading || result ? 'gray.50' : 'red.100'}
      >
        <Flex gap={4}>
          <Box>
            <Flex
              width="24px"
              height="24px"
              fontSize="24px"
              alignItems="center"
              justifyContent="center"
            >
              {typeof icon === 'string' ? <Image src={icon} /> : icon}
            </Flex>
          </Box>
          <Text color="gray.500" fontWeight="bold" flex={1}>
            {message}
          </Text>
          <CircularProgress
            visibility={loading ? 'visible' : 'hidden'}
            color="purple.500"
            capIsRound
            value={progress}
            size="24px"
            max={1}
          />
        </Flex>
      </Box>
    </SlideFade>
  )
}
