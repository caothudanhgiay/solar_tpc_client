import { API_URL } from "@/lib/utils/constants";
import { ApiException, handleApiResponse } from "../exception/exception";
import { AppError } from "../exception/error";

const DEFAULT_BASE_URL = API_URL;

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = DEFAULT_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Hàm core để gọi API
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // Cấu hình headers mặc định
    const headers = new Headers(options.headers);

    // Tự động thêm Content-Type là application/json nếu có truyền body
    if (!headers.has('Content-Type') && options.body) {
      headers.set('Content-Type', 'application/json');
    }

    // Tự động thêm Accept-Language dựa trên ngôn ngữ hiện tại của client
    if (!headers.has('Accept-Language') && typeof window !== 'undefined') {
      let locale = 'vi';
      const pathParts = window.location.pathname.split('/');
      if (pathParts[1] === 'en') {
        locale = 'en';
      } else {
        const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
        if (match) {
          locale = match[1];
        } else {
          locale = document.documentElement.lang || 'vi';
        }
      }
      headers.set('Accept-Language', locale);
    }

    // Tương lai: bạn có thể cấu hình lấy token từ localStorage và gắn vào header ở đây
    // const token = localStorage.getItem('token');
    // if (token) headers.set('Authorization', `Bearer ${token}`);

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      // Chuyển giao việc xử lý response cho hàm chuẩn hóa handleApiResponse
      const result = await handleApiResponse(response);

      // Nếu không có lỗi (status thuộc nhóm 200-204), trả về data
      return result as T;

    } catch (error: any) {
      console.warn(`[API Call Failed] ${options.method || 'GET'} ${url}:`, error.message);

      if (error instanceof ApiException) {
        ApiException.handle(error);
      } else {
        AppError.handle(error);
      }

      throw error;
    }
  }

  /**
   * GET Request - Lấy dữ liệu
   */
  public get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST Request - Gửi dữ liệu JSON lên server để tạo mới
   */
  public post<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT Request - Gửi dữ liệu JSON lên server để cập nhật
   */
  public put<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE Request - Xóa dữ liệu
   */
  public delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Export ra một biến dùng chung (Singleton) để tiện tái sử dụng ở mọi nơi
export const apiClient = new ApiClient();
