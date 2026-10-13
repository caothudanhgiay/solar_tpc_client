import { API_URL } from "./constants";

function getHostname(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// Các host cho phép đi qua next/image optimizer (phải có trong `images.remotePatterns` của next.config.ts).
// KHÔNG đưa host backend (API_URL) vào đây: optimizer chạy trong container frontend phải fetch ngược lại
// domain công khai (vòng qua Cloudflare về chính VPS) → bị ETIMEDOUT trên production, gây 504 và nghẽn
// các request khác. Ảnh /upload đã được backend nén sẵn khi upload (TsoImageUtil) nên trình duyệt tải thẳng
// qua <img> (Cloudflare cache được) là đủ nhanh.
const OPTIMIZABLE_HOSTS = ["images.unsplash.com"];

/**
 * Ghép đường dẫn ảnh trả về từ backend (vd: "/upload/...") thành URL đầy đủ.
 * Ảnh đã là URL tuyệt đối hoặc đường dẫn local (/images/...) thì giữ nguyên.
 */
export function resolveImageUrl(rawSrc: string): string {
  if (!rawSrc) return rawSrc;
  return rawSrc.startsWith("/upload") ? `${API_URL}${rawSrc}` : rawSrc;
}

/**
 * Kiểm tra ảnh có thể đi qua next/image (được tối ưu: resize, chuyển AVIF/WebP,
 * responsive sizes) hay không, dựa trên whitelist trong next.config.ts.
 * Ảnh local (đường dẫn tương đối trong /public) luôn tối ưu được.
 */
export function isOptimizableImage(resolvedSrc: string): boolean {
  if (!resolvedSrc || !resolvedSrc.startsWith("http")) return true;
  const host = getHostname(resolvedSrc);
  return host !== null && OPTIMIZABLE_HOSTS.includes(host);
}
