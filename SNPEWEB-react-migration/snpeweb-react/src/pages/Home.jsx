import HeroSlider from '../components/home/HeroSlider'
import MainCarousel from '../components/home/MainCarousel'
import AboutSection from '../components/home/AboutSection'
import MovementCarousel from '../components/home/MovementCarousel'
import EffectList from '../components/home/EffectList'
import ResearchSlider from '../components/home/ResearchSlider'
import PartnerSlider from '../components/home/PartnerSlider'
import AppSection from '../components/home/AppSection'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <MainCarousel />
      <AboutSection />
      <MovementCarousel />
      <EffectList />
      <ResearchSlider />
      <PartnerSlider />
      <AppSection />
    </>
  )
}
