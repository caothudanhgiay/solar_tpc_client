import { useEffect, useRef, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { User, Phone, Mail, MapPin, MessageSquare, ShieldCheck, RefreshCw } from "lucide-react";
import Head from "next/head";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { GetStaticProps } from "next";

import { apiClient } from "@/lib/utils/apiClient";
import { Toast } from "@/components/ui/Toast";
import { ApiException } from "@/lib/exception/exception";

export default function ContactPage() {
  const { t } = useTranslation("common");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    requestContent: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, answer: num1 + num2 });
    setUserCaptcha("");
    setCaptchaError("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (router.asPath.includes("#ho-va-ten") && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [router.asPath]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmitClick = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerPhone.trim() || !formData.requestContent.trim()) {
      Toast.error(t("contact.requiredFieldsAlert"));
      return;
    }
    generateCaptcha();
    setShowCaptchaModal(true);
  };

  const handleCaptchaSubmit = async () => {
    if (parseInt(userCaptcha) !== captcha.answer) {
      setCaptchaError(t("contact.incorrectCaptcha"));
      generateCaptcha();
      return;
    }

    setShowCaptchaModal(false);
    setLoading(true);
    setErrors({});

    try {
      const response = await apiClient.post<any>("/api/customer-requests", formData);
      Toast.success(response?.message || t("customer_request.success"));
      setFormData({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        customerAddress: "",
        requestContent: "",
      });
    } catch (error: any) {
      if (error instanceof ApiException && error.statusCode === 400 && error.data) {
        setErrors(error.data);
      } else {
        Toast.error(error.message || t("error.system_error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t("contact.metaTitle")}</title>
        <meta name="description" content={t("contact.metaDesc")} />
      </Head>
      <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">
        {/* Background with overlay to match Home Page */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/70 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')" }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-20">

          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-white uppercase mb-4">
              {t("contact.title")}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-12 bg-orange-500"></div>
              <div className="w-3 h-3 rotate-45 border border-orange-500"></div>
              <div className="h-[1px] w-12 bg-orange-500"></div>
            </div>
          </div>

          {/* Info & Map Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Info Column */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl h-full">
                <h2 className="text-orange-500 font-bold text-xl uppercase mb-8">
                  {t("footer.companyName")}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-white/10 p-3 rounded-full text-orange-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{t("contact.officeTitle")}</h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {t("contact.officeAddress")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-white/10 p-3 rounded-full text-orange-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Hotline</h3>
                      <p className="text-orange-400 font-bold text-lg">079 779 1612</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-white/10 p-3 rounded-full text-orange-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Email</h3>
                      <p className="text-gray-300 text-sm">solar.tpcgr@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Column */}
            <div className="h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-lg relative">
              <iframe
                src="https://maps.google.com/maps?q=%E1%BA%A4p+Long+%C4%90%E1%BB%A9c+1,+P+Tam+Ph%C6%B0%E1%BB%9Bc+TP+Bi%C3%AAn+Ho%C3%A0+,+T%E1%BB%89nh+%C4%90%E1%BB%93ng+Nai&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-2xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">{t("contact.sendUsTitle")}</h2>
              <p className="text-gray-400 text-sm">{t("contact.sendUsDesc")}</p>
            </div>

            <form onSubmit={handleSubmitClick} className="space-y-8" autoComplete="off">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className={`absolute top-3 left-0 ${errors.customerName ? "text-red-500" : "text-orange-400"}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    ref={nameInputRef}
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    id="ho-va-ten"
                    type="text"
                    autoComplete="off"
                    placeholder={t("contact.placeholderName")}
                    className={`w-full pl-8 pr-4 py-3 bg-transparent border-0 border-b ${errors.customerName ? "border-red-500 text-red-500" : "border-gray-600 text-white focus:border-orange-500"} outline-none focus:ring-0 placeholder-gray-500 transition-colors`}
                  />
                  {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                </div>
                <div className="relative">
                  <div className={`absolute top-3 left-0 ${errors.customerPhone ? "text-red-500" : "text-orange-400"}`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    type="tel"
                    autoComplete="off"
                    placeholder={t("contact.placeholderPhone")}
                    className={`w-full pl-8 pr-4 py-3 bg-transparent border-0 border-b ${errors.customerPhone ? "border-red-500 text-red-500" : "border-gray-600 text-white focus:border-orange-500"} outline-none focus:ring-0 placeholder-gray-500 transition-colors`}
                  />
                  {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className={`absolute top-3 left-0 ${errors.customerEmail ? "text-red-500" : "text-orange-400"}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    type="email"
                    autoComplete="off"
                    placeholder={t("contact.placeholderEmail")}
                    className={`w-full pl-8 pr-4 py-3 bg-transparent border-0 border-b ${errors.customerEmail ? "border-red-500 text-red-500" : "border-gray-600 text-white focus:border-orange-500"} outline-none focus:ring-0 placeholder-gray-500 transition-colors`}
                  />
                  {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
                </div>
                <div className="relative">
                  <div className={`absolute top-3 left-0 ${errors.customerAddress ? "text-red-500" : "text-orange-400"}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    name="customerAddress"
                    value={formData.customerAddress}
                    onChange={handleInputChange}
                    type="text"
                    autoComplete="off"
                    placeholder={t("contact.placeholderAddress")}
                    className={`w-full pl-8 pr-4 py-3 bg-transparent border-0 border-b ${errors.customerAddress ? "border-red-500 text-red-500" : "border-gray-600 text-white focus:border-orange-500"} outline-none focus:ring-0 placeholder-gray-500 transition-colors`}
                  />
                  {errors.customerAddress && <p className="text-red-500 text-xs mt-1">{errors.customerAddress}</p>}
                </div>
              </div>

              <div className="relative">
                <div className={`absolute top-3 left-0 ${errors.requestContent ? "text-red-500" : "text-orange-400"}`}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <textarea
                  name="requestContent"
                  value={formData.requestContent}
                  onChange={handleInputChange}
                  placeholder={t("contact.placeholderMessage")}
                  rows={4}
                  className={`w-full pl-8 pr-4 py-3 bg-transparent border-0 border-b ${errors.requestContent ? "border-red-500 text-red-500" : "border-gray-600 text-white focus:border-orange-500"} outline-none focus:ring-0 placeholder-gray-500 transition-colors resize-none`}
                ></textarea>
                {errors.requestContent && <p className="text-red-500 text-xs mt-1">{errors.requestContent}</p>}
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 disabled:cursor-not-allowed text-white font-bold py-3 px-14 rounded-full transition-all inline-flex items-center gap-2 uppercase tracking-wider shadow-lg shadow-orange-500/30 hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      {t("contact.btnSending")}
                    </>
                  ) : (
                    t("contact.btnSend")
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      {/* Captcha Modal */}
      {showCaptchaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-white mb-4 text-center">{t("contact.securityVerify")}</h3>
            <p className="text-gray-400 text-sm text-center mb-6">{t("contact.securityVerifyDesc")}</p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-4 bg-black/40 border border-white/20 rounded-xl px-4 py-4">
                <span className="text-orange-400 font-bold text-2xl tracking-wider select-none">
                  {captcha.num1} + {captcha.num2} = ?
                </span>
                <button type="button" onClick={generateCaptcha} className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-lg">
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <div className={`absolute top-3 left-3 ${captchaError ? "text-red-500" : "text-gray-400"}`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  value={userCaptcha}
                  onChange={(e) => {
                    setUserCaptcha(e.target.value);
                    setCaptchaError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCaptchaSubmit();
                    }
                  }}
                  autoFocus
                  placeholder={t("contact.enterResult")}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${captchaError ? "border-red-500 text-red-500" : "border-white/20 text-white focus:border-orange-500"} rounded-xl outline-none focus:ring-0 placeholder-gray-500 transition-colors text-center text-lg`}
                />
                {captchaError && <p className="text-red-500 text-xs mt-2 text-center">{captchaError}</p>}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowCaptchaModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-300 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {t("contact.btnCancel")}
                </button>
                <button
                  type="button"
                  onClick={handleCaptchaSubmit}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-colors"
                >
                  {t("contact.btnConfirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
