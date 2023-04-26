import { Language, useSetLng } from '@/i18n/lng'
import { useTranslation } from 'react-i18next'
import { SimpleSelect, SimpleSelectOption } from '@/components/simple-select'
import { HTMLChakraProps } from '@chakra-ui/system'
import { SettingCard } from '@/views/setting/card'

const SupportLanguageList: SimpleSelectOption[] = [
  {
    id: Language.zh,
    title: '中文',
  },
  {
    id: Language.en,
    title: 'english',
  },
]

export const LanguageSetting = (props: HTMLChakraProps<'div'>) => {
  const { t, i18n } = useTranslation()
  const setLanguage = useSetLng()

  return (
    <SettingCard title={t('common.language')} {...props}>
      <SimpleSelect
        data={SupportLanguageList}
        value={i18n.language}
        onChange={setLanguage}
      />
    </SettingCard>
  )
}
