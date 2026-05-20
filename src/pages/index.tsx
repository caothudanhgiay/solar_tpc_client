import Head from "next/head";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{`TPC SOLAR - ${t("about.slogan")}`}</title>
        <meta name="description" content={t("hero.desc")} />
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "vi", ["common"])),
    },
  };
};
