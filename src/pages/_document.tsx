import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="vi" className="scroll-smooth" data-scroll-behavior="smooth">
      <Head>
        <link rel="icon" href="/icon.png?v=2" type="image/png" />

        {/* DNS Prefetch & Preconnect — giảm latency khi gọi API và load resource bên ngoài */}
        {/* Không preconnect Google Fonts: font Inter đã tự host qua next/font (Layout.tsx) */}
        <link rel="dns-prefetch" href="//maps.google.com" />

        {/* Scroll animation chỉ ẩn nội dung (opacity:0) khi có class "anim-ready" trên <html>.
            Fail-safe: nếu sau 3s React vẫn chưa hydrate (JS chunk tải chậm/lỗi 522...) thì gỡ class
            → hiện toàn bộ nội dung SSR thay vì để người dùng thấy trang trống. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('anim-ready');" +
              "setTimeout(function(){if(!window.__tsoHydrated)document.documentElement.classList.remove('anim-ready')},3000);",
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
