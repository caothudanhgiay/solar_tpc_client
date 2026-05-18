import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, MessageCircle, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
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
                  priority
                />
              </div>
              <span className="text-white font-bold text-lg mt-4 uppercase tracking-wide">
                ĐIỆN MẶT TRỜI TPC SOLAR
              </span>
            </Link>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/tpcsolar.vn/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="relative w-10 h-10 rounded-xl overflow-hidden hover:scale-110 transition-transform shadow-md block">
                <Image
                  src="/images/fb-icon.png"
                  alt="Facebook"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </a>
              <a href="#" aria-label="Zalo" className="relative w-10 h-10 rounded-xl overflow-hidden hover:scale-110 transition-transform shadow-md block">
                <Image
                  src="/images/zalo-icon.png"
                  alt="Zalo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 uppercase relative before:content-[''] before:absolute before:-bottom-3 before:left-0 before:w-10 before:h-1 before:bg-orange-500">
              LIÊN HỆ
            </h3>

            <div className="space-y-4">
              <h4 className="text-gray-300 font-bold text-sm uppercase">
                CÔNG TY TNHH DỊCH VỤ NĂNG LƯỢNG MẶT TRỜI TPC
              </h4>
              {/* <p className="text-sm text-gray-500 font-medium">MST: [Mã số thuế của bạn]</p> */}

              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">Khu phố Long Đức 1, Phường Tam Phước, Thành Phố Đồng Nai</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                  <span>079 779 1612</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-orange-500 shrink-0" />
                  <span>solar.tpcgr@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-orange-500 shrink-0" />
                  <span>www.tpcsolar.vn</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Policies */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 uppercase relative before:content-[''] before:absolute before:-bottom-3 before:left-0 before:w-10 before:h-1 before:bg-orange-500">
              HỖ TRỢ
            </h3>
            <ul className="space-y-3.5">
              {[
                'Cam kết bán hàng',
                'Chính sách bảo hành',
                'Giao hàng & thanh toán',
                'Bảo mật thông tin',
                'Tuyển dụng'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="flex items-center text-sm text-gray-400 hover:text-orange-500 transition-colors">
                    <ChevronRight className="h-4 w-4 mr-2 text-orange-500" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Map */}
          <div>
            <h3 className="text-white font-bold text-lg mb-8 uppercase relative before:content-[''] before:absolute before:-bottom-3 before:left-0 before:w-10 before:h-1 before:bg-orange-500">
              BẢN ĐỒ
            </h3>
            <div className="rounded-lg h-[200px] w-full overflow-hidden border border-white/10 shadow-sm">
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
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 mt-4">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} TPC Renewable Energy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
