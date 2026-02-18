import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isActive = (p: string) => {
    if (p === '/chat') return path === '/' || path === '/chat';
    return path === p;
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
      <div className="bg-white border-t border-orange-100 shadow-[0_-4px_20px_rgba(255,96,16,0.08)]">
        <div className="flex items-end justify-around px-2 pb-safe">

          {/* 首页 */}
          <NavButton
            label="首页"
            active={isActive('/chat')}
            onClick={() => navigate('/chat')}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={isActive('/chat') ? 'currentColor' : 'none'}
                  fillOpacity={isActive('/chat') ? 0.15 : 0}
                />
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            }
          />

          {/* 产品 */}
          <NavButton
            label="产品"
            active={isActive('/products')}
            onClick={() => navigate('/products')}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={isActive('/products') ? 'currentColor' : 'none'}
                  fillOpacity={isActive('/products') ? 0.12 : 0}
                />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            }
          />

          {/* 中央麦克风占位 */}
          <div className="w-16 flex-shrink-0" />

          {/* 客户 */}
          <NavButton
            label="客户"
            active={isActive('/customer')}
            onClick={() => navigate('/customer')}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill={isActive('/customer') ? 'currentColor' : 'none'}
                  fillOpacity={isActive('/customer') ? 0.15 : 0}
                />
              </svg>
            }
          />

          {/* 业绩 */}
          <NavButton
            label="业绩"
            active={false}
            onClick={() => {}}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
        </div>
      </div>

      {/* 悬浮麦克风按钮（平安橙色） */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-6">
        <button className="relative w-14 h-14 rounded-full btn-brand shadow-lg shadow-brand-500/35 flex items-center justify-center active:scale-95 transition-transform">
          <div className="mic-pulse" />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="2" width="6" height="12" rx="3" fill="white"/>
            <path d="M5 10a7 7 0 0 0 14 0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 19v3M9 22h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-0.5 pt-3 pb-4 px-3 transition-colors ${
      active ? 'text-brand-500' : 'text-gray-400'
    }`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default BottomNav;
