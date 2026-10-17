import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface AIChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({ isOpen, onToggle, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Chào nàng! Mình là Trợ lý AI ALPS Thụy Sĩ. Nàng có thể hỏi về cách chọn combo, thứ tự routine chăm sóc da hoặc bất kỳ thắc mắc nào nhé.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Các combo giá bao nhiêu?',
    'Da khô nên chăm sóc thế nào?',
    'Serum dùng trước hay sau kem dưỡng?',
    'Da nhạy cảm treatment dùng được không?',
    'Chính sách hoàn tiền 30 ngày thế nào?',
  ];

  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    setInputVal('');
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages((prev) => [
          ...prev,
          {
            id: `m-${Date.now()}`,
            role: 'model',
            text: data.text,
          },
        ]);
      } else {
        throw new Error(data.error || 'Chưa nhận được phản hồi từ chuyên gia.');
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          text: 'Rất tiếc, đường truyền đang gián đoạn một chút. Nàng có thể gọi ngay Hotline 0772770134 hoặc nhấn Thử lại nhé!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRestart = () => {
    setMessages([
      {
        id: 'restart',
        role: 'model',
        text: 'Cuộc trò chuyện đã được làm mới. Nàng muốn mình tư vấn tình trạng da hay combo ưu đãi nào?',
      },
    ]);
  };

  return (
    <div id="derma-chat-widget" className="fixed bottom-6 right-6 z-40 font-body">
      {/* Floating Greeting Bubble */}
      {showBubble && !isOpen && (
        <div
          id="derma-chat-bubble"
          onClick={onToggle}
          className="absolute bottom-16 right-0 mb-2 w-72 p-3 bg-white rounded-2xl border border-[#725b38]/30 shadow-2xl text-xs text-[#16120f] cursor-pointer transform hover:scale-105 transition-all group"
        >
          <div className="flex items-start gap-2.5">
            <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-xs">
              🇨🇭
            </span>
            <div className="space-y-1">
              <span className="block font-bold text-[11px] text-[#725b38]">
                Dược Sĩ ALPS Đang Trực Tuyến
              </span>
              <p className="text-[11px] text-[#4d4540] leading-snug">
                Chào nàng! Mình có thể giúp nàng chọn combo da liễu phù hợp nhất nhé?
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-[#4d4540] text-white rounded-full flex items-center justify-center text-[10px] hover:bg-black"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          id="derma-chat-toggle-btn"
          type="button"
          onClick={onToggle}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#16120f] via-[#725b38] to-[#98602d] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-2 border-white/50 group"
          aria-label="Mở khung chat trợ lý da liễu"
        >
          <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">
            smart_toy
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
          </span>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div
          id="derma-chat-window"
          className="w-[92vw] sm:w-[390px] h-[560px] max-h-[85vh] bg-[#fffdf8] rounded-3xl shadow-2xl border border-[#725b38]/40 flex flex-col overflow-hidden relative"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4b2b18] via-[#704923] to-[#98602d] text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-sm font-bold">
                  🇨🇭
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-[#4b2b18] rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight leading-none">
                  ALPS • Trợ lý AI
                </h3>
                <span className="text-[10px] text-amber-200/90 font-medium">
                  Chuyên viên tư vấn Thụy Sĩ · Zurich Lab
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleRestart}
                title="Làm mới cuộc trò chuyện"
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-lg">restart_alt</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                title="Đóng chat"
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            id="derma-chat-messages"
            className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fffdf8] text-xs"
          >
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start items-start gap-2'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-amber-300">
                      🏔️
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      isUser
                        ? 'bg-[#704923] text-white rounded-tr-xs shadow-xs'
                        : 'bg-[#f3ece1] text-[#35291e] rounded-tl-xs border border-[#cdbb9e]/30'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[10px] shrink-0 border border-amber-300">
                  🏔️
                </div>
                <div className="bg-[#f3ece1] text-[#704923] p-3 rounded-2xl rounded-tl-xs border border-[#cdbb9e]/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#704923] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#704923] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#704923] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] font-medium ml-1">ALPS đang suy nghĩ...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply chips */}
          <div className="p-2.5 bg-[#fbf9f6] border-t border-[#d0c4be]/30 overflow-x-auto no-scrollbar flex gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-[#fedeb2]/40 border border-[#cdbb9e] text-[#664525] rounded-full text-[11px] font-medium transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input & Send Form */}
          <div className="p-3 bg-white border-t border-[#d0c4be]/40 space-y-1">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về sản phẩm hoặc cách chăm da..."
                disabled={loading}
                className="flex-1 px-3.5 py-2.5 bg-[#f5f3f0] rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#725b38] text-[#16120f]"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={loading || !inputVal.trim()}
                className="px-4 py-2.5 bg-[#704923] hover:bg-[#4b2b18] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
              >
                Gửi
              </button>
            </div>

            <div className="flex justify-between items-center text-[9px] text-[#70675d] px-1 pt-0.5">
              <span>Trợ lý AI • Powered by Google Gemini</span>
              <span>Hotline Dược sĩ: 0772770134</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
