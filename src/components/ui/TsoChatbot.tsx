import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "next-i18next/pages";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, ExternalLink } from "lucide-react";
import { apiClient } from "@/lib/utils/apiClient";
import { API_CHATBOT_ASK, ZALO_CHAT_URL } from "@/lib/utils/constants";
import Image from "next/image";

// Kiểu dữ liệu tin nhắn
interface TsoChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

// Response từ API
interface TsoChatbotApiResponse {
  statusCode: number;
  message: string;
  data: {
    reply: string;
    sessionId: string;
  };
}

export default function TsoChatbot() {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<TsoChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll xuống tin nhắn mới nhất
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Hiển thị greeting khi mở lần đầu
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: TsoChatMessage = {
        id: "greeting",
        role: "bot",
        text: t("chatbot.greeting"),
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages.length, t]);

  // Gửi tin nhắn
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: TsoChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setShowQuickActions(false);

    try {
      const response = await apiClient.post<TsoChatbotApiResponse>(API_CHATBOT_ASK, {
        message: text.trim(),
        sessionId: sessionId,
      });

      if (response?.data) {
        setSessionId(response.data.sessionId);
        const botMsg: TsoChatMessage = {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: response.data.reply,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      const errorMsg: TsoChatMessage = {
        id: `error-${Date.now()}`,
        role: "bot",
        text: t("chatbot.errorRetry"),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick action click
  const handleQuickAction = (text: string) => {
    // Bỏ emoji ở đầu rồi gửi
    const cleanText = text.replace(/^[\p{Emoji}\s]+/u, "").trim();
    sendMessage(cleanText);
  };

  // Render markdown đơn giản (bold)
  const renderText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} className="font-semibold text-orange-400">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={j}>{part}</span>;
          })}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  const quickActions = [
    t("chatbot.quickQ1"),
    t("chatbot.quickQ2"),
    t("chatbot.quickQ3"),
    t("chatbot.quickQ4"),
  ];

  return (
    <>
      {/* Nút trigger chatbot */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-2xl flex items-center justify-center cursor-pointer group"
            aria-label="Open chatbot"
            id="chatbot-trigger"
          >
            <MessageCircle className="w-7 h-7" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-30" />
            {/* Tooltip */}
            <span className="absolute bottom-full right-0 mb-3 px-3 py-1.5 text-xs font-medium bg-slate-800 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              {t("chatbot.title")}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            id="chatbot-panel"
          >
            {/* Header */}
            <div className="bg-gradient-to-r px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <Image src="/icon.png" alt="TPC Bot" fill className="object-cover p-1" sizes="40px" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm leading-tight">{t("chatbot.title")}</h3>
                <p className="text-orange-100 text-xs">{t("chatbot.subtitle")}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close chatbot"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-slate-900 px-4 py-4 space-y-4 scroll-smooth" id="chatbot-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-blue-600" : "bg-gradient-to-br from-orange-500 to-amber-600"
                      }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  {/* Bubble */}
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-slate-800 text-gray-200 rounded-bl-sm border border-slate-700/50"
                      }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm border border-slate-700/50">
                    <div className="flex items-center gap-2 text-orange-400 text-xs">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{t("chatbot.typing")}</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {showQuickActions && messages.length <= 1 && (
              <div className="bg-slate-900 px-4 pb-2 flex flex-wrap gap-1.5 shrink-0 border-t border-slate-800">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action)}
                    className="mt-2 px-3 py-1.5 text-[11px] font-medium bg-slate-800 text-orange-300 rounded-full border border-slate-700 hover:bg-orange-500/20 hover:border-orange-500/50 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Zalo button + Input */}
            <div className="bg-slate-900 border-t border-slate-800 p-3 space-y-2 shrink-0">
              {/* Zalo deep link */}
              <a
                href={ZALO_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                id="chatbot-zalo-btn"
              >
                <Image src="/images/zalo-icon.png" alt="Zalo" width={18} height={18} className="rounded-sm" />
                {t("chatbot.zaloBtn")}
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              {/* Input */}
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                  placeholder={t("chatbot.placeholder")}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all disabled:opacity-50"
                  id="chatbot-input"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                  aria-label={t("chatbot.send")}
                  id="chatbot-send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Powered by */}
              <p className="text-center text-[10px] text-gray-600">{t("chatbot.poweredBy")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
