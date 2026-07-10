import Header from "./Header";
import Footer from "./Footer";
import Toaster from "@/components/ui/Toast";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

// Lazy load TsoChatbot — không cần SSR, chỉ load khi client-side render
const TsoChatbot = dynamic(() => import("@/components/ui/TsoChatbot"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin", "vietnamese"], display: "swap" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} min-h-screen flex flex-col bg-slate-50`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <TsoChatbot />
      <Toaster />
    </div>
  );
}
