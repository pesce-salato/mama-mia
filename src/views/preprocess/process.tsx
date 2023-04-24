import { MutableRefObject, useEffect, useState } from 'react'
import { TaskExecutorRef } from '@/views/preprocess/task-executor'
import { getExposed } from '@/utils/get-exposed'
import { useTranslation } from 'react-i18next'
import { Icon } from '@chakra-ui/react'
import { HiOutlineChip, HiPaperClip } from 'react-icons/hi'
import { waitUtilRegisterEventTriggered } from '@/utils/render-event/wait-util-register-event-triggered'
import { throttle } from 'lodash'

const services = getExposed().services

const AppIconBox = <Icon color="purple.500" as={HiPaperClip} />

const ExecutorIcon = <Icon color="cyan.500" as={HiOutlineChip} />

export const useProcess = (executor: MutableRefObject<TaskExecutorRef>) => {
  const { t } = useTranslation()
  const [isFinished, setIsFinished] = useState(false)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    ;(async () => {
      await executor.current.execute({
        message: t('preprocess.hello'),
        icon: AppIconBox,
      })
      await executor.current.execute({
        message: t('preprocess.start'),
        icon: AppIconBox,
      })
      await executor.current.execute({
        message: t('preprocess.checkExecutor'),
        icon: ExecutorIcon,
        executor: () => {
          services.executor.selfCheck.actions.start()
          return true
        },
      })

      services.executor.selfCheck.events.beforeDownload((event, data) => {
        executor.current.execute({
          message: t('preprocess.beforeDownload', { revision: data.revision }),
          icon: ExecutorIcon,
        })
        executor.current.execute({
          message: t('common.downloading', { reversion: data.revision }),
          icon: ExecutorIcon,
          executor: async (onProgress) => {
            services.executor.selfCheck.events.downloading(
              throttle((event, { current, total }) => {
                onProgress(current / total)
              }, 1000)
            )

            const {
              data: { succeed, message },
            } = await waitUtilRegisterEventTriggered(
              services.executor.selfCheck.events.afterDownload
            )

            if (message) {
              executor.current.execute({
                message,
                icon: ExecutorIcon,
                executor: () => false,
              })
            }

            return succeed
          },
        })
      })

      const {
        data: { succeed },
      } = await waitUtilRegisterEventTriggered(
        services.executor.selfCheck.events.end
      )

      await executor.current.execute({
        message: succeed ? t('common.finished') : t('common.failed'),
        icon: ExecutorIcon,
        executor: () => succeed,
      })

      setIsValid(succeed)
      setIsFinished(true)
    })()
  }, [])

  return { isValid, isFinished }
}
