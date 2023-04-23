import { useCallback, useRef } from 'react'
import { Box, Button, Divider, Flex } from '@chakra-ui/react'
import { Booth } from '@/views/preprocess/booth'
import {
  TaskExecutor,
  type TaskExecutorRef,
} from '@/views/preprocess/task-executor'
import { useProcess } from '@/views/preprocess/process'
import { useTranslation } from 'react-i18next'
import { HiArrowSmRight } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import Style from './index.module.scss'

export const Preprocess = () => {
  const { t } = useTranslation()
  const taskExecutor = useRef<TaskExecutorRef | undefined>(undefined)
  const { isValid, isFinished } = useProcess(taskExecutor)
  const navigate = useNavigate()

  const toHomePage = useCallback(() => {
    navigate('/home')
  }, [navigate])

  return (
    <div className={Style.container}>
      <Flex alignItems="center" width="100%" height="100%">
        <Booth />
        <Box flex={1} height="100%" minHeight="0px" boxSizing="border-box">
          <Flex direction="column" gap="24px" height="100%">
            <Box flex={1} minHeight="0px">
              <TaskExecutor ref={taskExecutor} />
            </Box>
            <Divider />
            <Button
              size="lg"
              marginRight="24px"
              marginBottom="24px"
              alignSelf="flex-end"
              isLoading={!isFinished}
              isDisabled={!isValid}
              variant="ghost"
              colorScheme="purple"
              loadingText={t('common.disposing')}
              rightIcon={<HiArrowSmRight />}
              onClick={toHomePage}
            >
              {t('preprocess.enter')}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}
