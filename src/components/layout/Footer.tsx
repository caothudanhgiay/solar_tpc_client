import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, ChevronRight, Wrench } from "lucide-react";

import { useTranslation } from "next-i18next/pages";
import { useScrollAnimation } from "@/lib/utils/useScrollAnimation";

export default function Footer() {
  const { t } = useTranslation("common");

  // Chỉ load Google Maps iframe khi section scroll vào viewport
  const mapSection = useScrollAnimation(0.1);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const supportItems = [
    { label: t("footer.warranty"), href: "#", comingSoon: true },
    { label: t("footer.delivery"), href: "#", comingSoon: true },
    { label: t("footer.privacy"), href: "#", comingSoon: false },
    { label: t("footer.career"), href: "#", comingSoon: false },
  ];

  return (
    <>
      {/* Modal Sắp Ra Mắt */}
      {showComingSoon && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowComingSoon(false)}
        >
          <div
            className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-orange-500/20 p-4 rounded-full">
                <Wrench className="w-8 h-8 text-orange-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">{t("footer.comingSoonTitle")}</h3>
            <p className="text-gray-400 text-sm mb-6">
              {t("footer.comingSoonDesc")}
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="w-full py-2.5 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
            >
              {t("footer.comingSoonBtn")}
            </button>
          </div>
        </div>
      )}

      <footer className="bg-slate-950 pt-16 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

            {/* Column 1: Brand & Social */}
            <div className="space-y-6">
              <Link href="/" className="flex flex-col items-start group mb-2">
                <div className="relative w-48 md:w-64 lg:w-72 h-14 md:h-20 transition-transform group-hover:scale-105 bg-white/5 p-2 rounded-xl border border-white/10">
                  <Image
                    src="/images/logo_tpc.png"
                    alt="TPC Logo"
                    fill
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
                    className="object-contain p-1 object-left"
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>

            {/* Column 2: Contact Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-8 uppercase relative before:content-[''] before:absolute before:-bottom-3 before:left-0 before:w-10 before:h-1 before:bg-orange-500">
                {t("footer.contactTitle")}
              </h3>

              <div className="space-y-4">
                <h4 className="text-gray-300 font-bold text-sm uppercase">
                  {t("footer.companyName")}
                </h4>
                <h4 className="text-gray-300 font-bold text-sm uppercase">
                  {t("footer.taxIDNumber")}
                </h4>

                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{t("footer.addressValue")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                    <span>{t("common.tel")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-orange-500 shrink-0" />
                    <span>solar.tpcgr@gmail.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-orange-500 shrink-0" />
                    <span>www.tpcsolar.vn</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="relative h-5 w-5 shrink-0">
                      <Image src="/images/fb-icon.webp" alt="Facebook" fill className="object-contain" sizes="20px" />
                    </div>
                    <a href="https://www.facebook.com/tpcsolar.vn/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Facebook</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="relative h-5 w-5 shrink-0">
                      <Image src="/images/zalo-icon.png" alt="Zalo" fill className="object-contain" sizes="20px" />
                    </div>
                    <a href="#" className="hover:text-orange-400 transition-colors">Zalo</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 3: Policies */}
            <div>
              <h3 className="text-white font-bold text-lg mb-8 uppercase relative before:content-[''] before:absolute before:-bottom-3 before:left-0 before:w-10 before:h-1 before:bg-orange-500">
                {t("footer.supportTitle")}
              </h3>
              <ul className="space-y-3.5">
                {supportItems.map((item) => (
                  <li key={item.label}>
                    {item.comingSoon ? (
                      <button
                        onClick={() => setShowComingSoon(true)}
                        className="flex items-center text-sm text-gray-400 hover:text-orange-500 transition-colors w-full text-left"
                      >
                        <ChevronRight className="h-4 w-4 mr-2 text-orange-500" />
                        {item.label}
                        <span className="ml-2 text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded-full font-bold uppercase">{t("footer.soon")}</span>
                      </button>
                    ) : (
                      <a href={item.href} className="flex items-center text-sm text-gray-400 hover:text-orange-500 transition-colors">
                        <ChevronRight className="h-4 w-4 mr-2 text-orange-500" />
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Map — Lazy load iframe khi scroll vào viewport */}
            <div ref={mapSection.ref}>
              <h3 className="text-white font-bold text-lg mb-8 uppercase relative before:content-[''] before:absolute before:-bottom-3 before:left-0 before:w-10 before:h-1 before:bg-orange-500">
                {t("footer.mapTitle")}
              </h3>
              <div className="rounded-lg h-[200px] w-full overflow-hidden border border-white/10 shadow-sm bg-slate-800">
                {(mapSection.isVisible || mapLoaded) ? (
                  <iframe
                    src="https://maps.google.com/maps?q=%E1%BA%A4p+Long+%C4%90%E1%BB%A9c+1,+P+Tam+Ph%C6%B0%E1%BB%9Bc+TP+Bi%C3%AAn+Ho%C3%A0+,+T%E1%BB%89nh+%C4%90%E1%BB%93ng+Nai&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setMapLoaded(true)}
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    <MapPin className="w-6 h-6 mr-2 text-orange-500/50" />
                    Đang tải bản đồ...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 mt-4">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-sm text-gray-500 font-medium">
              &copy; {new Date().getFullYear()} {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
