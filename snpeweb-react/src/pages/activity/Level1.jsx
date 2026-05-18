import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import LevelPageContent from '../../components/common/LevelPageContent'

export default function Level1() {
  const { t } = useTranslation()
  return (
    <>
      <PageBanner title={t('pages.level1')} subtitle={t('pages.level1Sub')} />
      <LevelPageContent slug="level1" />
    </>
  )
}
