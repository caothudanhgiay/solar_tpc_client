# Solar TPC Client - AI Coding Rules

> Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · i18next · Framer Motion

Đọc file `../AGENTS.md` (root) để hiểu tổng quan dự án.

<!-- BEGIN:nextjs-agent-rules -->
# ⚠️ This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## 1. Kiến trúc Ứng dụng (Architecture)

```
src/
├── components/
│   ├── layout/      # Layout component (Header, Footer, Sidebar...)
│   ├── sections/    # Section components cho trang chính (Hero, About, Services...)
│   └── ui/          # Reusable UI components (Button, Card, Input...)
├── lib/
│   ├── exception/   # Custom exception classes
│   └── utils/       # Utility functions + constants
├── pages/           # Next.js Pages Router (mỗi file = 1 route)
│   ├── _app.tsx     # App wrapper (Layout + i18n)
│   ├── _document.tsx# Custom HTML document
│   ├── index.tsx    # Trang chủ
│   └── [section]/   # Sub-pages theo nhóm
└── styles/
    └── globals.css  # Global CSS (Tailwind base)
```

## 2. Naming Convention

### Prefix bắt buộc: `Tso`
- Component file: `TsoXxxSection.tsx`, `TsoButton.tsx`
- Page file: Theo Next.js convention (`index.tsx`, `[slug].tsx`) — KHÔNG prefix cho pages
- Utility file: `PascalCase` → `TsoStringUtils.ts`
- CSS class: Dùng Tailwind — KHÔNG viết CSS class thủ công trừ khi thật sự cần thiết

### Import Path
- Dùng alias `@/` cho src: `import X from '@/components/ui/TsoButton'`
- KHÔNG dùng relative path dài: `../../components/...`

## 3. Coding Patterns

### 3.1. Page Component
```tsx
import Head from "next/head";
import TsoXxxSection from "@/components/sections/TsoXxxSection";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";

export default function XxxPage() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{`TPC SOLAR - ${t("xxx.title")}`}</title>
        <meta name="description" content={t("xxx.desc")} />
      </Head>
      <div className="flex flex-col min-h-screen">
        <TsoXxxSection />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "vi", ["common"])),
    },
  };
};
```

**Quy tắc Page:**
- Luôn có `<Head>` với `<title>` và `<meta description>` (SEO)
- Dùng `useTranslation("common")` cho i18n
- Export `getStaticProps` với `serverSideTranslations` cho SSG + i18n
- Default locale: `"vi"`

### 3.2. Section Component
```tsx
import { useTranslation } from "next-i18next/pages";
import { motion } from "framer-motion";

export default function TsoXxxSection() {
  const { t } = useTranslation("common");

  return (
    <section id="xxx" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          {t("xxx.title")}
        </motion.h2>
        {/* Content */}
      </div>
    </section>
  );
}
```

**Quy tắc Section:**
- Mỗi section là 1 file riêng trong `components/sections/`
- Dùng `<section id="...">` để hỗ trợ anchor navigation
- Dùng Framer Motion cho animations (scroll-triggered)
- Responsive: mobile-first với Tailwind breakpoints

### 3.3. UI Component
```tsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface TsoButtonProps {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TsoButton({ variant = "primary", children, className, ...props }: TsoButtonProps) {
  return (
    <button
      className={twMerge(clsx(
        "px-6 py-3 rounded-lg font-medium transition-all",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" && "bg-gray-100 text-gray-800 hover:bg-gray-200",
        variant === "outline" && "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
        className
      ))}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Quy tắc UI Component:**
- Dùng `clsx` + `tailwind-merge` để merge className
- Interface Props rõ ràng với TypeScript
- Hỗ trợ `className` prop để override styles
- Export default function (named export cho hooks/utils)

### 3.4. Layout
```tsx
// components/layout/Layout.tsx
import TsoHeader from "./TsoHeader";
import TsoFooter from "./TsoFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TsoHeader />
      <main>{children}</main>
      <TsoFooter />
    </>
  );
}
```

**Quy tắc Layout:**
- Layout wrap trong `_app.tsx` qua `appWithTranslation`
- Header/Footer là component riêng

## 4. Quy tắc Styling

- **Framework**: Tailwind CSS 4 (config qua `@tailwindcss/postcss`)
- **Ưu tiên**: Tailwind utility classes → custom CSS chỉ khi không thể dùng Tailwind
- **Responsive**: Mobile-first: `sm:`, `md:`, `lg:`, `xl:`
- **Dark mode**: Nếu cần, dùng Tailwind `dark:` variant
- **Animation**: Framer Motion cho scroll animations, Tailwind `transition-*` cho hover/focus

## 5. Quy tắc i18n

- Library: `next-i18next` (Pages Router version)
- Namespace: `"common"` (file `public/locales/vi/common.json`, `public/locales/en/common.json`)
- Import: `useTranslation` từ `"next-i18next/pages"`
- SSR: `serverSideTranslations` từ `"next-i18next/pages/serverSideTranslations"`
- KHÔNG hardcode text hiển thị

## 6. Icons

- Library: `lucide-react`
- Import: `import { IconName } from "lucide-react"`
- KHÔNG dùng inline SVG trừ khi lucide-react không có icon cần thiết

## 7. Build & Dev

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```
