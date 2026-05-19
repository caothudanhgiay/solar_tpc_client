"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Zap, Wrench, Sparkles, Activity, ShieldCheck, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const services = [
  {
    icon: Zap,
    title: "Dịch Vụ Thi Công Lắp Đặt",
    desc: "Khảo sát chuyên sâu, thiết kế kỹ thuật chính xác và lắp đặt trọn gói hệ thống điện mặt trời đạt chuẩn chất lượng quốc tế.",
    image: "/images/demo2.jpg", // Solar arrays rooftop image
    href: "/menu/services?category=lap-dat",
  },
  {
    icon: Wrench,
    title: "Dịch Vụ O&M (Vận Hành & Bảo Trì)",
    desc: "Bảo dưỡng định kỳ, kiểm tra hiệu suất chuyên nghiệp và khắc phục sự cố nhanh chóng giúp tối đa hóa sản lượng điện phát ra.",
    image: "/images/demo3.jpg", // Tightening tool image
    href: "/menu/services?category=om",
  },
  {
    icon: Sparkles,
    title: "Dịch Vụ Vệ Sinh Tấm Pin NLMT",
    desc: "Vệ sinh tấm pin bằng công nghệ hiện đại giúp làm sạch bụi bẩn hoàn toàn, nâng cao hiệu suất hấp thụ bức xạ mặt trời từ 15-20%.",
    image: "/images/demo1.jpg", // Cabinet thermal scanner image
    href: "/menu/services?category=ve-sinh",
  },
  {
    icon: Activity,
    title: "Giám Sát & Vận Hành Bằng SCADA",
    desc: "Tích hợp phần mềm giám sát SCADA hiện đại giúp theo dõi các chỉ số vận hành trực quan theo thời gian thực và phát hiện lỗi tự động.",
    image: "/images/demo4.jpg", // Warehouse panels image
    href: "/menu/services?category=scada",
  },
];

export default function ServicesSection() {
  return (
    <section id="our-services" className="relative py-24 overflow-hidden">
      {/* Separator Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent z-20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent z-20" />

      {/* Background ảnh pin mặt trời */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-slate-950/95 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/images/bg_page.avif')" }}
        />
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <ShieldCheck className="w-3.5 h-3.5 animate-pulse" /> Giải Pháp Toàn Diện
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4"
          >
            DỊCH VỤ <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">CỦA CHÚNG TÔI</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 w-32 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"
          />
        </div>

        {/* 4-Column Services Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="flex flex-col gap-4 group"
              >
                {/* 1. Image block on top */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-[200px] rounded-2xl overflow-hidden shadow-xl border border-white/10 cursor-pointer"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle dark filter on top of image */}
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-300" />
                </motion.div>

                {/* 2. Text Card below with custom Orange Border */}
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 15px 30px rgba(249,115,22,0.12)" }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="bg-white/5 backdrop-blur-xl border-2 border-orange-500/40 rounded-2xl p-6 flex flex-col justify-between h-[180px] shadow-2xl relative overflow-hidden transition-all duration-300"
                >
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
                      Chi tiết dịch vụ <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
