import { Toast } from "@/components/ui/Toast";

export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  public static handle(error: any) {
    if (typeof window !== 'undefined') {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        Toast.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại server.");
      } else {
        Toast.error(error?.message || "Đã xảy ra lỗi hệ thống.");
      }
    }
  }
}
