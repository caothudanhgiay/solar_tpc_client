"use client";

import Image from "next/image";
import Link from "next/link";
import { Zap, Wrench, Sparkles, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { useTranslation } from "next-i18next/pages";
import { useScrollAnimation, useScrollAnimationGroup } from "@/lib/utils/useScrollAnimation";

export default function ServicesSection() {
  const { t } = useTranslation("common");

  const titleRef = useScrollAnimation(0.2);
  const gridRef = useScrollAnimationGroup(0.1);

  const services = [
    {
      icon: Zap,
      title: t("services.item1.title"),
      desc: t("services.item1.desc"),
      image: "/images/demo2.jpg",
      href: "/menu/services?category=lap-dat",
    },
    {
      icon: Wrench,
      title: t("services.item2.title"),
      desc: t("services.item2.desc"),
      image: "/images/demo3.jpg",
      href: "/menu/services?category=om",
    },
    {
      icon: Sparkles,
      title: t("services.item3.title"),
      desc: t("services.item3.desc"),
      image: "/images/demo1.jpg",
      href: "/menu/services?category=ve-sinh",
    },
    {
      icon: Activity,
      title: t("services.item4.title"),
      desc: t("services.item4.desc"),
      image: "/images/demo4.jpg",
      href: "/menu/services?category=scada",
    },
  ];

  return (
    <section id="our-services" className="relative py-24 overflow-hidden">
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
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            ref={titleRef.ref}
            className={`anim-scale-in ${titleRef.isVisible ? "is-visible" : ""}`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5 animate-pulse" /> {t("services.badge")}
            </div>
          </div>
          <h2
            className={`text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 anim-fade-up ${titleRef.isVisible ? "is-visible" : ""} anim-delay-1`}
          >
            {t("services.title")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">{t("services.highlight")}</span>
          </h2>
          <div
            className={`h-1.5 w-32 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full anim-fade-up ${titleRef.isVisible ? "is-visible" : ""} anim-delay-2`}
          />
        </div>

        {/* 4-Column Services Grid */}
        <div
          ref={gridRef.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`flex flex-col gap-4 group anim-fade-up ${gridRef.isVisible ? "is-visible" : ""} anim-delay-${index + 1}`}
              >
                {/* 1. Image block on top */}
                <div className="relative h-[200px] rounded-2xl overflow-hidden shadow-xl border border-white/10 cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle dark filter on top of image */}
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* 2. Text Card below with custom Orange Border */}
                <div className="bg-white/5 backdrop-blur-xl border-2 border-orange-500/40 rounded-2xl p-6 flex flex-col justify-between h-[180px] shadow-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(249,115,22,0.12)]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm md:text-base font-extrabold text-white line-clamp-1 group-hover:text-orange-400 transition-colors duration-300 uppercase">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1 text-[11px] font-black text-orange-400 group-hover:translate-x-1.5 transition-transform duration-300 hover:underline"
                    >
                      {t("services.details")} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
