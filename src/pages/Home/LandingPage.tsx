import Header from './sections/Header'
import HeroSection from './sections/HeroSection'
import StatsSection from './sections/StatsSection'
import FeaturesSection from './sections/FeaturesSection'
import ModulesSection from './sections/ModulesSection'
import BenefitsSection from './sections/BenefitsSection'
import CTASection from './sections/CTASection'
import Footer from './sections/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ModulesSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
