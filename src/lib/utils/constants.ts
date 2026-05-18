export const DEFAULT_BASE_URL = "http://localhost:8080";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_BASE_URL;

export const API_BASE = '/api';

// Các hằng số về API Menus
export const API_MENUS = `${API_BASE}/menus`;


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
