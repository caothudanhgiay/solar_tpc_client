import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { GetServerSideProps } from "next";
import { Zap, MapPin, Calendar, CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { apiClient } from "@/lib/utils/apiClient";
import { API_PROJECTS, API_URL } from "@/lib/utils/constants";

interface ProjectDetail {
  projectDetailId: number;
  projectCode: string;
  imageUrl: string;
  content: string;
  constructionDate: string;
}

interface ProjectData {
  projectId: number;
  projectCode: string;
  projectTitle: string;
  projectName: string;
  description: string;
  projectAddress: string;
  solarPower: number;
  savingPower: number;
  processStatus: number;
  processStatusName: string;
  startDate: string;
  endDate: string;
  featuredImage: string;
  isFeatured: number;
  details: ProjectDetail[];
}

export default function ProjectDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation("common");

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res: any = await apiClient.get(`${API_PROJECTS}/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const getImageSrc = (url: string | undefined, defaultImg: string) => {
    if (!url) return defaultImg;
    if (url.startsWith("http")) return url;
    if (url.startsWith("/upload")) return `${API_URL}${url}`; // Mặc định ở backend là localhost:8080
    return url;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <h1 className="text-4xl font-bold mb-4">{t('project_detail.notFound')}</h1>
        <Link href="/" className="text-orange-400 hover:underline flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" /> {t('project_detail.backToHome')}
        </Link>
      </div>
    );
  }

  const featuredImg = getImageSrc(project.featuredImage, "/images/bg_page.avif");

  return (
    <>
      <Head>
        <title>{project.projectName} | TPC Solar</title>
        <meta name="description" content={project.description || project.projectTitle} />
      </Head>

      <main className="relative bg-slate-950 min-h-screen overflow-hidden">
        {/* HERO BANNER */}
        <section className="relative h-[70vh] min-h-[500px] w-full flex items-end pb-20 pt-[100px]">
          <div className="absolute inset-0 z-0">
            {project.featuredImage && (project.featuredImage.startsWith("http") || project.featuredImage.startsWith("/upload")) ? (
              <img
                src={featuredImg}
                alt={project.projectName}
                className="w-full h-full"
              />
            ) : (
              <Image
                src={featuredImg}
                alt={project.projectName}
                fill
                priority
                className=""
              />
            )}
            {/* Gradient Overlay for modern look */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent" />
          </div>

          <div className="container mx-auto px-6 md:px-12 xl:px-24 relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 backdrop-blur-md bg-white/10 px-4 py-2 rounded-full text-sm font-semibold border border-white/10">
              <ChevronLeft className="w-4 h-4" /> {t('project_detail.backToHomeShort')}
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> {t('project_detail.featuredProject')}
            </div>

            {project.projectTitle && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-tight">
                {project.projectTitle}
              </h1>
            )}
            {project.projectName && (
              <p className="text-xl md:text-2xl text-gray-300 mt-4 font-semibold italic">
                {project.projectName}
              </p>
            )}
          </div>
        </section>

        {/* SPECS CARDS (GLASSMORPHISM) */}
        <section className="relative z-20 -mt-10 mb-20 container mx-auto px-6 md:px-12 xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* CÔNG SUẤT */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors shadow-2xl group">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-orange-400 w-6 h-6" />
              </div>
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">{t('project_detail.solarPower')}</p>
              <p className="text-2xl font-black text-white">{project.solarPower ? `${project.solarPower} kWp` : 'N/A'}</p>
            </div>

            {/* LƯU TRỮ */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors shadow-2xl group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-blue-400 w-6 h-6" />
              </div>
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">{t('project_detail.storageCapacity')}</p>
              <p className="text-2xl font-black text-white">{project.savingPower ? `${project.savingPower} kWh` : 'N/A'}</p>
            </div>

            {/* ĐỊA ĐIỂM */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors shadow-2xl group">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="text-emerald-400 w-6 h-6" />
              </div>
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">{t('project_detail.location')}</p>
              <p className="text-2xl font-black text-white line-clamp-1">{project.projectAddress || t('project_detail.updating')}</p>
            </div>

            {/* TRẠNG THÁI */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors shadow-2xl group">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="text-purple-400 w-6 h-6" />
              </div>
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">{t('project_detail.status')}</p>
              <p className="text-2xl font-black text-white">{project.processStatusName || t('project_detail.inProgress')}</p>
            </div>

          </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="container mx-auto px-6 md:px-12 xl:px-24 pb-32">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* CỘT TRÁI - TEXT */}
            <div className="w-full lg:w-1/3">
              <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-tight flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-500 rounded-full" /> {t('projects_page.projectDetails')}
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-medium">
                {project.description ? (
                  <p>{project.description}</p>
                ) : (
                  <p>{t('project_detail.overviewDesc', { projectName: project.projectName, solarPower: project.solarPower, savingPower: project.savingPower })}</p>
                )}
              </div>

              <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">{t('project_detail.projectInfo')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-gray-400 flex items-center gap-2"><MapPin className="w-4 h-4" /> {t('project_detail.address')}</span>
                    <span className="text-white font-semibold text-right max-w-[60%]">{project.projectAddress}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-gray-400 flex items-center gap-2"><Calendar className="w-4 h-4" /> {t('project_detail.startDate')}</span>
                    <span className="text-white font-semibold">{project.startDate || 'N/A'}</span>
                  </li>
                  <li className="flex items-center justify-between pb-2">
                    <span className="text-gray-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> {t('project_detail.endDate')}</span>
                    <span className="text-white font-semibold">{project.endDate || 'N/A'}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CỘT PHẢI - ẢNH CHI TIẾT CÁC GIAI ĐOẠN */}
            <div className="w-full lg:w-2/3">
              {project.details && project.details.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                  {project.details.map((detail) => (
                    <div key={detail.projectDetailId} className="group cursor-pointer">
                      <div className="relative h-48 md:h-56 w-full rounded-3xl overflow-hidden mb-4 shadow-xl border border-white/10">
                        {detail.imageUrl && (detail.imageUrl.startsWith("http") || detail.imageUrl.startsWith("/upload")) ? (
                          <img
                            src={getImageSrc(detail.imageUrl, "")}
                            alt={t('project_detail.imageAlt')}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <Image
                            src={getImageSrc(detail.imageUrl, "/images/demo2.webp")}
                            alt={t('project_detail.imageAlt')}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

                        {detail.constructionDate && (
                          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                            <Calendar className="w-3.5 h-3.5 text-blue-400" /> {detail.constructionDate}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 font-medium px-2 group-hover:text-white transition-colors line-clamp-3">
                        {detail.content || t('project_detail.contentUpdating')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-64 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-gray-500 bg-white/5">
                  <Image src="/images/demo1.webp" width={80} height={80} alt="" className="opacity-20 mb-4 rounded-xl" />
                  <p className="font-semibold text-lg">{t('project_detail.imageUpdating')}</p>
                </div>
              )}
            </div>

          </div>
        </section>

      </main>
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
