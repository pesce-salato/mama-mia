import { getExposed } from '@/utils/get-exposed'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ExecutorServiceDomElement } from '@/services/executor/type/dom/element'
import { HiCursorClick } from 'react-icons/hi'
import { ActionButton } from '@/components/query-selector-helper-modal/action-button'
import { useTranslation } from 'react-i18next'

const services = getExposed().services

export const useDomHelper = () => {
  const [isDomHelperOpened, setIsDomHelperOpened] = useState(false)
  const [chooseElement, setChooseElement] = useState<
    ExecutorServiceDomElement | undefined
  >(undefined)
  const { t } = useTranslation()

  useEffect(
    () =>
      services.executor.pageDomSelector.events.choose((e, data) => {
        services.window.main.actions.focus()
        setChooseElement(data)
      }),
    []
  )

  useEffect(
    () =>
      services.executor.pageDomSelector.events.closed((e) => {
        setIsDomHelperOpened(false)
      }),
    []
  )

  useEffect(() => {
    return () => {
      services.executor.pageDomSelector.actions.close()
    }
  }, [])

  const closeDomHelper = useCallback(() => {
    services.executor.pageDomSelector.actions.close()
  }, [])

  const openDomHelper = useCallback(() => {
    setIsDomHelperOpened(true)
    services.executor.pageDomSelector.actions.open()
  }, [])

  const clearDomHelperState = useCallback(() => {
    setChooseElement(undefined)
  }, [])

  const DomHelperActionButton = useCallback(
    (props: { isDisabled?: boolean }) => {
      return (
        <ActionButton
          isDisabled={props.isDisabled}
          isLoading={isDomHelperOpened}
          tooltip={t('querySelectorHelper.openDomSelector')}
          loadingTooltip={t('querySelectorHelper.domSelectorOpening')}
          onClick={openDomHelper}
          ariaLabel="dom selector"
          icon={HiCursorClick}
        />
      )
    },
    [isDomHelperOpened, openDomHelper, t]
  )

  return {
    DomHelperActionButton,
    clearDomHelperState,
    chooseElement,
    isDomHelperOpened,
    closeDomHelper,
    openDomHelper,
  }
}
