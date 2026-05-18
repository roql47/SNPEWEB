import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import LevelPageContent from '../../components/common/LevelPageContent'

export default function Level3() {
  const { t } = useTranslation()
  return (
    <>
      <PageBanner title={t('pages.level3')} subtitle={t('pages.level3Sub')} />
      <LevelPageContent slug="level3" />
    </>
  )
}
