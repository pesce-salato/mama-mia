import { Box, Button } from '@chakra-ui/react'
import { useCallback, useRef } from 'react'
import {
  ImportPluginModal,
  ImportPluginModalRef,
} from '@/components/import-plugin-modal'

export const Plugins = () => {
  const importModalRef = useRef<ImportPluginModalRef | null>()

  const openImportModal = useCallback(() => {
    importModalRef.current.open()
  }, [])

  return (
    <Box>
      <Button onClick={openImportModal}>Open</Button>
      <ImportPluginModal ref={importModalRef} />
    </Box>
  )
}
