import { Box, Button } from '@chakra-ui/react'
import {
  CredentialHelperModal,
  CredentialHelperModalRef,
} from '@/components/credential-helper-modal'
import { useCallback, useRef } from 'react'

export const Credentials = () => {
  const helperModalRef = useRef<CredentialHelperModalRef | null>()

  const openHelperModal = useCallback(() => {
    helperModalRef.current.open()
  }, [])

  return (
    <Box>
      <Button onClick={openHelperModal}>Open</Button>
      <CredentialHelperModal ref={helperModalRef} />
    </Box>
  )
}
