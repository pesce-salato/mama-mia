import { AppIcon } from '@/resources/icons/app'
import Style from './index.module.scss'
import { Divider, Flex, Text, Wrap } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import LottieWeb, { AnimationItem } from 'lottie-web'
import AnimationData from './animation.json'

export const Preprocess = () => {
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
    <div className={Style.container}>
      <Flex alignItems={'center'} width="100%" height="100%">
        <div ref={lottieContainer} className={Style.animation} />
        <Divider orientation="vertical" />
        <Wrap flex={1} height="100%"></Wrap>
      </Flex>
    </div>
  )
}
