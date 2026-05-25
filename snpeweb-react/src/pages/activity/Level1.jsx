import { useTranslation } from 'react-i18next'
import PageBanner from '../../components/common/PageBanner'
import Level1Sections from '../../components/activity/Level1Sections'

export default function Level1() {
  const { t } = useTranslation()
  return (
    <>
      <PageBanner
        title={t('pages.level1')}
        subtitle={t('pages.level1Sub')}
      />
      <Level1Sections />
    </>
  )
}
