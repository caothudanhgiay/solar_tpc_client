"use client";
import { motion } from "framer-motion";
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

// ── Animation variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

// ── Data ────────────────────────────────────────────────────────
const highlights = [
  { icon: Leaf, title: "Sạch hơn", sub: "Giảm phát thải", color: "text-green-400", bg: "bg-green-500/20" },
  { icon: ShieldCheck, title: "Tiết kiệm hơn", sub: "Giảm chi phí điện", color: "text-blue-400", bg: "bg-blue-500/20" },
  { icon: TrendingUp, title: "Hiệu quả hơn", sub: "Tối ưu hiệu suất", color: "text-orange-400", bg: "bg-orange-500/20" },
  { icon: Globe, title: "Bền vững hơn", sub: "Phát triển dài lâu", color: "text-teal-400", bg: "bg-teal-500/20" },
];

const aboutPoints = [
  { icon: Zap, text: "Hiệu suất cao, tiết kiệm năng lượng" },
  { icon: Cpu, text: "Công nghệ hiện đại, vận hành thông minh" },
  { icon: Sprout, text: "Hoạt động bền bỉ, thân thiện môi trường" },
];

const services = [
  {
    icon: Home,
    text: (
      <>
        Lắp đặt hệ thống điện mặt trời mái nhà{" "}
        <span className="text-orange-400 font-semibold">(Residential)</span> và thương mại{" "}
        <span className="text-orange-400 font-semibold">(Commercial)</span>
      </>
    ),
  },
  { icon: Building2, text: "Hệ thống điện mặt trời cho doanh nghiệp" },
  { icon: Wrench, text: "Bảo trì và vận hành hệ thống" },
  { icon: Lightbulb, text: "Tư vấn và thiết kế giải pháp tối ưu" },
  { icon: Sparkles, text: "Vệ sinh tấm pin năng lượng mặt trời" },
];

const benefits = [
  "Tiết kiệm chi phí điện",
  "Bảo vệ môi trường",
  "Công nghệ hiện đại",
  "Dịch vụ chuyên nghiệp",
  "Chất lượng đảm bảo",
  "Hỗ trợ nhanh chóng và tận tâm",
];

// ── Component ───────────────────────────────────────────────────
export default function AboutSection() { return (<section id="about" className="relative py-20 overflow-hidden">
        {/* Background ảnh pin mặt trời */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/75 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/bg_page.avif')" }}
          />
        </motion.div>

        {/* ===== HERO TITLE ===== */}
        <div className="relative z-10 overflow-hidden py-14 px-4">
          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />

          {/* Glow hào quang phía sau */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[120px] bg-orange-500/10 blur-3xl rounded-full" />
          </div>

          <motion.div
            className="relative z-10 text-center max-w-4xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {/* Dòng 1: TPC SOLAR */}
            <motion.h1
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
              initial={{ opacity: 0, y: -24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              TPC SOLAR
            </motion.h1>

            {/* Separator */}
            <motion.div
              className="flex items-center justify-center gap-3 my-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400" />
              <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_2px_rgba(251,146,60,0.6)]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400" />
            </motion.div>

            {/* Dòng 2: Slogan */}
            <motion.p
              className="text-white/80 font-semibold uppercase"
              style={{
                fontSize: "clamp(0.75rem, 2.5vw, 1.25rem)",
                letterSpacing: "0.25em",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            >
              NĂNG LƯỢNG XANH &nbsp;·&nbsp; GIÁ TRỊ BỀN VỮNG
            </motion.p>
          </motion.div>
        </div>

        {/* ===== 4 HIGHLIGHT BADGES ===== */}
        <motion.div
          className="relative z-10 bg-white/5 backdrop-blur-sm border-y border-white/10"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map(({ icon: Icon, title, sub, color, bg }, i) => (
              <motion.div
                key={title}
                className="flex items-center gap-3"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <motion.div
                  className={`${bg} p-2.5 rounded-full shrink-0`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </motion.div>
                <div>
                  <p className="font-bold text-white text-sm uppercase">{title}</p>
                  <p className="text-gray-400 text-xs">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== MAIN 3-COLUMN SECTION ===== */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">

          {/* --- Column 1: Về Chúng Tôi --- */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 space-y-4"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(59,130,246,0.15)" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-blue-500/30">
              <motion.div
                className="bg-blue-500/20 p-2 rounded-full"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Users className="h-5 w-5 text-blue-400" />
              </motion.div>
              <h2 className="text-white font-bold text-lg uppercase tracking-wide">Về Chúng Tôi</h2>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              TPC là đơn vị chuyên cung cấp các giải pháp năng lượng mặt trời an toàn, hiệu quả và bền vững tại Việt Nam.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Chúng tôi cam kết mang đến công nghệ tiên tiến, chất lượng đáng tin cậy và trách nhiệm với môi trường.
            </p>

            <div className="space-y-3 pt-2">
              {aboutPoints.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  className="flex items-start gap-3"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <div className="bg-green-500/20 p-1.5 rounded-full shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-gray-300 text-sm leading-snug">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* --- Column 2: Dịch Vụ Của TPC --- */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 space-y-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(249,115,22,0.15)" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-orange-500/30">
              <motion.div
                className="bg-orange-500/20 p-2 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              >
                <Settings className="h-5 w-5 text-orange-400" />
              </motion.div>
              <h2 className="text-white font-bold text-lg uppercase tracking-wide">Dịch Vụ Của TPC</h2>
            </div>

            <ul className="space-y-4">
              {services.map(({ icon: Icon, text }, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <motion.div
                    className="bg-orange-500/20 p-2 rounded-lg shrink-0 mt-0.5"
                    whileHover={{ scale: 1.15, backgroundColor: "rgba(249,115,22,0.4)" }}
                  >
                    <Icon className="h-4 w-4 text-orange-400" />
                  </motion.div>
                  <p className="text-gray-300 text-sm leading-snug">{text}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* --- Column 3: Lợi Ích Khi Chọn TPC --- */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 space-y-4"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(34,197,94,0.15)" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-green-500/30">
              <motion.div
                className="bg-green-500/20 p-2 rounded-full"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <ShieldCheck className="h-5 w-5 text-green-400" />
              </motion.div>
              <h2 className="text-white font-bold text-lg uppercase tracking-wide">Lợi Ích Khi Chọn TPC</h2>
            </div>

            <ul className="space-y-3">
              {benefits.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3"
                  variants={scaleIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                  </motion.div>
                  <p className="text-gray-300 text-sm">{item}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    
  );
}

