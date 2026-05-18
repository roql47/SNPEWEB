import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import LevelPageContent from '../../components/common/LevelPageContent'

export default function Level2() {
  const { t } = useTranslation()
  return (
    <>
      <PageBanner title={t('pages.level2')} subtitle={t('pages.level2Sub')} />
      <LevelPageContent slug="level2" />
    </>
  )
}
