import HeroSection from '../components/sections/HeroSection.jsx';
import PackagesSection from '../components/sections/PackagesSection.jsx';
import TimelineSection from '../components/sections/TimelineSection.jsx';
import CasesSection from '../components/sections/CasesSection.jsx';
import TestimonialsSection from '../components/sections/TestimonialsSection.jsx';
import FaqSection from '../components/sections/FaqSection.jsx';
import ContactsSection from '../components/sections/ContactsSection.jsx';
import CtaBannerSection from '../components/sections/CtaBannerSection.jsx';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PackagesSection />
      <TimelineSection />
      <CasesSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactsSection />
      <CtaBannerSection />
    </>
  );
}
