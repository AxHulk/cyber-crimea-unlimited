import HudNavbar from "@/components/HudNavbar";
import HeroScene from "@/components/HeroScene";
import BentoGrid from "@/components/BentoGrid";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scanline">
      <HudNavbar />
      <main>
        <HeroScene />
        <BentoGrid />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
