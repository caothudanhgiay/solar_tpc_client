import Head from "next/head";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";

import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { apiClient } from "@/lib/utils/apiClient";
import { API_HOME } from "@/lib/utils/constants";

// Lazy load các sections below-the-fold — chỉ HeroSection cần tải ngay
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));

interface HomeProps {
  projects: any[];
  services: any[];
}

export default function Home({ projects, services }: HomeProps) {
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
        <ProjectsSection projects={projects} />
        <ServicesSection services={services} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let menus: any[] = [];
  let projects: any[] = [];
  let services: any[] = [];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res: any = await apiClient.get(API_HOME, { signal: controller.signal });
    clearTimeout(timeout);
    menus = res?.data?.menus ?? [];
    projects = res?.data?.projects ?? [];
    services = res?.data?.services ?? [];
  } catch (error) {
    console.warn("Failed to fetch home data from /api/home:", error);
  }

  return {
    props: {
      menus,
      projects,
      services,
      ...(await serverSideTranslations(locale || "vi", ["common"])),
    },
    // ISR: cache HTML tĩnh ở Cloudflare, chỉ render lại ngầm sau mỗi 60s thay vì mỗi request
    revalidate: 60,
  };
};
