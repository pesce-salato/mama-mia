import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import {
  Button,
  CircularProgress,
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
import { useTranslation } from 'react-i18next'
import { getExposed } from '@/utils/get-exposed'
import {
  HiInboxIn,
  HiOutlineShieldCheck,
  HiTerminal,
  HiOutlineShieldExclamation,
} from 'react-icons/hi'

export interface ImportPluginModalRef {
  open: () => void
}

enum Status {
  select,
  checking,
  importing,
  succeed,
  error,
}

const services = getExposed().services

export const ImportPluginModal = forwardRef<ImportPluginModalRef>(
  (_props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [status, setStatus] = useState(Status.select)
    const [message, setMessage] = useState('')

    const { t } = useTranslation()

    const clearState = useCallback(() => {
      setStatus(Status.select)
      setMessage('')
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

    const importOrLinkPlugin = useCallback(
      async (path: string, isLink: boolean) => {
        setMessage(t('plugin.checkPlugin'))
        setStatus(Status.checking)
        const checkResult = await services.plugin.base.actions.check(path)
        let errorMsg = ''

        if (checkResult.data) {
          setStatus(Status.importing)

          const { data: succeed, msg } = await (isLink
            ? services.plugin.base.actions.link
            : services.plugin.base.actions.import)(path)

          if (succeed) {
            setStatus(Status.succeed)
            setMessage(
              isLink ? t('plugin.link.succeed') : t('plugin.import.succeed')
            )
            return
          } else {
            errorMsg = msg
          }
        } else {
          console.error('error', checkResult.msg)
          errorMsg = checkResult.msg
        }

        setStatus(Status.error)
        setMessage(errorMsg)
      },
      []
    )

    const openImportPluginDialog = useCallback(async () => {
      const result = await services.tool.dialog.actions.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Plugin', extensions: ['zip'] }],
        title: t('plugin.import.modalTitle'),
      })

      if (result.length >= 1) {
        importOrLinkPlugin(result[0], false)
      }
    }, [importOrLinkPlugin])

    const openLinkToLocalDevDirDialog = useCallback(async () => {
      const result = await services.tool.dialog.actions.showOpenDialog({
        properties: ['openDirectory'],
        title: t('plugin.link.modalTitle'),
      })

      if (result.length >= 1) {
        importOrLinkPlugin(result[0], true)
      }
    }, [importOrLinkPlugin])

    const selectPart = useMemo(
      () => (
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
      ),
      [openImportPluginDialog, openLinkToLocalDevDirDialog]
    )

    const isInLoading = useMemo(
      () => [Status.importing, Status.checking].includes(status),
      [status]
    )

    const messagePart = useMemo(() => {
      return (
        <Flex
          alignItems="center"
          justifyContent="center"
          paddingY={2}
          gap={3}
          flexDirection="column"
        >
          {isInLoading && (
            <CircularProgress
              color="purple.500"
              isIndeterminate
              capIsRound
              size="36px"
            />
          )}
          {!isInLoading && (
            <Icon
              fontSize="36px"
              color={status === Status.succeed ? 'green.500' : 'red.500'}
              as={
                status === Status.succeed
                  ? HiOutlineShieldCheck
                  : HiOutlineShieldExclamation
              }
            />
          )}
          <Text>{message}</Text>
        </Flex>
      )
    }, [isInLoading, message, status])

    return (
      <Modal
        isOpen={isVisible}
        onClose={onCloseModal}
        size="md"
        closeOnOverlayClick={!isInLoading}
      >
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader>
            <Text textTransform="capitalize" color="purple.500">
              {t('plugin.importOrLink')}
            </Text>
          </ModalHeader>
          <ModalCloseButton disabled={isInLoading} />
          <ModalBody marginBottom="16px">
            {status === Status.select && selectPart}
            {status !== Status.select && messagePart}
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
)
