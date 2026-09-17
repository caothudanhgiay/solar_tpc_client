import { useState, useEffect } from "react";
import Head from "next/head";
import { ChevronRight, Settings, Wrench, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { GetStaticProps } from "next";
import { apiClient } from "@/lib/utils/apiClient";
import { API_SERVICES, API_ITEM_GROUPS, API_URL } from "@/lib/utils/constants";

// Backend không có field icon riêng cho từng nhóm dịch vụ — lặp vòng qua bộ icon cố định này
const CATEGORY_ICONS = [Zap, Settings, ShieldCheck, Wrench];
const FALLBACK_IMAGES = ["/images/demo2.webp", "/images/demo3.webp", "/images/demo1.webp", "/images/demo4.webp"];

interface ServiceItem {
  id: string;
  group: string;
  title: string;
  image: string;
  desc: string;
}

export default function ServicesPage({ services: rawServices = [], groups = [] }: { services?: any[], groups?: any[] }) {
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const services: ServiceItem[] = rawServices.map((item: any, idx: number) => ({
    id: String(item.serviceId ?? idx),
    group: item.serviceGroup || "",
    title: item.serviceName || "",
    desc: item.serviceDescription || "",
    image: item.serviceImage
      ? (item.serviceImage.startsWith("/upload") ? `${API_URL}${item.serviceImage}` : item.serviceImage)
      : FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
  }));

  // Danh mục lấy từ backend bảng tso_item_mst
  const categories = groups.map((g: any) => ({
    code: g.groupItemCode,
    name: g.groupItemName,
  }));

  useEffect(() => {
    const category = searchParams?.get("category");
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const filteredServices = activeCategory === "all"
    ? services
    : services.filter((s) => s.group === activeCategory);


  return (
    <>
      <Head>
        <title>{t("services_page.metaTitle")}</title>
        <meta name="description" content={t("services_page.metaDesc")} />
      </Head>

      <main className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-slate-950">
        {/* Background elements — dùng <Image> thay CSS backgroundImage */}
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

        <div className="container mx-auto px-4 md:px-6 max-w-8xl relative z-20">

          {/* Breadcrumb / Title area */}
          <div className="mb-10 pb-6 border-b border-white/10 page-animate">
            <h1 className="text-3xl font-bold text-white uppercase tracking-wider">{t("services_page.title")}</h1>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
              <Link prefetch={false} href="/" className="hover:text-orange-500 transition-colors">{t("header.home")}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-orange-500 font-medium">{t("header.services")}</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar (DANH MỤC DỊCH VỤ) */}
            <div className="lg:w-1/4 shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden sticky top-32">
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4">
                  <h2 className="text-lg font-bold text-white uppercase">{t("services_page.title")}</h2>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 group mb-1",
                      activeCategory === "all"
                        ? "bg-white/10 text-orange-400"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {t("services_page.allServices")}
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      activeCategory === "all" ? "translate-x-1 text-orange-400" : "text-gray-500 group-hover:translate-x-1"
                    )} />
                  </button>

                  {categories.map((cat, idx) => (
                    <button
                      key={cat.code}
                      onClick={() => setActiveCategory(cat.code)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 group mb-1",
                        activeCategory === cat.code
                          ? "bg-white/10 text-orange-400"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span className="flex-1 pr-4 line-clamp-2">{cat.name}</span>
                      <ChevronRight className={cn(
                        "w-4 h-4 shrink-0 transition-transform",
                        activeCategory === cat.code ? "translate-x-1 text-orange-400" : "text-gray-500 group-hover:translate-x-1"
                      )} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content (Grid) — CSS transition thay Framer Motion layout */}
            <div className="lg:w-3/4">
              <div className={filteredServices.length >= 4
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              }>
                {filteredServices.map((service, idx) => {
                  const Icon = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
                  return (
                    <div
                      key={service.id}
                      className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden group hover:border-orange-500/50 hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] transition-all duration-300 flex flex-col page-animate"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {/* Image */}
                      <div className="relative h-48 w-full overflow-hidden">
                        {service.image.startsWith("http") ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow relative">
                        <div className="absolute -top-6 right-5 bg-orange-500 p-2.5 rounded-xl shadow-lg shadow-orange-500/30 group-hover:-translate-y-1 transition-transform">
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-3 mt-2 line-clamp-2 group-hover:text-orange-400 transition-colors uppercase leading-snug">
                          {service.title}
                        </h3>

                        <p className="text-sm text-gray-400 mb-6 line-clamp-3 flex-grow">
                          {service.desc}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                          <span className="text-orange-400 font-bold text-lg">{t("services_page.contactPrice")}</span>
                          <Link prefetch={false}
                            href={`/menu/contact`}
                            className="text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-orange-500 px-4 py-2 rounded-lg transition-colors"
                          >
                            {t("services_page.btnDetails")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  {t("services_page.notFound")}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let services: any[] = [];
  let groups: any[] = [];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const [servicesRes, groupsRes]: [any, any] = await Promise.all([
      apiClient.get(API_SERVICES, { signal: controller.signal }).catch(e => {
        console.warn("Failed to fetch services:", e);
        return { data: [] };
      }),
      apiClient.get(`${API_ITEM_GROUPS}?itemCode=10001`, { signal: controller.signal }).catch(e => {
        console.warn("Failed to fetch groups:", e);
        return { data: { data: [] } }; // the response is nested { statusCode: 200, data: [...] }
      })
    ]);
    
    clearTimeout(timeout);
    services = servicesRes?.data ?? [];
    
    // TsoApiResponse structure wraps the array in data.data
    if (groupsRes?.data?.data) {
      groups = groupsRes.data.data;
    } else if (Array.isArray(groupsRes?.data)) {
      groups = groupsRes.data;
    }
  } catch (error) {
    console.warn("Failed to fetch data:", error);
  }

  return {
    props: {
      services,
      groups,
      ...(await serverSideTranslations(locale || "vi", ["common"])),
    },
    revalidate: 60,
  };
};
