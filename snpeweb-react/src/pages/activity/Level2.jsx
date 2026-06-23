import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import Level2Sections from '../../components/activity/Level2Sections'
import TranslatedLevelSections from '../../components/activity/TranslatedLevelSections'

export default function Level2() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.resolvedLanguage || i18n.language || 'ko').split('-')[0]

  return (
    <>
      <PageBanner title={t('pages.level2')} subtitle={t('pages.level2Sub')} />
      {lang === 'ko' ? <Level2Sections /> : <TranslatedLevelSections level="level2" />}
    </>
  )
}
