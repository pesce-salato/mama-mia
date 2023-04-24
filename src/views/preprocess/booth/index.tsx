import { useEffect, useRef } from 'react'
import LottieWeb, { AnimationItem } from 'lottie-web'
import Cls from 'classnames'
import AnimationData from './animation.json'
import Style from './index.module.scss'
import { Box } from '@chakra-ui/react'

export const Booth = () => {
  const lottieContainer = useRef<HTMLDivElement | null>(null)
  const lottieController = useRef<AnimationItem | null>(null)

  useEffect(() => {
    lottieController.current = LottieWeb.loadAnimation({
      container: lottieContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: AnimationData,
    })
  }, [])

  return (
    <Box className={Cls('can-be-drag', Style.root)} background="gray.50">
      <div ref={lottieContainer} className={Style.animation} />
    </Box>
  )
}
