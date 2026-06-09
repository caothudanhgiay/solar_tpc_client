"use client";

import Image from "next/image";
import { Zap, MapPin, ArrowRight } from "lucide-react";
import { useTranslation } from "next-i18next/pages";
import { useScrollAnimation } from "@/lib/utils/useScrollAnimation";

export default function ProjectsSection() {
  const { t } = useTranslation("common");

  // Scroll animation refs
  const titleRef = useScrollAnimation(0.2);
  const project1 = useScrollAnimation(0.2);
  const project2 = useScrollAnimation(0.2);
  const project3 = useScrollAnimation(0.2);
  const projectRefs = [project1, project2, project3];

  const projects = [
    {
      id: "du-an-a",
      name: t("projects.project_a.name"),
      power: "12 kWp",
      location: t("projects.project_a.location"),
      desc: t("projects.project_a.desc"),
      image: "/images/demo1.jpg",
      isReverse: false,
    },
    {
      id: "du-an-b",
      name: t("projects.project_b.name"),
      power: "12 kWp",
      location: t("projects.project_b.location"),
      desc: t("projects.project_b.desc"),
      image: "/images/demo3.jpg",
      isReverse: true,
    },
    {
      id: "du-an-c",
      name: t("projects.project_c.name"),
      power: "12 kWp",
      location: t("projects.project_c.location"),
      desc: t("projects.project_c.desc"),
      image: "/images/demo2.jpg",
      isReverse: false,
    },
  ];

  return (
    <section id="featured-projects" className="relative py-24 overflow-hidden">
      {/* Separator Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent z-20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent z-20" />

      {/* Background ảnh pin mặt trời — dùng <Image> thay CSS backgroundImage */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-slate-950/95 z-10" />
        <Image
          src="/images/bg_page.avif"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
          quality={60}
          loading="lazy"
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-24 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            ref={titleRef.ref}
            className={`anim-scale-in ${titleRef.isVisible ? "is-visible" : ""}`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5 animate-pulse" /> {t("projects.badge")}
            </div>
          </div>
          <h2
            className={`text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 anim-fade-up ${titleRef.isVisible ? "is-visible" : ""} anim-delay-1`}
          >
            {t("projects.title")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">{t("projects.highlight")}</span>
          </h2>
          <div
            className={`h-1.5 w-32 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto rounded-full anim-fade-up ${titleRef.isVisible ? "is-visible" : ""} anim-delay-2`}
          />
        </div>

        {/* Alternating Layout List */}
        <div className="space-y-12 lg:space-y-16">
          {projects.map((project, idx) => {
            const isTextLeft = !project.isReverse;
            const pRef = projectRefs[idx];
            return (
              <div
                key={project.id}
                ref={pRef.ref}
                className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-8 ${
                  project.isReverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* 1. COLUMN TEXT CARD */}
                <div
                  className={`w-full lg:w-1/2 flex justify-center ${isTextLeft ? "lg:justify-end" : "lg:justify-start"} ${isTextLeft ? "anim-slide-left" : "anim-slide-right"} ${pRef.isVisible ? "is-visible" : ""} anim-delay-1`}
                >
                  <div
                    className="w-full max-w-xl h-[300px] sm:h-[380px] bg-white/5 backdrop-blur-xl border-2 border-orange-500/40 rounded-3xl p-6 md:p-8 shadow-2xl relative group overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(249,115,22,0.15)] transition-all duration-300"
                  >
                    {/* Glowing Accent Corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-tight group-hover:text-orange-400 transition-colors duration-300">
                          {project.name}
                        </h3>
                        <span className="flex items-center gap-1 text-[10px] md:text-xs font-black bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">
                          <Zap className="w-3.5 h-3.5" /> {t("projects.completed")}
                        </span>
                      </div>

                      {/* Accent divider line */}
                      <div className="h-0.5 w-16 bg-orange-500/50 group-hover:w-24 transition-all duration-300" />

                      {/* Main Desc text */}
                      <p className="text-gray-200 text-base md:text-lg font-bold leading-relaxed">
                        {project.desc}
                      </p>

                      {/* Structural Details */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div className="space-y-1">
                          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">{t("projects.capacity")}</span>
                          <span className="text-lg font-extrabold text-orange-400 flex items-center gap-1">
                            <Zap className="w-4 h-4 text-orange-500" /> {project.power}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">{t("projects.locationLabel")}</span>
                          <span className="text-lg font-extrabold text-white flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-orange-500" /> {project.location}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-orange-400 group-hover:translate-x-2 transition-transform duration-300">
                          {t("projects.details")} <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. COLUMN IMAGE */}
                <div
                  className={`w-full lg:w-1/2 flex justify-center ${isTextLeft ? "lg:justify-start" : "lg:justify-end"} ${isTextLeft ? "anim-slide-right" : "anim-slide-left"} ${pRef.isVisible ? "is-visible" : ""} anim-delay-2`}
                >
                  <div className="relative h-[300px] sm:h-[380px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer w-full max-w-xl hover:scale-[1.02] transition-transform duration-400">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
                    {/* Glowing hover light */}
                    <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
