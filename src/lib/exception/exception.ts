import { Toast } from "@/components/ui/Toast";

export class ApiException extends Error {
  public statusCode: number;
  public data: any;
  public timestamp: Date;

  constructor(statusCode: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiException';
    this.statusCode = statusCode;
    this.data = data;
    this.timestamp = new Date();

    Object.setPrototypeOf(this, ApiException.prototype);
  }

  public static handle(error: ApiException) {
    if (typeof window !== 'undefined') {
      if (error.statusCode === 404) {
        window.location.href = `/error-pages?type=not-found`;
      } else if (error.statusCode >= 500 && error.statusCode <= 506) {
        let errorType = 'server-error';
        if (error.statusCode === 503) errorType = 'maintenance';
        window.location.href = `/error-pages?type=${errorType}`;
      } else {
        Toast.error(`Lỗi ${error.statusCode}: ${error.message}`);
      }
    }
  }
}

export const handleApiResponse = async (response: Response) => {
  const status = response.status;
  
  let responseData: any = null;
  let serverMessage = '';

  if (status !== 204) {
    try {
      const text = await response.text();
      if (text) {
        const parsed = JSON.parse(text);
        responseData = parsed.data !== undefined ? parsed.data : parsed;
        serverMessage = parsed.message || '';
      }
    } catch (e) {
      console.warn('Không thể parse body JSON từ API response', e);
    }
  }

  if (status >= 200 && status <= 204) {
    return {
      status,
      data: responseData,
      message: serverMessage || 'Thành công'
    };
  } 
  
  else if (status >= 300 && status <= 305) {
    throw new ApiException(status, serverMessage || `Tài nguyên đã được chuyển hướng (HTTP ${status})`, responseData);
  } 
  
  else if (status >= 400 && status <= 408) {
    let defaultMsg = 'Yêu cầu không hợp lệ';
    switch (status) {
      case 400: defaultMsg = 'Dữ liệu gửi lên không hợp lệ (Bad Request)'; break;
      case 401: defaultMsg = 'Chưa xác thực hoặc phiên đăng nhập hết hạn (Unauthorized)'; break;
      case 403: defaultMsg = 'Bạn không có quyền truy cập (Forbidden)'; break;
      case 404: defaultMsg = 'Không tìm thấy dữ liệu (Not Found)'; break;
      case 408: defaultMsg = 'Hết thời gian chờ yêu cầu (Request Timeout)'; break;
    }
    const finalMessage = serverMessage || defaultMsg;
    throw new ApiException(status, finalMessage, responseData);
  } 
  
  else if (status >= 500 && status <= 506) {
    let defaultMsg = 'Lỗi máy chủ nội bộ';
    switch (status) {
      case 500: defaultMsg = 'Lỗi hệ thống từ máy chủ (Internal Server Error)'; break;
      case 502: defaultMsg = 'Cổng kết nối không hợp lệ (Bad Gateway)'; break;
      case 503: defaultMsg = 'Dịch vụ tạm thời không hoạt động (Service Unavailable)'; break;
      case 504: defaultMsg = 'Hết thời gian chờ kết nối máy chủ (Gateway Timeout)'; break;
    }
    const finalMessage = serverMessage || defaultMsg;
    throw new ApiException(status, finalMessage, responseData);
  } 
  
  else {
    throw new ApiException(status, serverMessage || `Lỗi không xác định (HTTP ${status})`, responseData);
  }
};
