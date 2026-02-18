import React from 'react';
import { ChatMessage as ChatMessageType, currentCustomer } from '../data/mockConversations';
import { mockProducts } from '../data/mockProducts';
import ProductCard from './ProductCard';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.role === 'ai';

  // 产品卡片组
  if (message.type === 'product-cards' && message.productIds) {
    const products = message.productIds
      .map((id) => mockProducts.find((p) => p.id === id))
      .filter(Boolean) as typeof mockProducts;

    return (
      <div className="message-enter mb-4 px-4">
        <div className="flex items-center gap-2 mb-2 ml-10">
          <p className="text-xs text-gray-400">AI 为 {currentCustomer.name} 匹配了 {products.length} 套方案</p>
        </div>
        <div className="flex gap-2">
          <AIAvatar />
          <div className="flex-1 space-y-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 拜访总结卡片
  if (message.type === 'visit-summary') {
    return (
      <div className="message-enter mb-3 px-4 flex gap-2">
        <AIAvatar />
        <div className="flex-1">
          <div className="bg-white rounded-2xl rounded-tl-sm border border-orange-100 overflow-hidden card-shadow">
            {/* 标题栏 */}
            <div className="header-brand px-4 py-3">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="text-white font-semibold text-sm">拜访总结 · 已成功出单 🎉</p>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {/* 成交产品 */}
              <div className="bg-brand-50 rounded-xl p-3">
                <p className="text-[10px] text-brand-600 font-medium mb-1">成交产品</p>
                <p className="text-sm font-bold text-gray-900">添盈·臻享家医</p>
                <p className="text-xs text-gray-500">年交10万 · 3年交 · 总保费30万</p>
              </div>

              {/* 客户关键信息 */}
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">客户关键信息（本次录入）</p>
                <div className="space-y-1.5">
                  {[
                    ['居住地', '深圳·香蜜湖'],
                    ['年收入', '约120万，家庭经济稳健'],
                    ['资产', '房产（香蜜湖）、宝马X5、特斯拉Y'],
                    ['关注点', '子女教育金 · 养老规划'],
                    ['生日节点', '9月12日（建议关怀）'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <span className="text-[10px] text-gray-400 w-14 flex-shrink-0 mt-0.5">{k}</span>
                      <span className="text-xs text-gray-700 flex-1">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 后续建议 */}
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                <p className="text-[10px] text-amber-700 font-medium mb-1">📌 后续跟进建议</p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  跟进保单进度，结合9月12日生日节点开展客户关怀，增强客户粘性，适时切入太太的保险需求。
                </p>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-gray-300 mt-1 ml-1">{message.timestamp}</p>
        </div>
      </div>
    );
  }

  // 普通文本气泡
  return (
    <div className={`message-enter mb-3 px-4 flex gap-2 ${isAI ? '' : 'flex-row-reverse'}`}>
      {isAI ? <AIAvatar /> : <UserAvatar />}

      <div className={`max-w-[78%] ${isAI ? '' : 'items-end flex flex-col'}`}>
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
            isAI
              ? 'bubble-ai text-white rounded-tl-sm shadow-sm shadow-blue-200/40'
              : 'bg-white text-gray-800 rounded-tr-sm shadow-sm border border-orange-100'
          }`}
        >
          {isAI ? <MarkdownText text={message.content ?? ''} /> : message.content}
        </div>
        <p className={`text-[10px] text-gray-300 mt-1 ${isAI ? 'ml-1' : 'mr-1'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

// 简易 Markdown 粗体渲染
const MarkdownText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const AIAvatar: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ai-400 to-ai-600 flex items-center justify-center flex-shrink-0 shadow-sm">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill="white"/>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  </div>
);

const UserAvatar: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#FF6010" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="7" r="4" stroke="#FF6010" strokeWidth="2"/>
    </svg>
  </div>
);

export const TypingIndicator: React.FC = () => (
  <div className="message-enter mb-3 px-4 flex gap-2">
    <AIAvatar />
    <div className="bubble-ai px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm shadow-blue-200/40 flex gap-1.5 items-center">
      <div className="w-1.5 h-1.5 bg-white/80 rounded-full typing-dot" />
      <div className="w-1.5 h-1.5 bg-white/80 rounded-full typing-dot" />
      <div className="w-1.5 h-1.5 bg-white/80 rounded-full typing-dot" />
    </div>
  </div>
);

export default ChatMessage;
