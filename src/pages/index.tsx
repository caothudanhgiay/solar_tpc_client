import Head from "next/head";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>TPC SOLAR - NĂNG LƯỢNG MẶT TRỜI, GIÁ TRỊ BỀN VỮNG</title>
        <meta
          name="description"
          content="Cung cấp giải pháp năng lượng mặt trời toàn diện, thông minh và tiết kiệm cho hộ gia đình và doanh nghiệp."
        />
      </Head>
      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
      </div>
    </>
  );
}
