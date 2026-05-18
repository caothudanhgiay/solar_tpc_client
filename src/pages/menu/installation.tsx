import Head from "next/head";

export default function InstallationPage() {
  return (
    <>
      <Head>
        <title>Lắp Đặt - TPC Solar</title>
        <meta name="description" content="Hướng dẫn và quy trình lắp đặt hệ thống điện mặt trời của TPC Solar." />
      </Head>
      <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/70 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')" }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-20">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-white uppercase mb-4">
              Lắp Đặt
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-12 bg-orange-500"></div>
              <div className="w-3 h-3 rotate-45 border border-orange-500"></div>
              <div className="h-[1px] w-12 bg-orange-500"></div>
            </div>
            <p className="text-gray-300 mt-6">
              Đang cập nhật thông tin lắp đặt...
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
