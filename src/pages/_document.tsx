import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="vi" className="scroll-smooth" data-scroll-behavior="smooth">
      <Head>
        <link rel="icon" href="/icon.png?v=2" type="image/png" />

        {/* DNS Prefetch & Preconnect — giảm latency khi gọi API và load resource bên ngoài */}
        <link rel="dns-prefetch" href="//maps.google.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
