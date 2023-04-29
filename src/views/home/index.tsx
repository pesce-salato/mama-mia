import { Box, Button } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import {
  QuerySelectorHelperModal,
  QuerySelectorHelperModalRef,
} from '@/components/query-selector-helper-modal'

export const Home = () => {
  const [value, setValue] = useState([])
  const querySelectorHelperModal = useRef<QuerySelectorHelperModalRef | null>(
    null
  )

  return (
    <Box width="100%">
      <Button onClick={() => querySelectorHelperModal.current.open()}>
        Open
      </Button>
      <QuerySelectorHelperModal ref={querySelectorHelperModal} />
    </Box>
  )
}
