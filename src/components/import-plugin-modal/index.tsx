import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { CredentialDetail } from '@/services/credential/type/detail'
import { useTranslation } from 'react-i18next'
import { getExposed } from '@/utils/get-exposed'
import { HiInboxIn, HiTerminal } from 'react-icons/hi'

export interface ImportPluginModalRef {
  open: () => void
}

const services = getExposed().services

export const ImportPluginModal = forwardRef<ImportPluginModalRef>(
  (_props, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    const { t } = useTranslation()

    const clearState = useCallback(() => {
      // default
    }, [])

    const open = useCallback(() => {
      setIsVisible(true)
    }, [])

    const onCloseModal = useCallback(() => {
      clearState()
      setIsVisible(false)
    }, [])

    useImperativeHandle(ref, () => ({
      open,
    }))

    const openImportPluginDialog = useCallback(async () => {
      const result = await services.tool.dialog.actions.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Plugin', extensions: ['zip'] }],
        title: t('plugin.import.modalTitle'),
      })
    }, [])

    const openLinkToLocalDevDirDialog = useCallback(async () => {
      const result = await services.tool.dialog.actions.showOpenDialog({
        properties: ['openDirectory'],
        title: t('plugin.link.modalTitle'),
      })
      console.error(result)
    }, [])

    return (
      <Modal isOpen={isVisible} onClose={onCloseModal} size="md">
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader>
            <Text textTransform="capitalize" color="purple.500">
              {t('plugin.importOrLink')}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom="16px">
            <Flex
              flexDirection="column"
              borderStyle="dashed"
              borderWidth="2px"
              paddingY="12px"
              paddingX="8px"
              borderColor="gray.200"
              borderRadius="md"
              alignItems="center"
              gap="12px"
            >
              <Icon as={HiInboxIn} fontSize="36px" color="purple.500" />
              <Text>{t('plugin.dragToImport')}</Text>
              <Flex gap="12px" justifyContent="center">
                <Button
                  leftIcon={<Icon as={HiInboxIn} fontSize="20px" />}
                  onClick={openImportPluginDialog}
                >
                  {t('common.import')}
                </Button>
                <Button
                  leftIcon={<Icon as={HiTerminal} fontSize="20px" />}
                  colorScheme="blue"
                  onClick={openLinkToLocalDevDirDialog}
                >
                  {t('common.link')}
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
)
