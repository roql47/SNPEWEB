import HeroSlider from '../components/home/HeroSlider'
import BrandSection from '../components/home/BrandSection'
import AboutSection from '../components/home/AboutSection'
import MovementCarousel from '../components/home/MovementCarousel'
import EffectList from '../components/home/EffectList'
import ResearchSlider from '../components/home/ResearchSlider'
import PartnerSlider from '../components/home/PartnerSlider'
import AppSection from '../components/home/AppSection'
import MainCarousel from '../components/home/MainCarousel'
import NoticePopup from '../components/common/NoticePopup'

export default function Home() {
  return (
    <>
      <NoticePopup />
      <HeroSlider />
      <BrandSection />
      <AboutSection />
      <MovementCarousel />
      <EffectList />
      <ResearchSlider />
      <PartnerSlider />
      <MainCarousel />
      <AppSection />
    </>
  )
}
