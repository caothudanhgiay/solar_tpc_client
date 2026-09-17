import { API_URL } from "./constants";

function getHostname(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// Các host đã được whitelist trong `images.remotePatterns` của next.config.ts.
// Phải giữ đồng bộ với danh sách đó để next/image không bị lỗi "hostname not configured".
const OPTIMIZABLE_HOSTS = ["images.unsplash.com"];
const apiHost = getHostname(API_URL);
if (apiHost) OPTIMIZABLE_HOSTS.push(apiHost);

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
