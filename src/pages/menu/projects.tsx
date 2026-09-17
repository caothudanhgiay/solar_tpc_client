import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { GetStaticProps } from "next";
import { apiClient } from "@/lib/utils/apiClient";
import { API_PROJECTS, API_SSR_TIMEOUT_MS } from "@/lib/utils/constants";
import { resolveImageUrl, isOptimizableImage } from "@/lib/utils/TsoImageUtils";

interface ProjectItem {
  id: string;
  name: string;
  image: string;
}

interface ProjectsPageProps {
  projects: ProjectItem[];
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("projects_page.metaTitle")}</title>
        <meta name="description" content={t("projects_page.metaDesc")} />
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
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-20">
          <div className="text-center mb-16 page-animate">
            <h1 className="text-3xl md:text-4xl font-bold text-white uppercase mb-4">
              {t("projects_page.title") || "Dự Án Tiêu Biểu"}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-12 bg-orange-500"></div>
              <div className="w-3 h-3 rotate-45 border border-orange-500"></div>
              <div className="h-[1px] w-12 bg-orange-500"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <Link prefetch={false} key={project.id} href={`/projects/${project.id}`} className="group cursor-pointer block bg-slate-800/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 border border-white/10">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
                  {(() => {
                    const resolvedSrc = resolveImageUrl(project.image);
                    return isOptimizableImage(resolvedSrc) ? (
                      <Image
                        src={resolvedSrc}
                        alt={project.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={resolvedSrc}
                        alt={project.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    );
                  })()}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {project.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          
          {projects.length === 0 && (
            <div className="text-center text-gray-300 py-10">
              Không có dự án nào để hiển thị.
            </div>
          )}
        </div>
      </main>
    </>
  );
}

interface ApiProject {
  projectId: number;
  projectName?: string;
  projectTitle?: string;
  featuredImage?: string;
}

interface ApiResponse {
  data: ApiProject[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let mapped: ProjectItem[] = [];
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_SSR_TIMEOUT_MS);
    const res = await apiClient.get<ApiResponse>(API_PROJECTS, {
      headers: {
        'Accept-Language': locale || 'vi'
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseData = (res as any).data || res;
    const data = Array.isArray(responseData) ? responseData : [];
    
    mapped = data.map((item: ApiProject, idx: number) => ({
      id: String(item.projectId),
      name: item.projectName || item.projectTitle || "",
      image: item.featuredImage || `/images/demo${(idx % 3) + 1}.webp`,
    }));
  } catch (error) {
    console.error("Failed to fetch projects in SSR:", error);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || "vi", ["common"])),
      projects: mapped,
    },
    revalidate: 60,
  };
};
