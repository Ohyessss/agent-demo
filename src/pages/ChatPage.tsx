import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ChatMessage, { TypingIndicator } from '../components/ChatMessage';
import {
  conversationSteps,
  quickRepliesPerStep,
  ChatMessage as ChatMessageType,
} from '../data/mockConversations';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    ...conversationSteps[0],
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuickReply = async (reply: string) => {
    if (isTyping) return;
    const nextStep = currentStep + 1;
    if (nextStep >= conversationSteps.length) return;

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      type: 'text',
      content: reply,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep(nextStep);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1400));
    setIsTyping(false);

    const aiMessages = conversationSteps[nextStep].filter((m) => m.role === 'ai');
    for (const msg of aiMessages) {
      await new Promise((r) => setTimeout(r, 250));
      setMessages((prev) => [...prev, msg]);
    }
  };

  const currentQuickReplies = quickRepliesPerStep[currentStep] ?? [];
  const canContinue = currentStep < conversationSteps.length - 1;

  return (
    <div className="flex flex-col h-screen bg-surface">
      <Header showCustomer />

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto pb-56 pt-3">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* 快捷回复 + 输入栏 */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-3 pb-2 space-y-2">
        {canContinue && !isTyping && (
          <div className="flex flex-col gap-2 items-end">
            {currentQuickReplies.slice(0, 3).map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="bg-white text-brand-600 text-xs px-3.5 py-2 rounded-full border border-brand-200 shadow-sm active:bg-brand-50 transition-colors text-right max-w-[260px]"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* 输入栏 */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm flex items-center gap-2 px-3 py-2.5">
          {/* 语音按钮 */}
          <button className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 active:bg-brand-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="12" rx="3" fill="#FF6010"/>
              <path d="M5 10a7 7 0 0 0 14 0" stroke="#FF6010" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 19v3" stroke="#FF6010" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <input
            type="text"
            placeholder="语音或输入消息..."
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            readOnly
          />

          <button className="w-8 h-8 rounded-xl btn-brand flex items-center justify-center active:opacity-80 flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ChatPage;
