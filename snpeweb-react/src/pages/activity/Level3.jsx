import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import Level3Sections from '../../components/activity/Level3Sections'
import TranslatedLevelSections from '../../components/activity/TranslatedLevelSections'

export default function Level3() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.resolvedLanguage || i18n.language || 'ko').split('-')[0]

  return (
    <>
      <PageBanner title={t('pages.level3')} subtitle={t('pages.level3Sub')} />
      {lang === 'ko' ? <Level3Sections /> : <TranslatedLevelSections level="level3" />}
    </>
  )
}
