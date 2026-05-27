export const DEFAULT_BASE_URL = "http://localhost:8080";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_BASE_URL;

export const API_BASE = '/api';

// Các hằng số về API Menus
export const API_MENUS = `${API_BASE}/menus`;

// Chatbot AI
export const API_CHATBOT_ASK = `${API_BASE}/chatbot/ask`;

// Zalo deep link
export const ZALO_PHONE = '0035832304';
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
