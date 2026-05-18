"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Zap, DollarSign, Settings, Home, Building2, Factory, ArrowRight, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to format currency
const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

export default function QuickPricingPage() {
  const [purpose, setPurpose] = useState("sinh-hoat");
  const [roofType, setRoofType] = useState("mai-ton");
  const [bill, setBill] = useState<number>(3000000); // Default 3 million

  // Calculations
  const isEffective = bill >= 1500000;
  
  // Estimate: 1 kWp generates ~120 kWh/month. Avg electricity price = ~3000 VND/kWh
  // 1 kWp saves ~ 360,000 VND/month
  const estimatedPower = isEffective ? bill / 360000 : 0;
  const roundedPower = Math.round(estimatedPower * 10) / 10;
  
  // Tiết kiệm khoảng 85-90% tiền điện
  const estimatedSavings = isEffective ? bill * 0.85 : 0;

  return (
    <>
      <Head>
        <title>Bảng Giá Nhanh - TPC Solar</title>
        <meta name="description" content="Công cụ tính toán công suất điện mặt trời và báo giá nhanh các phương án đầu tư từ TPC Solar." />
      </Head>
      <main className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-slate-950">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-20">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-orange-500/20 rounded-2xl mb-4 border border-orange-500/30">
              <Calculator className="w-8 h-8 text-orange-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 tracking-tight">
              Bảng Giá <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Nhanh</span>
            </h1>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
              Tính toán sơ bộ công suất hệ thống điện năng lượng mặt trời cần thiết và các phương án đầu tư tối ưu dựa trên nhu cầu của bạn.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Input Form */}
            <motion.div 
              className="lg:col-span-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-400" />
                Thông tin hệ thống
              </h2>

              <div className="space-y-8">
                {/* 1. Mục đích */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300 block">Mục đích sử dụng điện (*)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "sinh-hoat", label: "Sinh hoạt", icon: Home },
                      { id: "kinh-doanh", label: "Kinh doanh", icon: Building2 },
                      { id: "san-xuat", label: "Sản xuất", icon: Factory },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setPurpose(item.id)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 gap-2",
                          purpose === item.id 
                            ? "bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]" 
                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Loại mái nhà */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300 block">Loại mái nhà (*)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Mái tôn", "Mái bằng", "Mái ngói"].map((roof) => {
                      const id = roof.toLowerCase().replace(" ", "-");
                      return (
                        <button
                          key={id}
                          onClick={() => setRoofType(id)}
                          className={cn(
                            "py-2.5 px-2 rounded-xl border transition-all duration-200 text-sm font-medium",
                            roofType === id 
                              ? "bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
                              : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                          )}
                        >
                          {roof}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Tiền điện */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-semibold text-gray-300 block">Tiền điện hiện tại/tháng (*)</label>
                    <span className="text-lg font-bold text-white bg-white/10 px-3 py-1 rounded-lg">
                      {formatVND(bill)}
                    </span>
                  </div>
                  
                  <div className="relative pt-2">
                    <input
                      type="range"
                      min="500000"
                      max="50000000"
                      step="500000"
                      value={bill}
                      onChange={(e) => setBill(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                      <span>500K</span>
                      <span>10M</span>
                      <span>25M</span>
                      <span>50M+</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* RIGHT COLUMN: Results */}
            <motion.div 
              className="lg:col-span-7 flex flex-col h-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {!isEffective ? (
                  <motion.div 
                    key="not-effective"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="bg-amber-500/20 p-4 rounded-full mb-2">
                      <AlertCircle className="w-10 h-10 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-500">Tiêu thụ điện còn thấp</h3>
                    <p className="text-gray-300 max-w-sm leading-relaxed">
                      Số điện tiêu thụ của bạn hiện tại tương đối thấp nên việc đầu tư hệ thống điện mặt trời sẽ <strong>chưa tối ưu về mặt kinh tế</strong>.
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4 inline-flex items-start gap-3 text-left">
                      <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-400">
                        Nếu hóa đơn tiền điện của bạn từ <strong className="text-white">1.500.000đ/tháng</strong> trở lên, việc đầu tư sẽ mang lại lợi ích rõ rệt và thời gian hoàn vốn nhanh hơn.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    {/* Primary Calculation Output */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-colors" />
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-blue-500/20 p-2.5 rounded-xl">
                            <Zap className="w-6 h-6 text-blue-400" />
                          </div>
                          <h3 className="text-gray-300 font-medium text-sm">Công suất đề xuất</h3>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-white">{roundedPower}</span>
                          <span className="text-blue-400 font-bold">kWp</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-500/30 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/30 transition-colors" />
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-green-500/20 p-2.5 rounded-xl">
                            <DollarSign className="w-6 h-6 text-green-400" />
                          </div>
                          <h3 className="text-gray-300 font-medium text-sm">Dự kiến tiết kiệm/tháng</h3>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-white">{formatVND(estimatedSavings).replace("₫", "")}</span>
                          <span className="text-green-400 font-bold">VNĐ</span>
                        </div>
                      </div>
                    </div>

                    {/* Investment Options */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                      <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                        Phương án đầu tư đề xuất
                      </h3>
                      
                      <div className="space-y-4">
                        {[
                          {
                            title: "Khách hàng sở hữu 100%",
                            desc: "TPC khảo sát, tư vấn & lắp đặt trọn gói. Khách hàng thanh toán 1 lần và hưởng toàn bộ lợi ích.",
                            price: "Giá trọn gói từ: 11,000,000đ / 1 kWp",
                            highlight: true,
                            color: "orange"
                          },
                          {
                            title: "TPC đầu tư 100% - Khách hàng mua điện giá rẻ",
                            desc: "TPC lắp đặt hệ thống miễn phí. Khách hàng được giảm đến 35% giá điện so với EVN.",
                            price: "Giá bán điện từ: 1.650đ / kWh",
                            highlight: false,
                            color: "blue"
                          },
                          {
                            title: "TPC đầu tư 100% - Cho thuê hệ thống",
                            desc: "TPC lắp đặt hệ thống. Khách hàng trả tiền thuê cố định hàng tháng và tự dùng điện.",
                            price: "Phí thuê từ: 160,000đ / 1 kWp / tháng",
                            highlight: false,
                            color: "teal"
                          }
                        ].map((option, idx) => (
                          <div 
                            key={idx} 
                            className={cn(
                              "p-5 rounded-2xl border transition-all hover:-translate-y-1 duration-300",
                              option.highlight 
                                ? "bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500/50 shadow-[0_4px_20px_rgba(249,115,22,0.1)]" 
                                : "bg-white/5 border-white/10 hover:border-white/30"
                            )}
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex-1">
                                <h4 className={cn(
                                  "font-bold text-base mb-1",
                                  option.color === "orange" ? "text-orange-400" : option.color === "blue" ? "text-blue-400" : "text-teal-400"
                                )}>
                                  {option.title}
                                </h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{option.desc}</p>
                              </div>
                              <div className={cn(
                                "shrink-0 py-2 px-4 rounded-xl font-bold text-sm whitespace-nowrap text-center",
                                option.highlight ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "bg-white/10 text-white"
                              )}>
                                {option.price}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 text-center">
                        <a 
                          href="/menu/contact" 
                          className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-gray-100 px-8 py-3.5 rounded-full font-bold text-sm transition-transform hover:scale-105"
                        >
                          Nhận Tư Vấn Chi Tiết <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
