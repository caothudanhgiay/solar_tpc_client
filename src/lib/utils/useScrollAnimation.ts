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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
