import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  type ReactNode,
} from 'react'
import { nanoid } from 'nanoid'
import { Flex } from '@chakra-ui/react'
import { Showcase } from '@/views/preprocess/task-executor/showcase'
import { Scrollbar } from '@/components/scrollbar'
import Style from './index.module.scss'

export interface Task {
  executor?: (
    onProgress: (percentage: number) => void
  ) => Promise<boolean> | boolean
  message: string
  icon: string | ReactNode
}

export interface TaskContext {
  id: string
  finished: boolean
  loading?: boolean
  result?: boolean
  progress?: number
}

export interface TaskExecutorRef {
  execute: (task: Task) => Promise<boolean>
}

export const TaskExecutor = forwardRef<TaskExecutorRef>((props, ref) => {
  const [tasks, setTasks] = useState<(Task & TaskContext)[]>([])

  const setTaskContext = useCallback(
    (context: Partial<TaskContext>, id: string) => {
      setTasks((pre) => {
        const result = [...pre]
        const index = result.findIndex((item) => item.id === id)
        result[index] = { ...result[index], ...context }
        return result
      })
    },
    [setTasks]
  )

  const add = (task: Task & TaskContext) => {
    setTasks((pre) => [...pre, task])
  }

  const execute = useCallback(
    async (task: Task) => {
      const id = nanoid()

      if (!task.executor) {
        add({ ...task, finished: true, result: true, id })
        return true
      } else {
        add({ ...task, finished: false, id })
        let executeResult = task.executor((percentage) => {
          setTaskContext({ progress: percentage }, id)
        })
        if (typeof executeResult !== 'boolean') {
          setTaskContext({ loading: true }, id)
          executeResult = await executeResult
        }

        setTaskContext({ result: executeResult as boolean, finished: true }, id)

        return executeResult
      }
    },
    [setTasks, setTaskContext, add]
  )

  useImperativeHandle(ref, () => ({ execute }))

  return (
    <Scrollbar className={Style.root} onlyScrollVisible>
      <Flex direction="column" gap={4}>
        {tasks.map((task) => (
          <Showcase data={task} key={task.id} />
        ))}
      </Flex>
    </Scrollbar>
  )
})
