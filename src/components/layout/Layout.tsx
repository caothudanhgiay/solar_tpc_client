import Header from "./Header";
import Footer from "./Footer";
import Toaster from "@/components/ui/Toast";
import TsoChatbot from "@/components/ui/TsoChatbot";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

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
