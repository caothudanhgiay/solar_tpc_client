import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Calculator, Zap, DollarSign, Settings, Home, Building2, Factory, ArrowRight, AlertCircle, Info, BatteryCharging, Tag, PiggyBank, Clock } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { GetStaticProps } from "next";
import { tsoGetPricingOptions } from "@/lib/helpers/TsoPricingHelper";

// Helper to format currency
const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

// Helper to format raw number as currency display string
const formatNumberString = (value: number) => {
  if (value === 0) return "";
  return new Intl.NumberFormat("vi-VN").format(value);
};

export default function QuickPricingPage() {
  const { t } = useTranslation("common");
  const [purpose, setPurpose] = useState("sinh-hoat");
  const [roofType, setRoofType] = useState("mai-ton");
  const [bill, setBill] = useState<number>(1500000); // Default 1500k

  // Calculations
  const isEffective = bill >= 1500000;
  const isMax = bill > 8000000;
  const pricingResult = tsoGetPricingOptions(bill);

  return (
    <>
      <Head>
        <title>{t("pricing.metaTitle")}</title>
        <meta name="description" content={t("pricing.metaDesc")} />
      </Head>
      <main className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-slate-950">
        {/* Background elements — dùng <Image> thay CSS backgroundImage */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
          <Image
            src="/images/bg_page.avif"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-20"
            quality={50}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-20">

          {/* Header — CSS animation thay motion.div */}
          <div className="text-center mb-16 page-animate">
            <div className="inline-flex items-center justify-center p-3 bg-orange-500/20 rounded-2xl mb-4 border border-orange-500/30">
              <Calculator className="w-8 h-8 text-orange-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 tracking-tight">
              {t("pricing.title")}
            </h1>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
              {t("pricing.intro")}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN: Input Form — CSS animation */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl page-animate-delay-1">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-400" />
                {t("pricing.systemInfo")}
              </h2>

              <div className="space-y-8">
                {/* 1. Mục đích */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-300 block">{t("pricing.purposeLabel")}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "sinh-hoat", label: t("pricing.purposeResidential"), icon: Home },
                      { id: "kinh-doanh", label: t("pricing.purposeCommercial"), icon: Building2 },
                      { id: "san-xuat", label: t("pricing.purposeIndustrial"), icon: Factory },
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
                  <label className="text-sm font-semibold text-gray-300 block">{t("pricing.roofLabel")}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "mai-ton", label: t("pricing.roofMetal") },
                      { id: "mai-bang", label: t("pricing.roofFlat") },
                      { id: "mai-ngoi", label: t("pricing.roofTile") }
                    ].map((roof) => {
                      return (
                        <button
                          key={roof.id}
                          onClick={() => setRoofType(roof.id)}
                          className={cn(
                            "py-2.5 px-2 rounded-xl border transition-all duration-200 text-sm font-medium",
                            roofType === roof.id
                              ? "bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                              : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                          )}
                        >
                          {roof.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Tiền điện */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-300 block">{t("pricing.billLabel")}</label>

                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatNumberString(bill)}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, "");
                        const numericValue = rawValue ? Number(rawValue) : 0;
                        setBill(numericValue);
                      }}
                      placeholder={t("pricing.billPlaceholder")}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-16 text-lg font-bold text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none">
                      VNĐ
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Results — CSS animation thay AnimatePresence */}
            <div className="lg:col-span-7 flex flex-col h-full page-animate-delay-2">
              {isMax ? (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-amber-500/20 p-4 rounded-full mb-2">
                    <AlertCircle className="w-10 h-10 text-amber-500" />
                  </div>

                  <p className="text-gray-300 max-w-sm leading-relaxed">
                    {t("pricing.contactForPrice")}
                  </p>

                  <Link prefetch={false}
                    href="/menu/contact"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 uppercase tracking-wider"
                  >
                    {t("pricing.btnAdvice")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : !isEffective ? (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-amber-500/20 p-4 rounded-full mb-2">
                    <AlertCircle className="w-10 h-10 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-500">{t("pricing.lowConsumptionTitle")}</h3>
                  <p className="text-gray-300 max-w-sm leading-relaxed">
                    {t("pricing.lowConsumptionDesc")}
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4 inline-flex items-start gap-3 text-left">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-400">
                      {t("pricing.lowConsumptionTip")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">

                  {/* Investment Options */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                      {t("pricing.investmentOptions")}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Công suất đề xuất */}
                      <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border border-cyan-500/30 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-colors" />
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-cyan-500/20 p-2.5 rounded-xl relative z-10">
                            <BatteryCharging className="w-6 h-6 text-cyan-400" />
                          </div>
                          <h3 className="text-gray-300 font-medium text-sm relative z-10">{t("pricing.optProposedCapacity")}</h3>
                        </div>
                        <div className="flex items-baseline gap-2 relative z-10">
                          <span className="text-2xl font-black text-white">
                            {pricingResult.proposedCapacity.startsWith("pricing.") ? t(pricingResult.proposedCapacity) : pricingResult.proposedCapacity}
                          </span>
                        </div>
                      </div>

                      {/* Giá combo dự kiến */}
                      <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 border border-orange-500/30 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/30 transition-colors" />
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-orange-500/20 p-2.5 rounded-xl relative z-10">
                            <Tag className="w-6 h-6 text-orange-400" />
                          </div>
                          <h3 className="text-gray-300 font-medium text-sm relative z-10">{t("pricing.optExpectedComboPrice")}</h3>
                        </div>
                        <div className="flex items-baseline gap-2 relative z-10">
                          <span className="text-2xl font-black text-white">{pricingResult.expectedComboPrice}</span>
                          {pricingResult.expectedComboPrice !== "-" && <span className="text-orange-400 font-bold">VNĐ</span>}
                        </div>
                      </div>

                      {/* Dự kiến tiết kiệm */}
                      <div className="bg-gradient-to-br from-rose-900/40 to-rose-800/20 border border-rose-500/30 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/20 rounded-full blur-2xl group-hover:bg-rose-500/30 transition-colors" />
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-rose-500/20 p-2.5 rounded-xl relative z-10">
                            <PiggyBank className="w-6 h-6 text-rose-400" />
                          </div>
                          <h3 className="text-gray-300 font-medium text-sm relative z-10">{t("pricing.optEstimatedMonthlySavings")}</h3>
                        </div>
                        <div className="flex items-baseline gap-2 relative z-10">
                          <span className="text-2xl font-black text-white">{pricingResult.estimatedMonthlySavings}</span>
                        </div>
                      </div>

                      {/* Thời gian hoàn vốn */}
                      <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/30 rounded-3xl p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-colors" />
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-purple-500/20 p-2.5 rounded-xl relative z-10">
                            <Clock className="w-6 h-6 text-purple-400" />
                          </div>
                          <h3 className="text-gray-300 font-medium text-sm relative z-10">{t("pricing.optExpectedPaybackPeriod")}</h3>
                        </div>
                        <div className="flex items-baseline gap-2 relative z-10">
                          <span className="text-2xl font-black text-white">{pricingResult.expectedPaybackPeriod}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <Link prefetch={false}
                        href="/menu/contact"
                        className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 uppercase tracking-wider"
                      >
                        {t("pricing.btnAdvice")} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "vi", ["common"])),
    },
  };
};
