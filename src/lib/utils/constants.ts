export const DEFAULT_BASE_URL = "http://localhost:8080";
export const API_URL = process.env.NODE_ENV === 'production' ? 'https://tpcsolar.vn' : DEFAULT_BASE_URL;

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
