import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/mockProducts';
import BottomNav from '../components/BottomNav';

type Tab = 'overview' | 'benefit' | 'service';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id ?? '');
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-400">
        <p className="text-4xl mb-3">📋</p>
        <p>产品信息不存在</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-brand-500 text-sm">返回</button>
      </div>
    );
  }

  const scoreGradient =
    product.matchScore >= 90
      ? 'from-green-400 to-emerald-500'
      : product.matchScore >= 80
      ? 'from-brand-400 to-brand-600'
      : 'from-amber-400 to-orange-500';

  return (
    <div className="flex flex-col h-screen bg-surface">
      {/* 封面 */}
      <div className="relative h-56 flex-shrink-0">
        <img
          src={product.coverImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center active:bg-black/50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/70 text-xs mb-1">{product.category} · {product.company}</p>
              <h1 className="text-white text-xl font-bold leading-tight">{product.name}</h1>
            </div>
            <div className={`bg-gradient-to-br ${scoreGradient} text-white text-center px-3 py-1.5 rounded-xl flex-shrink-0 ml-3`}>
              <p className="text-xl font-bold leading-none">{product.matchScore}</p>
              <p className="text-[10px] opacity-80 mt-0.5">AI匹配分</p>
            </div>
          </div>
        </div>
      </div>

      {/* 内容滚动区 */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* 核心价格卡 */}
        <div className="bg-white mx-4 -mt-4 relative z-10 rounded-2xl p-4 shadow-sm border border-orange-100 card-shadow">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold amount-highlight">
                  {(product.annualPremium / 10000).toFixed(0)}万
                </span>
                <span className="text-sm text-gray-400">元/年</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{product.paymentYears} · 保障{product.coveragePeriod}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">预计代理人收益</p>
              <p className="text-base font-bold text-brand-500">¥{product.totalIncome.toLocaleString()}</p>
              <p className="text-[10px] text-gray-400">
                FYC ¥{product.fyc.toLocaleString()} + 津贴 ¥{product.salesBonus.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
              product.badge === '优先推荐' ? 'bg-brand-500 text-white' : 'bg-brand-100 text-brand-700'
            }`}>
              {product.badge}
            </span>
            {product.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* AI 推荐理由 */}
        <div className="mx-4 mt-3 bg-gradient-to-r from-brand-50 to-orange-50/30 rounded-2xl p-4 border border-brand-100">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill="white"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-brand-700">AI 推荐理由</p>
          </div>
          <div className="space-y-1.5">
            {product.matchReasons.map((r, i) => (
              <p key={i} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-brand-500 font-bold flex-shrink-0 mt-0.5">✦</span>
                {r}
              </p>
            ))}
          </div>
        </div>

        {/* 关键数据 */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 border border-orange-100">
          <div className="grid grid-cols-2 gap-3">
            {product.keyBenefits.map((b) => (
              <div key={b.title} className="bg-surface rounded-xl p-3">
                <p className="text-[10px] text-gray-400">{b.title}</p>
                <p className="text-base font-bold text-gray-900 mt-0.5">{b.value}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-4 mt-4">
          <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
            {(['overview', 'benefit', 'service'] as Tab[]).map((tab) => {
              const labels: Record<Tab, string> = {
                overview: '产品概况',
                benefit: '核心保障',
                service: '附加权益',
              };
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

          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl p-4 border border-orange-100">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{product.description}</p>
              <p className="text-xs font-semibold text-gray-700 mb-2">适合人群</p>
              <div className="flex flex-wrap gap-2">
                {product.suitableFor.map((s) => (
                  <span key={s} className="text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full border border-brand-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'benefit' && (
            <div className="bg-white rounded-2xl p-4 border border-orange-100 space-y-3">
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-600 text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{h}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'service' && (
            <div className="bg-white rounded-2xl p-4 border border-orange-100">
              <p className="text-xs text-gray-400 mb-3">随产品附赠的专属服务权益</p>
              <div className="space-y-2.5">
                {product.services.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                    <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-base">{serviceEmoji(s)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-4" />
      </div>

      {/* 底部操作 */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-2xl border border-brand-200 text-brand-600 text-sm font-medium active:bg-brand-50"
          >
            返回方案
          </button>
          <button className="flex-[2] py-3 rounded-2xl btn-brand text-white text-sm font-semibold shadow-md shadow-brand-400/40 active:opacity-90">
            推荐给李明
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

function serviceEmoji(name: string): string {
  if (name.includes('医院') || name.includes('绿通')) return '🏥';
  if (name.includes('健康') || name.includes('顾问')) return '👨‍⚕️';
  if (name.includes('问诊') || name.includes('医生')) return '💊';
  if (name.includes('体检')) return '🩺';
  if (name.includes('理赔')) return '📋';
  if (name.includes('海外')) return '✈️';
  if (name.includes('贷款') || name.includes('资金')) return '💰';
  return '✨';
}

export default ProductDetail;
