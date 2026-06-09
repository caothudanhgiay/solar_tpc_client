import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import { appWithTranslation } from 'next-i18next/pages'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      document.body.classList.add('is-loading')
    }
    const handleComplete = () => {
      document.body.classList.remove('is-loading')
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <>
      <Head>
        <link rel="icon" href="/icon.png?v=2" key="favicon" type="image/png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default appWithTranslation(App)
