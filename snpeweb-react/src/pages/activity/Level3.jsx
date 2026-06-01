import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import Level3Sections from '../../components/activity/Level3Sections'

export default function Level3() {
  const { t } = useTranslation()
  return (
    <>
      <PageBanner title={t('pages.level3')} subtitle={t('pages.level3Sub')} />
      <Level3Sections />
    </>
  )
}
