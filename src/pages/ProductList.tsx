import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/mockProducts';
import { currentCustomer } from '../data/mockConversations';

const categories = ['全部', '年金险', '重疾险', '寿险', '医疗险'];
const sortOptions = ['AI推荐', 'FYC高', '保费低'];

const ProductList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [activeSort, setActiveSort] = useState('AI推荐');

  const filtered = mockProducts
    .filter((p) => activeCategory === '全部' || p.category === activeCategory)
    .sort((a, b) => {
      if (activeSort === 'AI推荐') return b.matchScore - a.matchScore;
      if (activeSort === 'FYC高') return b.fyc - a.fyc;
      if (activeSort === '保费低') return a.annualPremium - b.annualPremium;
      return 0;
    });

  return (
    <div className="flex flex-col h-screen bg-surface">
      <Header title="推荐产品" />

      {/* AI 匹配横幅 */}
      <div className="mx-4 mt-3 mb-3 rounded-2xl overflow-hidden">
        <div className="header-brand p-4 relative">
          {/* 装饰圈 */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -bottom-4 right-16 w-14 h-14 bg-white/10 rounded-full" />

          <div className="relative flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="white"/>
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm">
                AI 为 {currentCustomer.name} 匹配了 {mockProducts.length} 套专属方案
              </p>
              <p className="text-white/80 text-xs mt-0.5">
                基于：保财富·保养老·子女教育金 · 预算可达30万总保费
              </p>
              <div className="flex gap-2 mt-2">
                {currentCustomer.coreNeeds.map((need) => (
                  <span key={need} className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {need}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 分类 + 排序 */}
      <div className="px-4 mb-2 space-y-2">
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activeCategory === c
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <path d="M3 6h18M6 12h12M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-xs text-gray-400 mr-1">排序：</span>
          {sortOptions.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSort(s)}
              className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                activeSort === s
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-gray-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 产品卡片 */}
      <div className="flex-1 overflow-y-auto px-4 pb-28">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm">暂无此类别产品</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ProductList;
