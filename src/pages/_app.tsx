import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { appWithTranslation } = require('next-i18next/pages')
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef, useCallback } from 'react'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'completing'>('idle')
  const completingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Dọn timer khi unmount
  const clearTimer = useCallback(() => {
    if (completingTimerRef.current) {
      clearTimeout(completingTimerRef.current)
      completingTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    const handleStart = () => {
      clearTimer()
      setLoadingState('loading')
      document.body.classList.add('is-loading')
    }
    const handleComplete = () => {
      document.body.classList.remove('is-loading')
      // Chuyển sang trạng thái "completing" — animation chạy đến 100% rồi mờ dần
      setLoadingState('completing')
      completingTimerRef.current = setTimeout(() => {
        setLoadingState('idle')
      }, 350) // Khớp với thời gian animation loadingBarComplete (0.3s + buffer)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
      clearTimer()
    }
  }, [router, clearTimer])

  return (
    <>
      <Head>
        <link rel="icon" href="/icon.png?v=2" key="favicon" type="image/png" />
      </Head>
      {/* Loading bar — hiển thị khi đang navigate giữa các trang */}
      {loadingState === 'loading' && <div className="loading-bar" />}
      {loadingState === 'completing' && <div className="loading-bar loading-bar-complete" />}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default appWithTranslation(App)

