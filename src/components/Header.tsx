import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { currentCustomer } from '../data/mockConversations';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCustomer?: boolean;
  rightElement?: React.ReactNode;
  dark?: boolean; // 深色头部（品牌橙色背景）
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showCustomer = false,
  rightElement,
  dark = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChat = location.pathname === '/' || location.pathname === '/chat';

  return (
    <div className="sticky top-0 z-50">
      {/* 主导航栏 */}
      <div
        className={`flex items-center justify-between px-4 h-14 ${
          dark ? 'header-brand' : 'bg-white border-b border-orange-100'
        }`}
      >
        {/* 左侧：返回或 Logo */}
        <div className="w-10 flex items-center">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 rounded-full active:opacity-60 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke={dark ? 'white' : '#1A1A2E'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              {/* 品牌 Logo */}
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center shadow-sm">
                <span className="text-brand-500 text-xs font-black leading-none">AI</span>
              </div>
            </div>
          )}
        </div>

        {/* 中间：标题 */}
        <div className="flex-1 text-center">
          {title ? (
            <h1
              className={`text-base font-semibold ${
                dark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {title}
            </h1>
          ) : isChat ? (
            <div>
              <p className={`text-sm font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
                万能客
              </p>
              <p
                className={`text-[11px] ${
                  dark ? 'text-white/70' : 'text-brand-400'
                }`}
              >
                AI 营销助手 · 已就绪
              </p>
            </div>
          ) : null}
        </div>

        {/* 右侧 */}
        <div className="w-10 flex items-center justify-end">
          {rightElement ?? (
            isChat && (
              <button className="relative p-1 rounded-full active:opacity-60">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                    stroke={dark ? 'white' : '#666'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.73 21a2 2 0 0 1-3.46 0"
                    stroke={dark ? 'white' : '#666'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
              </button>
            )
          )}
        </div>
      </div>

      {/* 客户上下文条（仅聊天页显示） */}
      {showCustomer && (
        <div className="px-4 py-2.5 flex items-center gap-3 bg-gradient-to-r from-brand-50 to-white border-b border-orange-100">
          {/* 温度指示圈 */}
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">{currentCustomer.avatar}</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-[7px] font-bold">热</span>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-semibold text-gray-900">{currentCustomer.name}</span>
              <span className="text-[10px] text-white bg-brand-500 px-1.5 py-0.5 rounded-full">
                {currentCustomer.temperature}
              </span>
              <span className="text-[10px] text-brand-600 bg-brand-50 border border-brand-200 px-1.5 py-0.5 rounded-full">
                {currentCustomer.grid}
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {currentCustomer.age}岁 · {currentCustomer.occupation} · 年收入 {currentCustomer.annualIncome}万
            </p>
          </div>

          <button
            onClick={() => navigate('/customer')}
            className="text-xs text-brand-500 font-medium flex-shrink-0 active:opacity-70 flex items-center gap-0.5"
          >
            档案
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
