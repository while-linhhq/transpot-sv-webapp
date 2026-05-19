import { PricingSection } from '@/components/usable/pricing-table';
import { HeroSection } from '../components/hero-section';
import { ServicesSection } from '../components/services-section';
import { UspSection } from '../components/usp-section';
import { ProcessSection } from '../components/process-section';
import { GallerySection } from '../components/gallery-section';
import { ProjectsTeaser } from '../components/projects-teaser';
import { ContactSection } from '../components/contact-section';

export function HomeView() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <UspSection />
      <PricingSection />
      <ProcessSection />
      <GallerySection />
      <ProjectsTeaser />
      <ContactSection />
    </>
  );
}
