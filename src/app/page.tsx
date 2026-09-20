import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Club } from "@/components/sections/Club";
import { Content } from "@/components/sections/Content";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { Results } from "@/components/sections/Results";
import { Routine } from "@/components/sections/Routine";
import { SkinQuiz } from "@/components/sections/SkinQuiz";
import { TrustBar } from "@/components/sections/TrustBar";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <TrustBar />
        <SkinQuiz />
        <FeaturedProducts />
        <Routine />
        <Results />
        <Content />
        <Club />
        <InstagramStrip />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
