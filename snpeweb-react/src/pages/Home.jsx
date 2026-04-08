import HeroSlider from '../components/home/HeroSlider'
import AboutSection from '../components/home/AboutSection'
import MovementCarousel from '../components/home/MovementCarousel'
import EffectList from '../components/home/EffectList'
import ResearchSlider from '../components/home/ResearchSlider'
import PartnerSlider from '../components/home/PartnerSlider'
import AppSection from '../components/home/AppSection'
import MainCarousel from '../components/home/MainCarousel'

export default function Home() {
  return (
    <>
      <HeroSlider />
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
