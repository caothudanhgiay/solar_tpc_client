import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { GetStaticProps } from "next";

export default function NewsPage() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{`${t("header.home")} - TPC Solar`}</title>
        <meta name="description" content={t("hero.desc")} />
      </Head>
      <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/70 z-10" />
          <Image
            src="/images/bg_page.avif"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            quality={60}
            priority
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-20">
          <div className="text-center mb-16 page-animate">
            <h1 className="text-3xl md:text-4xl font-bold text-white uppercase mb-4">
              {t("header.home")}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-12 bg-orange-500"></div>
              <div className="w-3 h-3 rotate-45 border border-orange-500"></div>
              <div className="h-[1px] w-12 bg-orange-500"></div>
            </div>
            <p className="text-gray-300 mt-6">
              {t("projects_page.updating")}
            </p>
          </div>
        </div>
      </main>
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
