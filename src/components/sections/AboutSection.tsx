"use client";

import Image from "next/image";
import { useTranslation } from "next-i18next/pages";
import {
  Leaf,
  ShieldCheck,
  TrendingUp,
  Globe,
  Users,
  Zap,
  Cpu,
  Sprout,
  Home,
  Building2,
  Wrench,
  Lightbulb,
  Sparkles,
  CheckCircle2,
  Settings,
} from "lucide-react";
import { useScrollAnimation, useScrollAnimationGroup } from "@/lib/utils/useScrollAnimation";

// ── Component ───────────────────────────────────────────────────
export default function AboutSection() {
  const { t } = useTranslation("common");

  // Scroll animation refs
  const heroTitle = useScrollAnimation(0.2);
  const badgesGroup = useScrollAnimationGroup(0.3);
  const col1 = useScrollAnimation(0.2);
  const col2 = useScrollAnimation(0.2);
  const col3 = useScrollAnimation(0.2);

  const highlights = [
    { icon: Leaf, title: t("about.highlight1_title"), sub: t("about.highlight1_sub"), color: "text-green-400", bg: "bg-green-500/20" },
    { icon: ShieldCheck, title: t("about.highlight2_title"), sub: t("about.highlight2_sub"), color: "text-blue-400", bg: "bg-blue-500/20" },
    { icon: TrendingUp, title: t("about.highlight3_title"), sub: t("about.highlight3_sub"), color: "text-orange-400", bg: "bg-orange-500/20" },
    { icon: Globe, title: t("about.highlight4_title"), sub: t("about.highlight4_sub"), color: "text-teal-400", bg: "bg-teal-500/20" },
  ];

  const aboutPoints = [
    { icon: Zap, text: t("about.point1") },
    { icon: Cpu, text: t("about.point2") },
    { icon: Sprout, text: t("about.point3") },
  ];

  const services = [
    {
      icon: Home,
      text: (
        <>
          {t("about.service1_pre")}{" "}
          <span className="text-orange-400 font-semibold">(Residential)</span> {t("about.service1_mid")}{" "}
          <span className="text-orange-400 font-semibold">(Commercial)</span>
        </>
      ),
    },
    { icon: Building2, text: t("about.service2") },
    { icon: Wrench, text: t("about.service3") },
    { icon: Lightbulb, text: t("about.service4") },
    { icon: Sparkles, text: t("about.service5") },
  ];

  const benefits = [
    t("about.benefit1"),
    t("about.benefit2"),
    t("about.benefit3"),
    t("about.benefit4"),
    t("about.benefit5"),
    t("about.benefit6"),
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background ảnh pin mặt trời — dùng <Image> thay CSS backgroundImage */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/75 z-10" />
        <Image
          src="/images/bg_page.avif"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          quality={75}
          loading="lazy"
        />
      </div>

      {/* ===== HERO TITLE ===== */}
      <div className="relative z-10 overflow-hidden py-14 px-4">
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />

        {/* Glow hào quang phía sau */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[120px] bg-orange-500/10 blur-3xl rounded-full" />
        </div>

        <div
          ref={heroTitle.ref}
          className={`relative z-10 text-center max-w-4xl mx-auto anim-fade-up ${heroTitle.isVisible ? "is-visible" : ""}`}
        >
          {/* Dòng 1: TPC SOLAR */}
          <h1
            className="font-black italic uppercase"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              background: "linear-gradient(135deg, #facc15 0%, #fb923c 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              letterSpacing: "0.05em",
              lineHeight: 1.1,
            }}
          >
            TPC SOLAR
          </h1>

          {/* Separator */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400" />
            <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_2px_rgba(251,146,60,0.6)]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400" />
          </div>

          {/* Dòng 2: Slogan */}
          <p
            className="text-white/80 font-semibold uppercase"
            style={{
              fontSize: "clamp(0.75rem, 2.5vw, 1.25rem)",
              letterSpacing: "0.25em",
            }}
          >
            {t("about.slogan")}
          </p>
        </div>
      </div>

      {/* ===== 4 HIGHLIGHT BADGES ===== */}
      <div
        ref={badgesGroup.ref}
        className={`relative z-10 bg-white/5 backdrop-blur-sm border-y border-white/10 anim-fade-in ${badgesGroup.isVisible ? "is-visible" : ""}`}
      >
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map(({ icon: Icon, title, sub, color, bg }, i) => (
            <div
              key={title}
              className={`flex items-center gap-3 anim-fade-up ${badgesGroup.isVisible ? "is-visible" : ""} anim-delay-${i + 1}`}
            >
              <div className={`${bg} p-2.5 rounded-full shrink-0 hover:scale-110 transition-transform`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="font-bold text-white text-sm uppercase">{title}</p>
                <p className="text-gray-400 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MAIN 3-COLUMN SECTION ===== */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">

        {/* --- Column 1: Về Chúng Tôi --- */}
        <div
          ref={col1.ref}
          className={`bg-white/5 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 space-y-4 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] transition-all duration-300 anim-slide-left ${col1.isVisible ? "is-visible" : ""}`}
        >
          <div className="flex items-center gap-3 pb-3 border-b border-blue-500/30">
            {/* CSS animation thay Framer Motion infinite rotate */}
            <div className="bg-blue-500/20 p-2 rounded-full animate-icon-wobble">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-white font-bold text-lg uppercase tracking-wide">{t("about.aboutUs")}</h2>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            TPC là đơn vị chuyên cung cấp các giải pháp năng lượng mặt trời an toàn, hiệu quả và bền vững tại Việt Nam.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Chúng tôi cam kết mang đến công nghệ tiên tiến, chất lượng đáng tin cậy và trách nhiệm với môi trường.
          </p>

          <div className="space-y-3 pt-2">
            {aboutPoints.map(({ icon: Icon, text }, i) => (
              <div
                key={text}
                className={`flex items-start gap-3 anim-fade-up ${col1.isVisible ? "is-visible" : ""} anim-delay-${i + 1}`}
              >
                <div className="bg-green-500/20 p-1.5 rounded-full shrink-0 mt-0.5">
                  <Icon className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-gray-300 text-sm leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Column 2: Dịch Vụ Của TPC --- */}
        <div
          ref={col2.ref}
          className={`bg-white/5 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 space-y-4 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] transition-all duration-300 anim-fade-up ${col2.isVisible ? "is-visible" : ""}`}
        >
          <div className="flex items-center gap-3 pb-3 border-b border-orange-500/30">
            {/* CSS animation thay Framer Motion infinite spin */}
            <div className="bg-orange-500/20 p-2 rounded-full animate-icon-spin">
              <Settings className="h-5 w-5 text-orange-400" />
            </div>
            <h2 className="text-white font-bold text-lg uppercase tracking-wide">{t("about.ourServices")}</h2>
          </div>

          <ul className="space-y-4">
            {services.map(({ icon: Icon, text }, i) => (
              <li
                key={i}
                className={`flex items-start gap-3 anim-fade-up ${col2.isVisible ? "is-visible" : ""} anim-delay-${i + 1}`}
              >
                <div className="bg-orange-500/20 p-2 rounded-lg shrink-0 mt-0.5 hover:scale-110 hover:bg-orange-500/40 transition-all">
                  <Icon className="h-4 w-4 text-orange-400" />
                </div>
                <p className="text-gray-300 text-sm leading-snug">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Column 3: Lợi Ích Khi Chọn TPC --- */}
        <div
          ref={col3.ref}
          className={`bg-white/5 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 space-y-4 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(34,197,94,0.15)] transition-all duration-300 anim-slide-right ${col3.isVisible ? "is-visible" : ""}`}
        >
          <div className="flex items-center gap-3 pb-3 border-b border-green-500/30">
            {/* CSS animation thay Framer Motion infinite pulse */}
            <div className="bg-green-500/20 p-2 rounded-full animate-icon-pulse">
              <ShieldCheck className="h-5 w-5 text-green-400" />
            </div>
            <h2 className="text-white font-bold text-lg uppercase tracking-wide">{t("about.whyChooseUs")}</h2>
          </div>

          <ul className="space-y-3">
            {benefits.map((item, i) => (
              <li
                key={item}
                className={`flex items-center gap-3 anim-scale-in ${col3.isVisible ? "is-visible" : ""} anim-delay-${i + 1}`}
              >
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                <p className="text-gray-300 text-sm">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
