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
│   ├── helpers/     # Business logic thuần (tính toán, mapping...) — KHÁC utils (xem quy tắc bên dưới)
│   └── utils/       # Utility functions + constants + wrapper (axios, storage...)
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
- CSS class: Dùng Tailwind utility classes. Chỉ viết CSS class thủ công (trong `globals.css`) khi hiệu ứng/animation đó Tailwind không có sẵn utility tương ứng (vd: keyframes phức tạp) — không dùng để thay thế utility class đã tồn tại

### Import Path
- Dùng alias `@/` cho src: `import X from '@/components/ui/TsoButton'`
- KHÔNG dùng relative path dài: `../../components/...`

### Ngoại lệ naming với file cũ
- Nhiều file trong `lib/utils/` (`apiClient.ts`, `constants.ts`, `utils.ts`, `languagesUtils.ts`, `useScrollAnimation.ts`) và `components/ui/Toast.tsx` **không** theo prefix `Tso` — đây là code cũ, giữ nguyên tên, **KHÔNG tự ý đổi tên** các file này khi không được yêu cầu (tránh phá vỡ import ở nhiều nơi ngoài ý muốn).
- **Mọi file utility/helper MỚI tạo từ nay** bắt buộc theo đúng rule `TsoXxxUtils.ts` / `TsoXxxHelper.ts` (vd: `TsoImageUtils.ts`, `TsoPricingHelper.ts`).
- `lib/helpers/` vs `lib/utils/`: `helpers/` chứa logic nghiệp vụ thuần (tính giá, tính toán theo rule business — vd `TsoPricingHelper.ts`); `utils/` chứa hàm tiện ích chung không gắn nghiệp vụ cụ thể (format, gọi API, thao tác ảnh...).

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
- **`getStaticProps` (SSG) vs `getServerSideProps` (SSR)**: mặc định dùng `getStaticProps` cho các trang nội dung tĩnh/ít đổi (trang chủ, dịch vụ, giới thiệu...). Chỉ dùng `getServerSideProps` khi trang **phụ thuộc route param động cần data mới nhất mỗi lần load** (vd `pages/projects/[id].tsx` — chi tiết 1 dự án cụ thể theo `id`, không thể pre-render hết mọi id lúc build). Trang dùng `getServerSideProps` vẫn phải giữ `serverSideTranslations` như bình thường.

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

### 3.5. Next.js Image Optimization (`next/image`)

> Đây là pattern hay lỗi nhất trong project — mọi thay đổi liên quan ảnh PHẢI đọc kỹ mục này trước khi code.

**Luôn ưu tiên `next/image` (`<Image>`), KHÔNG dùng `<img>` thô**, trừ trường hợp ảnh đến từ domain không nằm trong whitelist (xem bên dưới). Dùng helper dùng chung `resolveImageUrl()` / `isOptimizableImage()` trong `@/lib/utils/TsoImageUtils` cho mọi ảnh lấy từ backend (`/upload/...`):

```tsx
import { resolveImageUrl, isOptimizableImage } from "@/lib/utils/TsoImageUtils";

const resolvedSrc = resolveImageUrl(project.image); // ghép API_URL nếu là path /upload/...
{isOptimizableImage(resolvedSrc) ? (
  <Image src={resolvedSrc} alt={...} fill sizes="..." />
) : (
  <img src={resolvedSrc} alt={...} /> // fallback cho domain lạ chưa whitelist
)}
```

**Checklist BẮT BUỘC khi thêm/đổi bất kỳ ảnh nào:**
1. **Domain mới** (CDN, domain backend mới, domain ảnh bên thứ 3...) → phải thêm vào `images.remotePatterns` trong `next.config.ts`, đồng thời thêm vào `OPTIMIZABLE_HOSTS`/logic của `TsoImageUtils.ts` nếu dùng cơ chế fallback `<img>`. Next.js sẽ trả lỗi `"url" parameter is not allowed` nếu quên bước này.
2. **`<Image fill>`** luôn phải có prop `sizes` khớp với layout thực tế (grid mấy cột, width bao nhiêu %) — thiếu `sizes` không lỗi cứng nhưng gây cảnh báo console + next/image chọn ảnh sai kích thước, tải dư băng thông.
3. **`quality={n}`** dùng giá trị nào thì giá trị đó PHẢI có mặt trong `images.qualities` ở `next.config.ts` (hiện tại: `[50, 60, 75]`) — nếu thêm quality mới (vd `quality={90}`) phải thêm `90` vào mảng này, nếu không request ảnh sẽ lỗi (không phải chỉ warning).
4. **Ảnh từ `localhost`/IP nội bộ (dev)**: Next.js 16 mặc định CHẶN tối ưu ảnh từ IP private/loopback (chống SSRF) — đã bật `dangerouslyAllowLocalIP: true` nhưng **chỉ khi `NODE_ENV !== 'production'`**. KHÔNG bật cờ này cho production (rủi ro bảo mật) — domain backend production phải là domain public thật (vd `tpcsolar.vn`) trong `remotePatterns`.
5. Sau khi sửa `next.config.ts` (remotePatterns/qualities/bất kỳ field nào) → **phải restart lại dev server**, Next.js không hot-reload file config này.

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
- Rule chi tiết + checklist bắt buộc: xem section **"🚫 Quy tắc Tránh Hardcode Text / i18n"** phía dưới

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

