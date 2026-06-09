process.env.TZ = 'Asia/Ho_Chi_Minh';

import type { NextConfig } from "next";
const { i18n } = require('./next-i18next.config');

const nextConfig: NextConfig = {
  output: "standalone",
  i18n,

  // Bật nén gzip cho response
  compress: true,

  // Tắt header "X-Powered-By: Next.js" — bảo mật
  poweredByHeader: false,

  // Strict mode giúp phát hiện lỗi sớm
  reactStrictMode: true,

  images: {
    // Ưu tiên AVIF (nhỏ nhất) → WebP → fallback
    formats: ['image/avif', 'image/webp'],
    // Tối ưu kích thước device
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
