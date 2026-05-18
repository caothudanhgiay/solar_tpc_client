"use client";

import Link from "next/link";
import { ArrowRight, Zap, Shield, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Dự án hoàn thành", value: "500+" },
  { label: "Tỉnh thành", value: "30+" },
  { label: "Năm kinh nghiệm", value: "10+" },
  { label: "MWp đã lắp đặt", value: "50+" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/70 z-10" />
        {/* Placeholder for background image - using a reliable unspash source */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-400 font-medium text-sm">
              <Zap className="h-4 w-4" />
              <span>Tiên phong năng lượng xanh</span>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Giải pháp <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 whitespace-nowrap">Điện Mặt Trời</span><br /> Cho Tương Lai
            </h3>

            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              TPC Solar mang đến giải pháp năng lượng sạch toàn diện, giúp bạn tiết kiệm chi phí, tối ưu hóa lợi nhuận và chung tay bảo vệ môi trường.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/menu/contact"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1"
              >
                Nhận tư vấn ngay
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/menu/projects"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1"
              >
                Xem dự án
              </Link>
            </div>
          </motion.div>

          {/* Value Props Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:pl-12"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all cursor-default">
              <div className="bg-orange-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="h-7 w-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Tiết kiệm 80%</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Cắt giảm tối đa hóa đơn tiền điện hàng tháng cho gia đình và doanh nghiệp.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all cursor-default sm:translate-y-8">
              <div className="bg-blue-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bảo hành 25 năm</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Cam kết hiệu suất tấm pin và dịch vụ bảo trì chuyên nghiệp trọn đời.</p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 border-t border-white/10 pt-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
