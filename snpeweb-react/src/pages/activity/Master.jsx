import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import LevelPageContent from '../../components/common/LevelPageContent'

export default function Master() {
  const { t } = useTranslation()
  return (
    <>
      <PageBanner title={t('pages.master')} subtitle={t('pages.masterSub')} />
      <LevelPageContent slug="master" />
    </>
  )
}
