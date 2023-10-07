import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
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

export interface CredentialHelperModalRef {
  open: (credential?: CredentialDetail) => void
}

const services = getExposed().services

export const CredentialHelperModal = forwardRef<CredentialHelperModalRef>(
  (_props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [credential, setCredential] = useState<CredentialDetail | undefined>()
    const [isInEdit, setIsInEdit] = useState(false)

    const { t } = useTranslation()

    const clearState = useCallback(() => {
      setIsInEdit(false)
    }, [])

    const open = useCallback((credential?: CredentialDetail) => {
      setCredential(credential)
      setIsInEdit(!!credential)
      setIsVisible(true)
    }, [])

    const onCloseModal = useCallback(() => {
      clearState()
      setIsVisible(false)
    }, [])

    useImperativeHandle(ref, () => ({
      open,
    }))

    useEffect(() => {
      const test = async () => {
        const result = await services.plugin.base.actions.search()
        console.error(result)
      }

      test()
    }, [])

    return (
      <Modal isOpen={isVisible} onClose={onCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader>
            <Text textTransform="capitalize" color="purple.500">
              {isInEdit
                ? t('credential.edit.title')
                : t('credential.create.title')}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom="16px">
            <FormControl isRequired>
              <FormLabel></FormLabel>
            </FormControl>
            <Button
              onClick={async () => {
                console.error(
                  await services.credential.base.actions.usePluginToGetCredential(
                    ''
                  )
                )
              }}
            >
              test
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
)
