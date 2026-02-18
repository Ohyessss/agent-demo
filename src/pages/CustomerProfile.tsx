import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { currentCustomer } from '../data/mockConversations';
import { mockProducts } from '../data/mockProducts';

const visitHistory = [
  {
    date: '今天 15:43',
    action: '✅ 成功出单：平安添盈·臻享家医（年交10万）',
    type: 'deal',
    icon: '🎉',
  },
  {
    date: '今天 14:00',
    action: 'AI 生成专属方案，完成本次拜访',
    type: 'visit',
    icon: '🏠',
  },
  {
    date: '上周三 10:30',
    action: '电话沟通：确认客户对年金险的兴趣，约定本次拜访',
    type: 'call',
    icon: '📞',
  },
  {
    date: '2026-02-03 14:00',
    action: '首次拜访：介绍平安品牌，摸排基本需求',
    type: 'visit',
    icon: '🤝',
  },
  {
    date: '2026-01-20 09:00',
    action: '转介绍入客：由老客户陈总推荐',
    type: 'refer',
    icon: '👥',
  },
];

const CustomerProfile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'gap' | 'history'>('profile');

  return (
    <div className="flex flex-col h-screen bg-surface">
      <Header title="客户档案" showBack />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* 客户主卡 */}
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden">
          <div className="header-brand p-5 relative">
            {/* 装饰 */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full" />

            <div className="relative flex items-start gap-4">
              {/* 头像 */}
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl font-bold">{currentCustomer.avatar}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-white text-lg font-bold">{currentCustomer.name}</h2>
                  <span className="text-[10px] bg-red-400 text-white px-1.5 py-0.5 rounded-full font-medium">
                    {currentCustomer.temperature}
                  </span>
                  <span className="text-[10px] bg-white/25 text-white px-1.5 py-0.5 rounded-full">
                    {currentCustomer.grid}
                  </span>
                </div>
                <p className="text-white/75 text-xs mt-0.5">
                  {currentCustomer.age}岁 · {currentCustomer.occupation}
                </p>
                <p className="text-white/75 text-xs">{currentCustomer.phone}</p>

                <div className="flex gap-5 mt-3">
                  <div>
                    <p className="text-white/60 text-[10px]">跟进次数</p>
                    <p className="text-white font-bold">{currentCustomer.followUpCount}次</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-[10px]">年收入</p>
                    <p className="text-white font-bold">{currentCustomer.annualIncome}万</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-[10px]">最近联系</p>
                    <p className="text-white font-bold text-xs">{currentCustomer.lastContact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 客群标签条 */}
          <div className="bg-white px-4 py-2.5 flex items-center gap-2 border-b border-orange-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-brand-500">
              <circle cx="12" cy="12" r="3" fill="#FF6010"/>
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#FF6010" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-xs text-gray-600">
              AI 客群标签：<span className="text-brand-600 font-semibold">{currentCustomer.group}</span>
              <span className="text-gray-400 mx-1">·</span>
              {currentCustomer.family}
            </p>
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="mx-4 mt-3 grid grid-cols-4 gap-2">
          {[
            { icon: '💬', label: '发短信' },
            { icon: '📞', label: '拨电话' },
            { icon: '📅', label: '预约拜访' },
            { icon: '📤', label: '发素材' },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="bg-white rounded-xl py-3 flex flex-col items-center gap-1 border border-orange-100 active:bg-brand-50 card-shadow"
            >
              <span className="text-xl">{icon}</span>
              <span className="text-[10px] text-gray-600">{label}</span>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="mx-4 mt-4">
          <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
            {(['profile', 'gap', 'history'] as const).map((tab) => {
              const labels = { profile: '需求画像', gap: '保障缺口', history: '跟进记录' };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-xs py-2 rounded-lg transition-all font-medium ${
                    activeTab === tab
                      ? 'bg-white text-brand-600 shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {/* 需求画像 */}
          {activeTab === 'profile' && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-4 border border-orange-100">
                {[
                  { label: '核心需求', value: currentCustomer.coreNeeds.join(' · '), icon: '🎯' },
                  { label: '现有保障', value: currentCustomer.existingCoverage, icon: '🛡️' },
                  { label: '家庭情况', value: `${currentCustomer.family}，${currentCustomer.childAge}`, icon: '👨‍👩‍👧' },
                  { label: '资产状况', value: currentCustomer.assets.join('、'), icon: '🏠' },
                ].map(({ label, value, icon }, i, arr) => (
                  <div
                    key={label}
                    className={`flex items-start gap-3 py-3 ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}
                  >
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div>
                      <p className="text-[10px] text-gray-400">{label}</p>
                      <p className="text-sm text-gray-800 mt-0.5 leading-snug">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 备注 */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                <p className="text-xs font-semibold text-amber-800 mb-1.5">📌 销售备注</p>
                <p className="text-xs text-amber-700 leading-relaxed">{currentCustomer.notes}</p>
              </div>
            </div>
          )}

          {/* 保障缺口 */}
          {activeTab === 'gap' && (
            <div className="space-y-3">
              {currentCustomer.riskGaps.map((gap) => {
                const isHigh = gap.level === 'high';
                return (
                  <div
                    key={gap.type}
                    className={`bg-white rounded-2xl p-4 border ${
                      isHigh ? 'border-red-200' : 'border-amber-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                          isHigh ? 'bg-red-500' : 'bg-amber-400'
                        }`} />
                        <p className="text-sm font-semibold text-gray-900">{gap.type}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isHigh ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {isHigh ? '高优先级' : '中优先级'}
                      </span>
                    </div>
                    <p className="text-2xl font-bold amount-highlight">{gap.amount}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {gap.type === '财富缺口' && '建议通过年金险/增额终身寿补充'}
                      {gap.type === '养老缺口' && '建议通过年金险锁定长期养老现金流'}
                      {gap.type === '重疾保障' && '建议补充个人重疾险对冲大病风险'}
                    </p>
                  </div>
                );
              })}

              {/* 推荐产品 */}
              <div className="bg-brand-50 rounded-2xl p-4 border border-brand-100">
                <p className="text-xs font-semibold text-brand-700 mb-3">
                  ✦ AI 推荐填补缺口的方案
                </p>
                {mockProducts.slice(0, 2).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="w-full flex items-center gap-3 bg-white rounded-xl p-3 mb-2 last:mb-0 active:bg-brand-50 border border-brand-100"
                  >
                    <img src={p.coverImage} alt={p.shortName} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 text-left">
                      <p className="text-xs font-semibold text-gray-900">{p.shortName}</p>
                      <p className="text-[10px] text-gray-400">{p.category} · 匹配{p.matchScore}分</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-300">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 跟进记录 */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-2xl p-4 border border-orange-100">
              <div className="relative">
                <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-gray-100" />
                <div className="space-y-5">
                  {visitHistory.map((record, i) => (
                    <div key={i} className="flex gap-4 relative">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        record.type === 'deal' ? 'bg-green-100' :
                        record.type === 'visit' ? 'bg-brand-100' :
                        record.type === 'call' ? 'bg-amber-100' : 'bg-blue-100'
                      }`}>
                        <span className="text-sm">{record.icon}</span>
                      </div>
                      <div className="flex-1 pb-1">
                        <p className="text-[10px] text-gray-400">{record.date}</p>
                        <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">{record.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CustomerProfile;
