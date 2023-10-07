import { MutableRefObject, useEffect, useState } from 'react'
import { Task, TaskExecutorRef } from '@/views/preprocess/task-executor'
import { getExposed } from '@/utils/get-exposed'
import { useTranslation } from 'react-i18next'
import { Icon } from '@chakra-ui/react'
import {
  HiIdentification,
  HiOutlineChip,
  HiPaperClip,
  HiPuzzle,
  HiFolder,
} from 'react-icons/hi'
import { waitUtilRegisterEventTriggered } from '@/utils/render-event/wait-util-register-event-triggered'
import { throttle } from 'lodash'

const services = getExposed().services

const AppIconBox = <Icon color="purple.500" as={HiPaperClip} />

const ExecutorIcon = <Icon color="cyan.500" as={HiOutlineChip} />

const CredentialIcon = <Icon color="cyan.500" as={HiIdentification} />

const PluginIcon = <Icon color="cyan.500" as={HiPuzzle} />

const IoIcon = <Icon color="cyan.500" as={HiFolder} />

export const useProcess = (executor: MutableRefObject<TaskExecutorRef>) => {
  const { t } = useTranslation()
  const [isFinished, setIsFinished] = useState(false)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    ;(async () => {
      const tasks: Task[] = [
        {
          message: t('preprocess.hello'),
          icon: AppIconBox,
        },
        {
          message: t('preprocess.start'),
          icon: AppIconBox,
        },
        {
          message: t('preprocess.initIoService'),
          icon: IoIcon,
          executor: async () => {
            const { data, msg } = await services.io.base.actions.init()

            if (!data) {
              await executor.current.execute({
                message: msg,
                icon: IoIcon,
                executor: () => false,
              })
            }
            return data
          },
        },
        {
          message: t('preprocess.initExecutorService'),
          icon: ExecutorIcon,
          executor: async () => {
            services.executor.selfCheck.actions.start()
            services.executor.selfCheck.events.beforeDownload((event, data) => {
              executor.current.execute({
                message: t('preprocess.beforeDownload', {
                  revision: data.revision,
                }),
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
                    await executor.current.execute({
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

            return succeed
          },
        },
        {
          message: t('preprocess.initCredentialService'),
          icon: CredentialIcon,
          executor: async () => {
            const { data, msg } = await services.credential.base.actions.init()

            if (!data) {
              await executor.current.execute({
                message: msg,
                icon: CredentialIcon,
                executor: () => false,
              })
            }
            return data
          },
        },
        {
          message: t('preprocess.initPluginService'),
          icon: PluginIcon,
          executor: async () => {
            const { data, msg } = await services.plugin.base.actions.init()

            if (!data) {
              await executor.current.execute({
                message: msg,
                icon: PluginIcon,
                executor: () => false,
              })
            }
            return data
          },
        },
      ]

      let result = true
      for (const task of tasks) {
        result = await executor.current.execute(task)

        if (!result) {
          break
        }
      }

      await executor.current.execute({
        message: result ? t('common.finished') : t('common.failed'),
        icon: AppIconBox,
        executor: () => result,
      })

      setIsValid(result)
      setIsFinished(true)
    })()
  }, [])

  return { isValid, isFinished }
}
