import { PricingSection } from '@/components/usable/pricing-table';
import { HeroSection } from '../components/hero-section';
import { ServiceMarquee } from '../components/service-marquee';
import { ServicesSection } from '../components/services-section';
import { UspSection } from '../components/usp-section';
import { ProcessSection } from '../components/process-section';
import { GallerySection } from '../components/gallery-section';
import { TestimonialsSection } from '../components/testimonials-section';
import { ContactSection } from '../components/contact-section';

export function HomeView() {
  return (
    <>
      <HeroSection />
      <ServiceMarquee />
      <ServicesSection />
      <UspSection />
      <PricingSection />
      <ProcessSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
