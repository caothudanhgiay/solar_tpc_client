import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  ServerCrash, 
  FileQuestion, 
  Wrench, 
  AlertTriangle, 
  ArrowLeft, 
  Home, 
  RefreshCcw,
  PhoneCall
} from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'next-i18next/pages';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';

type ErrorType = 'maintenance' | 'not-found' | 'server-error' | 'page-error';

export default function ErrorPage() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [currentError, setCurrentError] = useState<ErrorType>('maintenance');

  useEffect(() => {
    if (router.isReady) {
      const type = router.query.type as string;
      if (type && ['maintenance', 'not-found', 'server-error', 'page-error'].includes(type)) {
        setCurrentError(type as ErrorType);
      }
    }
  }, [router.isReady, router.query]);

  const errorData = {
    'maintenance': {
      icon: Wrench,
      title: t('errors.maintenanceTitle'),
      subtitle: 'Nâng cấp trải nghiệm',
      description: t('errors.maintenanceDesc'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      glowColor: 'shadow-blue-500/20',
      gradient: 'from-blue-500 to-cyan-400',
      buttonText: t('errors.reloadPage'),
      buttonIcon: RefreshCcw,
      action: () => window.location.reload(),
    },
    'not-found': {
      icon: FileQuestion,
      title: t('errors.pageNotFoundTitle'),
      subtitle: 'Lạc đường rổi?',
      description: t('errors.pageNotFoundDesc'),
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      glowColor: 'shadow-amber-500/20',
      gradient: 'from-amber-400 to-orange-500',
      buttonText: t('errors.backToHome'),
      buttonIcon: Home,
      action: () => router.push('/'),
    },
    'server-error': {
      icon: ServerCrash,
      title: t('errors.serverErrorTitle'),
      subtitle: 'Sự cố kỹ thuật',
      description: t('errors.serverErrorDesc'),
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      glowColor: 'shadow-red-500/20',
      gradient: 'from-red-500 to-rose-400',
      buttonText: t('errors.reloadPage'),
      buttonIcon: RefreshCcw,
      action: () => window.location.reload(),
    },
    'page-error': {
      icon: AlertTriangle,
      title: t('errors.pageErrorTitle'),
      subtitle: 'Thao tác gián đoạn',
      description: t('errors.pageErrorDesc'),
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      glowColor: 'shadow-orange-500/20',
      gradient: 'from-orange-500 to-yellow-400',
      buttonText: 'Quay Lại',
      buttonIcon: ArrowLeft,
      action: () => window.history.back(),
    }
  };

  const current = errorData[currentError];
  const CurrentIcon = current.icon;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <Head>
        <title>{`${current.title} - TPC Solar`}</title>
      </Head>
      
      {/* Background Blobs — CSS animation thay framer-motion */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div 
          className={`absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-3xl opacity-30 bg-gradient-to-br ${current.gradient} animate-error-blob-1`}
        />
        <div 
          className={`absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-3xl opacity-20 bg-gradient-to-tl ${current.gradient} animate-error-blob-2`}
        />
      </div>

      {/* Main Content Card */}
      <div className="z-10 w-full max-w-2xl">
        <div
          key={currentError}
          className={`bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl ${current.glowColor} page-animate`}
        >
          <div className="flex flex-col items-center text-center">
            
            {/* Icon Container */}
            <div 
              className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${current.bgColor} ring-1 ring-white/10 page-animate`}
            >
              <CurrentIcon className={`w-12 h-12 ${current.color}`} />
            </div>

            {/* Text Content */}
            <span 
              className={`text-sm font-semibold tracking-wider uppercase mb-2 bg-clip-text text-transparent bg-gradient-to-r ${current.gradient} page-animate-delay-1`}
            >
              {current.subtitle}
            </span>
            
            <h1 
              className="text-3xl md:text-4xl font-bold text-white mb-4 page-animate-delay-1"
            >
              {current.title}
            </h1>
            
            <p 
              className="text-slate-300 md:text-lg mb-10 max-w-lg leading-relaxed page-animate-delay-2"
            >
              {current.description}
            </p>

            {/* Action Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 w-full justify-center page-animate-delay-2"
            >
              <button 
                onClick={current.action}
                className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-white transition-all transform hover:scale-105 active:scale-95 bg-gradient-to-r ${current.gradient} shadow-lg ${current.glowColor}`}
              >
                <current.buttonIcon className="w-5 h-5" />
                {current.buttonText}
              </button>

              <Link prefetch={false} href="/menu/contact" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-white bg-slate-700/50 hover:bg-slate-700 border border-slate-600 transition-all hover:scale-105 active:scale-95">
                <PhoneCall className="w-5 h-5" />
                {t('contact.title', 'Liên Hệ Hỗ Trợ')}
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Control Panel (For Demonstration Purposes) */}
      <div 
        className="z-20 mt-12 bg-slate-800/80 backdrop-blur-md rounded-2xl p-2 border border-slate-700 flex flex-wrap justify-center gap-2 max-w-3xl page-animate-delay-2"
      >
        <span className="w-full text-center text-xs text-slate-400 font-medium uppercase tracking-widest mb-1 pt-2">
          Mô phỏng các trạng thái lỗi
        </span>
        {[
          { id: 'maintenance', label: t('errors.maintenanceLabel'), icon: Wrench },
          { id: 'not-found', label: t('errors.notFoundLabel'), icon: FileQuestion },
          { id: 'server-error', label: t('errors.serverErrorLabel'), icon: ServerCrash },
          { id: 'page-error', label: t('errors.pageErrorLabel'), icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentError === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentError(tab.id as ErrorType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-slate-700 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'vi', ['common'])),
    },
  };
};
