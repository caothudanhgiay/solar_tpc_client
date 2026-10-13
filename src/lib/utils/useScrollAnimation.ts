import { useEffect, useRef, useState } from "react";

/**
 * Hook thay thế Framer Motion whileInView.
 * Khi element scroll vào viewport → thêm class "is-visible".
 * Chỉ trigger 1 lần (once).
 *
 * @param threshold - Phần trăm element cần hiện (0-1), mặc định 0.15
 * @returns ref để gắn vào element cần animate
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.15
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Tôn trọng cài đặt Reduce Motion của hệ điều hành/trình duyệt — hiện ngay,
    // không chờ cuộn (tránh nội dung kẹt ở opacity:0 nếu animation bị tắt).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    // rootMargin dương (thay vì âm) để vùng trigger rộng hơn viewport thực —
    // hiệu ứng kích hoạt sớm hơn, giảm rủi ro bị bỏ lỡ khi cuộn nhanh/tự động.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px 150px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/**
 * Hook cho nhiều elements cùng lúc — dùng cho list items có stagger delay.
 * Trả về ref cho container, và trạng thái visible cho container.
 * Các children item dùng CSS animation-delay để stagger.
 */
export function useScrollAnimationGroup<T extends HTMLElement = HTMLDivElement>(
  threshold: number = 0.1
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px 150px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
