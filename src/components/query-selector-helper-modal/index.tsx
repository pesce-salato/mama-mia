import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useDomHelper } from '@/components/query-selector-helper-modal/dom-helper'
import { useTranslation } from 'react-i18next'
import { HiLightningBolt } from 'react-icons/hi'
import { useVerify } from '@/components/query-selector-helper-modal/verify'

export interface QuerySelectorHelperModalRef {
  open: () => void
}

export const QuerySelectorHelperModal = forwardRef((_props, ref) => {
  const [value, setValue] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()
  const {
    clearDomHelperState,
    chooseElement,
    closeDomHelper,
    DomHelperActionButton,
    isDomHelperOpened,
  } = useDomHelper()
  const { OpenVerifyBrowserActionButton } = useVerify(value)

  const open = useCallback(() => {
    clearDomHelperState()
    setIsVisible(true)
  }, [])

  const onCloseModal = useCallback(() => {
    closeDomHelper()
    setIsVisible(false)
  }, [])

  useImperativeHandle(ref, () => ({
    open,
  }))

  return (
    <Modal isOpen={isVisible} onClose={onCloseModal} size="4xl">
      <ModalOverlay />
      <ModalContent borderRadius="xl">
        <ModalHeader>
          <Text textTransform="capitalize" color="purple.500">
            {t('querySelectorHelper.title')}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody marginBottom="16px">
          <Flex marginBottom="16px" alignItems="center" gap="8px">
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300">
                <HiLightningBolt />
              </InputLeftElement>
              <Input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={t('querySelectorHelper.selectorInputPlaceholder')}
              />
            </InputGroup>
            <OpenVerifyBrowserActionButton isDisabled={!isDomHelperOpened} />
            <DomHelperActionButton />
          </Flex>
          <Flex gap="24px" height="320px" overflow="hidden">
            {JSON.stringify(chooseElement || {}, null, 2)}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})
