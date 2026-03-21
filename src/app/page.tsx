import Header from "@/components/Header";
import SocialProofBar from "@/components/SocialProofBar";
import { BellaHero } from "@/components/blocks/hero-bella";
import { BellaServices } from "@/components/blocks/services-bella";
import Gallery from "@/components/Gallery";
import { BellaWhy } from "@/components/blocks/why-bella";
import { BellaTeam } from "@/components/blocks/team-bella";
import { BellaTestimonials } from "@/components/blocks/testimonials-bella";
import { BellaCTA } from "@/components/blocks/cta-bella";
import { BellaFooter } from "@/components/blocks/footer-bella";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ChatWidget } from "@/components/ui/chat-widget";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <BellaHero />
        <SocialProofBar />
        <BellaServices />
        <Gallery />
        <BellaWhy />
        <BellaTeam />
        <BellaTestimonials />
        <BellaCTA />
      </main>
      <BellaFooter />
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
