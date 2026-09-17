export const DEFAULT_BASE_URL = "http://localhost:8080";

// URL công khai — dùng cho mọi request xuất phát từ trình duyệt (client-side) và cho việc
// dựng URL ảnh hiển thị (<img src>) vì trình duyệt luôn cần domain công khai để tải được.
// Đọc từ env NEXT_PUBLIC_API_URL (đã truyền sẵn qua docker-compose.yml/deploy.yml),
// fallback theo NODE_ENV nếu biến env chưa được set (vd chạy `npm run build` cục bộ).
export const API_URL = process.env.NEXT_PUBLIC_API_URL
  || (process.env.NODE_ENV === 'production' ? 'https://tpcsolar.vn' : DEFAULT_BASE_URL);

// URL nội bộ — CHỈ dùng cho request gọi API xuất phát từ server (SSR/SSG/ISR trong getStaticProps/
// getServerSideProps), gọi thẳng container backend qua network Docker nội bộ thay vì vòng qua domain
// công khai + Cloudflare (nhanh và ổn định hơn nhiều, đặc biệt lúc site đang có traffic cao).
// KHÔNG dùng biến này để dựng URL ảnh hay bất kỳ URL nào sẽ gửi thẳng cho trình duyệt — trình duyệt
// không truy cập được network nội bộ Docker. Nếu INTERNAL_API_URL chưa được set (dev local, không
// chạy trong Docker) sẽ tự fallback về API_URL.
export const INTERNAL_API_URL = process.env.INTERNAL_API_URL || API_URL;

// Timeout (ms) cho các cuộc gọi API server-side (getStaticProps/getServerSideProps) dùng
// AbortController — quá thời gian này sẽ hủy request và fallback về dữ liệu rỗng thay vì
// treo cả lượt render/revalidate ISR.
export const API_SSR_TIMEOUT_MS = 8000;

export const API_BASE = '/api';

// Các hằng số về API Menus
export const API_MENUS = `${API_BASE}/menus`;

// Các hằng số về API Projects
export const API_PROJECTS = `${API_BASE}/projects`;

// API tổng hợp dữ liệu trang chủ (menu + project + service...)
export const API_HOME = `${API_BASE}/home`;

// API công khai: danh sách dịch vụ đang hoạt động
export const API_SERVICES = `${API_BASE}/services`;

// API danh mục chung
export const API_ITEM_GROUPS = `${API_BASE}/v1/items/groups`;

// Chatbot AI
export const API_CHATBOT_ASK = `${API_BASE}/chatbot/ask`;
export const API_CHATBOT_ASK_STREAM = `${API_BASE}/chatbot/ask/stream`;

// Zalo deep link
export const ZALO_PHONE = '0397937019';
export const ZALO_CHAT_URL = `https://zalo.me/${ZALO_PHONE}`;

// Các hằng số HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

// Các hằng số chung của ứng dụng
export const APP_CONSTANTS = {
  DEFAULT_CREATOR: 'admin',
  DEFAULT_PAGE_SIZE: 10,
};
