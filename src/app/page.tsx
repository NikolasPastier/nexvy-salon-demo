import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import ServiceGrid from "@/components/ServiceGrid";
import Gallery from "@/components/Gallery";
import WhyUs from "@/components/WhyUs";
import TeamSection from "@/components/TeamSection";
import ReviewCarousel from "@/components/ReviewCarousel";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProofBar />
        <ServiceGrid />
        <Gallery />
        <WhyUs />
        <TeamSection />
        <ReviewCarousel />
        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
