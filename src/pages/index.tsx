import Head from "next/head";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";

import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next/pages";

// Lazy load các sections below-the-fold — chỉ HeroSection cần tải ngay
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));

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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "vi", ["common"])),
    },
  };
};
