"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

import { apiClient } from "@/lib/apiClient";
import { API_MENUS } from "@/lib/utils/constants";

interface SubMenu {
  menuName: string;
  menuUrl: string;
}

interface MenuItem {
  menuName: string;
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

// Giữ lại menu mặc định làm fallback khi API lỗi hoặc đang load
const initialNavigation: NavigationItem[] = [
  { name: "TRANG CHỦ", href: "/" },
  {
    name: "DỊCH VỤ",
    href: "/menu/services",
    submenu: [
      { name: "DỊCH VỤ LẮP ĐẶT HỆ THỐNG NĂNG LƯỢNG MẶT TRỜI", href: "/menu/services?category=lap-dat" },
      { name: "DỊCH VỤ O&M (VẬN HÀNH & BẢO TRÌ) TRỌN GÓI", href: "/menu/services?category=om" },
      { name: "DỊCH VỤ VỆ SINH TẤM PIN NLMT", href: "/menu/services?category=ve-sinh" },
      { name: "DỊCH VỤ GIÁM SÁT & VẬN HÀNH HỆ THỐNG NLMT BẰNG PHẦN MỀM SCADA", href: "/menu/services?category=scada" },
    ]
  },
  { name: "DỰ ÁN", href: "/menu/projects" },
  { name: "BẢNG GIÁ NHANH", href: "/menu/quick-pricing" },
  { name: "LIÊN HỆ", href: "/menu/contact" },
];

export default function Header({ initialMenus }: { initialMenus?: NavigationItem[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigation, setNavigation] = useState<NavigationItem[]>(
    initialMenus && initialMenus.length > 0 ? initialMenus : initialNavigation
  );

  useEffect(() => {
    const fetchMenus = async () => {
      if (initialMenus && initialMenus.length > 0) return;
      try {
        const data = await apiClient.get(API_MENUS) as MenuItem[];
        if (data && data.length > 0) {
          const fetchedMenus: NavigationItem[] = data
            .filter((item) => item.menuUrl !== "/menu/installation")
            .map((item) => ({
              name: item.menuName.toUpperCase(),
              href: item.menuUrl,
              submenu: item.subMenus && item.subMenus.length > 0 
                ? item.subMenus
                    .filter((sub) => sub.menuUrl !== "/menu/installation")
                    .map((sub) => ({
                      name: sub.menuName.toUpperCase(),
                      href: sub.menuUrl
                    }))
                : undefined
            }));
          setNavigation(fetchedMenus);
        }
      } catch (error) {
        const err = error as Error;
        console.warn("Failed to fetch menus from API in Header:", err.message);
      }
    };
    fetchMenus();
  }, [initialMenus]);

  const handleQuoteClick = (e: React.MouseEvent) => {
    if (window.location.pathname === "/menu/contact") {
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

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/menu/contact#ho-va-ten"
            onClick={handleQuoteClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 uppercase tracking-wider"
          >
            Nhận Báo Giá
          </Link>
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
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-3.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-orange-500/30 uppercase tracking-wider"
              >
                Nhận Báo Giá
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
