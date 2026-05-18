"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

type Listener = (toast: ToastMessage) => void;
let listeners: Listener[] = [];
let idCounter = 0;

const emitToast = (message: string, type: ToastType) => {
  const newToast = { id: ++idCounter, message, type };
  listeners.forEach(listener => listener(newToast));
};

/**
 * Lớp tiện ích Toast dùng để gọi sự kiện hiển thị thông báo.
 * Ví dụ: Toast.error("Có lỗi xảy ra!")
 */
export class Toast {
  public static error(message: string) { emitToast(message, 'error'); }
  public static success(message: string) { emitToast(message, 'success'); }
  public static info(message: string) { emitToast(message, 'info'); }
  
  public static subscribe(listener: Listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
}

/**
 * React Component Toaster dùng để vẽ giao diện của các Toast lên màn hình.
 * Đặt component này vào file layout gốc của dự án.
 */
export default function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const unsubscribe = Toast.subscribe((toastMsg) => {
      setToasts((prev) => [...prev, toastMsg]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toastMsg.id));
      }, 4000);
    });
    return unsubscribe;
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white min-w-[300px] border border-white/10 ${
              t.type === 'error' ? 'bg-red-600 shadow-red-600/20' :
              t.type === 'success' ? 'bg-green-600 shadow-green-600/20' : 'bg-blue-600 shadow-blue-600/20'
            }`}
          >
            <div className="flex-shrink-0">
              {t.type === 'error' && <AlertCircle className="w-5 h-5" />}
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {t.type === 'info' && <Info className="w-5 h-5" />}
            </div>
            
            <span className="font-medium text-sm flex-1">{t.message}</span>
            
            <button 
              onClick={() => removeToast(t.id)} 
              className="flex-shrink-0 hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X className="w-4 h-4 opacity-80" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
