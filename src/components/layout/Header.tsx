"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";

import { apiClient } from "@/lib/utils/apiClient";
import { API_MENUS } from "@/lib/utils/constants";
import languagesUtils from "@/lib/utils/languagesUtils";

interface SubMenu {
  menuName: string;
  menuNameEng?: string;
  menuUrl: string;
}

interface MenuItem {
  menuName: string;
  menuNameEng?: string;
  menuUrl: string;
  subMenus?: SubMenu[];
}

interface NavigationItem {
  name: string;
  href: string;
  submenu?: {
    name: string;
    href: string;
  }[];
}

export default function Header({ initialMenus }: { initialMenus?: NavigationItem[] }) {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation("common");

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Giữ lại menu mặc định làm fallback khi API lỗi hoặc đang load
  const initialNavigation: NavigationItem[] = [
    { name: t("header.home"), href: "/" },
    {
      name: t("header.services"),
      href: "/menu/services",
      submenu: [
        { name: t("services.item1.title"), href: "/menu/services?category=lap-dat" },
        { name: t("services.item2.title"), href: "/menu/services?category=om" },
        { name: t("services.item3.title"), href: "/menu/services?category=ve-sinh" },
        { name: t("services.item4.title"), href: "/menu/services?category=scada" },
      ]
    },
    { name: t("header.projects"), href: "/menu/projects" },
    { name: t("header.pricing"), href: "/menu/quick-pricing" },
    { name: t("header.contact"), href: "/menu/contact" },
  ];

  const languages = languagesUtils.getLanguages();

  useEffect(() => {
    if (initialMenus && initialMenus.length > 0) return;

    const controller = new AbortController();
    // Timeout 8 giây — đủ thời gian cho kết nối Docker network trên production Linux
    const timeout = setTimeout(() => controller.abort(), 8000);

    const fetchMenus = async () => {
      try {
        const response = await apiClient.get<any>(API_MENUS, { signal: controller.signal });
        const data = response.data as MenuItem[];
        if (data && data.length > 0) {
          setMenuItems(data);
        }
      } catch (error: any) {
        // Bỏ qua lỗi AbortError (do timeout hoặc unmount) — dùng menu mặc định
        const isAbortError = error?.name === 'AbortError'
          || (error?.message && error.message.includes('aborted'));
        if (!isAbortError) {
          console.warn("Failed to fetch menus from API in Header:", error?.message);
        }
      }
    };

    fetchMenus();

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [initialMenus]);

  // Sinh navigation đã được dịch tự động
  const navigation: NavigationItem[] = initialMenus && initialMenus.length > 0
    ? initialMenus
    : menuItems.length > 0
      ? menuItems
        .filter((item) => item.menuUrl !== "/menu/installation")
        .map((item) => ({
          name: (locale === 'en' && item.menuNameEng ? item.menuNameEng : item.menuName).toUpperCase(),
          href: item.menuUrl,
          submenu: item.subMenus && item.subMenus.length > 0
            ? item.subMenus
              .filter((sub) => sub.menuUrl !== "/menu/installation")
              .map((sub) => ({
                name: (locale === 'en' && sub.menuNameEng ? sub.menuNameEng : sub.menuName).toUpperCase(),
                href: sub.menuUrl
              }))
            : undefined
        }))
      : initialNavigation;

  const handleQuoteClick = (e: React.MouseEvent) => {
    if (window.location.pathname.endsWith("/menu/contact")) {
      e.preventDefault();
      const input = document.getElementById("ho-va-ten") as HTMLInputElement | null;
      if (input) {
        const offset = 120;
        const top = input.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        setTimeout(() => input.focus(), 300);
      }
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-white/10 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <div className="relative w-56 md:w-64 lg:w-72 h-16 md:h-20 transition-transform group-hover:scale-105">
            <Image
              src="/images/logo_tpc.png"
              alt="TPC Logo"
              fill
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              className="object-contain object-left"
              priority
              loading="eager"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navigation.map((item) => (
            item.submenu ? (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm font-bold transition-colors hover:text-orange-500 text-white/90 hover:text-white flex items-center gap-1 uppercase tracking-wider"
                >
                  {item.name}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="absolute top-full left-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="w-64 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-3 text-xs text-gray-300 hover:text-orange-400 hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors uppercase tracking-wide"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-bold transition-colors hover:text-orange-500 text-white/90 hover:text-white uppercase tracking-wider"
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>

        {/* Action Button & Language Switcher */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/menu/contact#ho-va-ten"
            onClick={handleQuoteClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 uppercase tracking-wider"
          >
            {t("header.getQuote")}
          </Link>

          {/* Language Selector */}
          <div className="flex items-center gap-3 border-l border-white/20 pl-4 h-6">
            {
              Object.keys(languages).map((lang) => {
                const langConfig = languages[lang as keyof typeof languages];
                return (
                  <button
                    key={lang}
                    onClick={() => languagesUtils.changeLanguage(lang)}
                    className="flex items-center transition-all focus:outline-none"
                  >
                    <img
                      src={langConfig.file_path}
                      alt={langConfig.title}
                      className={cn(
                        "w-7 h-5 object-cover rounded-md transition-all duration-300",
                        locale === lang
                          ? "shadow-[0_0_8px_rgba(255,255,255,0.3)] scale-110"
                          : "opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-105"
                      )}
                    />
                  </button>
                );
              })
            }
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md transition-colors text-white hover:text-orange-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Mở menu</span>
          {mobileMenuOpen ? (
            <X className="block h-7 w-7" aria-hidden="true" />
          ) : (
            <Menu className="block h-7 w-7" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900 shadow-2xl border-t border-white/10 py-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 px-4">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => !item.submenu && setMobileMenuOpen(false)}
                  className="block text-white hover:text-orange-500 hover:bg-white/5 px-4 py-3 rounded-lg text-sm font-semibold transition-colors uppercase tracking-wider"
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="pl-6 flex flex-col space-y-1 pb-2">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-300 hover:text-orange-500 hover:bg-white/5 px-4 py-2 rounded-lg text-xs transition-colors uppercase tracking-wide"
                      >
                        - {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 pb-2 px-2">
              <Link
                href="/menu/contact#ho-va-ten"
                onClick={(e) => { handleQuoteClick(e); setMobileMenuOpen(false); }}
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-3.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-orange-500/30 uppercase tracking-wider mb-4"
              >
                {t("header.getQuote")}
              </Link>
            </div>

            {/* Language Selector Mobile */}
            <div className="flex items-center justify-center gap-4 py-3 border-t border-white/10 mt-2">
              <button
                onClick={() => { languagesUtils.changeLanguage("vi"); setMobileMenuOpen(false); }}
                className={cn(
                  "flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg border transition-all w-36 focus:outline-none",
                  locale === "vi"
                    ? "text-orange-500 border-orange-500 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]"
                    : "text-white/60 border-white/10 hover:text-white"
                )}
              >
                <img
                  src="/images/vi_rec.png"
                  alt="Tiếng Việt"
                  className="w-5 h-3.5 object-cover rounded shadow-sm"
                />
                TIẾNG VIỆT
              </button>
              <button
                onClick={() => { languagesUtils.changeLanguage("en"); setMobileMenuOpen(false); }}
                className={cn(
                  "flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg border transition-all w-36 focus:outline-none",
                  locale === "en"
                    ? "text-orange-500 border-orange-500 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]"
                    : "text-white/60 border-white/10 hover:text-white"
                )}
              >
                <img
                  src="/images/en_rec.png"
                  alt="English"
                  className="w-5 h-3.5 object-cover rounded shadow-sm"
                />
                ENGLISH
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
