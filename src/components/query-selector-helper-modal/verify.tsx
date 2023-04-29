import { useCallback, useState } from 'react'
import { ActionButton } from './action-button'
import { HiPlay } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { getExposed } from '@/utils/get-exposed'

const services = getExposed().services

export const useVerify = (value: string) => {
  const { t } = useTranslation()
  const [isInVerifying, setIsInVerifying] = useState(false)

  const verifySelector = useCallback(async () => {
    setIsInVerifying(true)
    const result = await services.executor.pageDomSelector.actions.verify(value)
    services.window.main.actions.focus()
    console.error(result)
    setIsInVerifying(false)
  }, [value])

  const OpenVerifyBrowserActionButton = useCallback(
    (props: { isDisabled?: boolean }) => {
      return (
        <ActionButton
          icon={HiPlay}
          ariaLabel="verify"
          onClick={verifySelector}
          tooltip={t('querySelectorHelper.verify')}
          isDisabled={props.isDisabled}
        />
      )
    },
    [t, verifySelector]
  )

  return { OpenVerifyBrowserActionButton, isInVerifying }
}
