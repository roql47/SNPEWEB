import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import Level1Sections from '../../components/activity/Level1Sections'
import TranslatedLevelSections from '../../components/activity/TranslatedLevelSections'

export default function Level1() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.resolvedLanguage || i18n.language || 'ko').split('-')[0]

  return (
    <>
      <PageBanner
        title={t('pages.level1')}
        subtitle={t('pages.level1Sub')}
      />
      {lang === 'ko' ? <Level1Sections /> : <TranslatedLevelSections level="level1" />}
    </>
  )
}