## 8. Quy tắc Testing

- Project **hiện chưa có test framework** (không Jest/Vitest/Playwright trong `package.json`) — đây là chủ ý hiện tại, không phải thiếu sót cần tự ý bổ sung framework mới.
- Cách verify hiện tại: chạy `npm run dev`, dùng Browser Pane/trình duyệt thật để kiểm tra bằng mắt (đặc biệt với thay đổi UI/ảnh) + `npm run lint` + `npx tsc --noEmit` để bắt lỗi type/lint.
- Nếu người dùng yêu cầu thêm test framework, hỏi rõ chọn Jest hay Vitest trước khi cài (ảnh hưởng cấu hình Next.js + cách mock `next/image`, `next/router`).

## 🚫 Quy tắc Tránh Hardcode Text / i18n (BẮT BUỘC — xem thêm `../AGENTS.md`)

**KHÔNG bao giờ** viết text tiếng Việt/Anh trực tiếp trong JSX. Luôn dùng `t('key')` với `useTranslation("common")`.

```tsx
// ❌ SAI — text cứng trong JSX
<h1>Chào mừng đến với TPC Solar</h1>
<button>Gửi liên hệ</button>
<input placeholder="Nhập số điện thoại" />
toast.error("Gửi thất bại, vui lòng thử lại")

// ✅ ĐÚNG — qua i18n, key thêm ở CẢ 2 file: public/locales/vi/common.json và public/locales/en/common.json
<h1>{t('home.welcome')}</h1>
<button>{t('contact.submit')}</button>
<input placeholder={t('contact.phonePlaceholder')} />
toast.error(t('contact.submitError'))
```

**Checklist trước khi hoàn thành task:**
1. Không còn chuỗi text nào literal trong JSX (kể cả `alt=""`, `title=""`, `placeholder=""`).
2. Mọi key mới đã thêm vào **cả** `public/locales/vi/common.json` **và** `public/locales/en/common.json`.
3. Không dùng string nối trực tiếp (`"Xin chào " + name`) — dùng interpolation của i18next: `t('greeting', { name })`.

## Quy tắc Tránh Hardcode Cấu hình
- **TUYỆT ĐỐI KHÔNG** hardcode các giá trị cấu hình như: đường dẫn thư mục (file paths), URL, API keys, credentials, port, v.v.
- Luôn sử dụng các biến cấu hình môi trường (ví dụ: `.env`, `process.env`) để lưu trữ các giá trị này.
- **Bắt buộc hỏi ý kiến người dùng** trước khi tự định nghĩa hoặc sử dụng một biến môi trường/cấu hình mới để đảm bảo tính đồng nhất với dự án.
- **Lưu ý (known issue)**: `src/lib/utils/constants.ts` hiện đang hardcode `API_URL` theo `process.env.NODE_ENV` (`'https://tpcsolar.vn'` prod / `'http://localhost:8080'` dev) thay vì đọc `process.env.NEXT_PUBLIC_API_URL` — dù biến này đã được truyền sẵn qua `docker-compose.yml` (build-arg + env). Khi sửa file này, ưu tiên đổi sang đọc `NEXT_PUBLIC_API_URL` (có fallback theo `NODE_ENV` như hiện tại) để đồng bộ với Docker config, trừ khi người dùng nói giữ nguyên.

## Quy tắc Atomic Save (Multipart File Upload)
- **Lưu dữ liệu trước khi lưu ảnh**: Đối với các tính năng có upload file, LUÔN LUÔN sử dụng giao thức `multipart/form-data` để gửi chung chuỗi JSON data và files trong cùng một Request.
- Tại Backend, phải mở `@Transactional`. Tiến hành lưu dữ liệu Entity vào Database trước, gọi `flush()` để ép Spring đẩy lệnh SQL xuống Database nhằm phát hiện sớm lỗi (vd: trùng lặp, sai format). Chỉ khi Database không có lỗi mới tiến hành lưu file vật lý ra đĩa, sau đó cập nhật lại đường dẫn file vào Entity.
- Điều này đảm bảo khi có lỗi lưu dữ liệu, transaction sẽ rollback và không sinh ra file rác trên ổ cứng.
