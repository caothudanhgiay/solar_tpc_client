import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="vi" className="scroll-smooth" data-scroll-behavior="smooth">
      <Head>
        <link rel="icon" href="/icon.png?v=2" type="image/png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
