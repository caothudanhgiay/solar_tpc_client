"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { ChevronRight, Settings, Wrench, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// ── Data ────────────────────────────────────────────────────────
const categories = [
  { id: "lap-dat", name: "Dịch Vụ Lắp Đặt Hệ Thống Năng lượng Mặt Trời", icon: Zap },
  { id: "om", name: "Dịch Vụ O&M (Vận Hành & Bảo Trì) Trọn Gói", icon: Settings },
  { id: "ve-sinh", name: "Dịch Vụ Vệ Sinh Tấm Pin NLMT", icon: ShieldCheck },
  { id: "scada", name: "Dịch vụ Giám Sát & Vận Hành Hệ Thống NLMT bằng Phần mềm SCADA", icon: Wrench },
];

const services = [
  {
    id: "lap-dat",
    title: "Dịch Vụ Lắp Đặt Hệ Thống Năng lượng Mặt Trời",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    desc: "Khảo sát, thiết kế và thi công lắp đặt trọn gói hệ thống điện mặt trời áp mái cho hộ gia đình và doanh nghiệp.",
    price: "Liên hệ",
  },
  {
    id: "om",
    title: "Dịch Vụ O&M (Vận Hành & Bảo Trì) Trọn Gói",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop",
    desc: "Bảo dưỡng định kỳ, kiểm tra hệ thống inverter, đo đạc thông số kỹ thuật để đảm bảo hiệu suất hoạt động tối đa.",
    price: "Liên hệ",
  },
  {
    id: "ve-sinh",
    title: "Dịch Vụ Vệ Sinh Tấm Pin NLMT",
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=2069&auto=format&fit=crop",
    desc: "Làm sạch chuyên nghiệp bằng thiết bị chuyên dụng, giúp tăng sản lượng điện sinh ra từ 10% đến 20%.",
    price: "Liên hệ",
  },
  {
    id: "scada",
    title: "Dịch vụ Giám Sát & Vận Hành Hệ Thống NLMT bằng Phần mềm SCADA",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    desc: "Giám sát 24/7 qua phần mềm SCADA thông minh, phát hiện sự cố nhanh chóng và điều khiển từ xa.",
    price: "Liên hệ",
  }
];

// ── Component ───────────────────────────────────────────────────
export default function ServicesPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const category = searchParams?.get("category");
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => s.id === activeCategory);

  return (
    <>
      <Head>
        <title>Dịch Vụ - TPC Solar</title>
        <meta name="description" content="Danh mục dịch vụ điện mặt trời chuyên nghiệp từ TPC Solar." />
      </Head>

      <main className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-slate-950">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/70 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')" }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-20">
          
          {/* Breadcrumb / Title area */}
          <div className="mb-10 pb-6 border-b border-white/10">
            <h1 className="text-3xl font-bold text-white uppercase tracking-wider">Danh Mục Dịch Vụ</h1>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
              <Link href="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-orange-500 font-medium">Dịch vụ</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar (DANH MỤC DỊCH VỤ) */}
            <div className="lg:w-1/4 shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden sticky top-32">
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4">
                  <h2 className="text-lg font-bold text-white uppercase">Danh Mục Dịch Vụ</h2>
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
                    Tất cả dịch vụ
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform", 
                      activeCategory === "all" ? "translate-x-1 text-orange-400" : "text-gray-500 group-hover:translate-x-1"
                    )} />
                  </button>
                  
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 group mb-1",
                        activeCategory === cat.id 
                          ? "bg-white/10 text-orange-400" 
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <span className="flex-1 pr-4 line-clamp-2">{cat.name}</span>
                      <ChevronRight className={cn(
                        "w-4 h-4 shrink-0 transition-transform", 
                        activeCategory === cat.id ? "translate-x-1 text-orange-400" : "text-gray-500 group-hover:translate-x-1"
                      )} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content (Grid) */}
            <div className="lg:w-3/4">
              <motion.div 
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                layout
              >
                {filteredServices.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden group hover:border-orange-500/50 hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] transition-all duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        priority={idx <= 2}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow relative">
                      <div className="absolute -top-6 right-5 bg-orange-500 p-2.5 rounded-xl shadow-lg shadow-orange-500/30 group-hover:-translate-y-1 transition-transform">
                        {(() => {
                          const Icon = categories.find(c => c.id === service.id)?.icon || Settings;
                          return <Icon className="w-5 h-5 text-white" />;
                        })()}
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-3 mt-2 line-clamp-2 group-hover:text-orange-400 transition-colors uppercase leading-snug">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm text-gray-400 mb-6 line-clamp-3 flex-grow">
                        {service.desc}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                        <span className="text-orange-400 font-bold text-lg">{service.price}</span>
                        <Link 
                          href={`/menu/contact`}
                          className="text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-orange-500 px-4 py-2 rounded-lg transition-colors"
                        >
                          Chi tiết
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {filteredServices.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                  Không tìm thấy dịch vụ nào.
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
