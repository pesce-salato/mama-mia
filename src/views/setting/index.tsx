import { Box, Flex, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PageWrapper } from '@/components/page-wrapper'
import { LanguageSetting } from '@/views/setting/language'

export const Setting = () => {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <Heading
        size="lg"
        color="purple.500"
        textTransform="capitalize"
        marginBottom="16px"
      >
        {t('menu.setting')}
      </Heading>
      <Flex flexWrap="wrap" gap="12px">
        <LanguageSetting flex={1} />
        <Box flex={1} />
      </Flex>
    </PageWrapper>
  )
}
