import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import Level2Sections from '../../components/activity/Level2Sections'

export default function Level2() {
  const { t } = useTranslation()
  return (
    <>
      <PageBanner title={t('pages.level2')} subtitle={t('pages.level2Sub')} />
      <Level2Sections />
    </>
  )
}
