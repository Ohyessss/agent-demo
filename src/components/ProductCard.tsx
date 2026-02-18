import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InsuranceProduct } from '../data/mockProducts';

interface ProductCardProps {
  product: InsuranceProduct;
  compact?: boolean;
}

const badgeColor: Record<string, string> = {
  '优先推荐': 'bg-brand-500 text-white',
  '热销产品': 'bg-orange-400 text-white',
  '国民产品': 'bg-amber-500 text-white',
};

const scoreGradient = (score: number) => {
  if (score >= 90) return 'from-green-400 to-emerald-500';
  if (score >= 80) return 'from-brand-400 to-brand-600';
  return 'from-amber-400 to-orange-500';
};

const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const navigate = useNavigate();

  if (compact) {
    return (
      <button
        onClick={() => navigate(`/product/${product.id}`)}
        className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-orange-100 active:scale-[0.98] transition-transform card-shadow"
      >
        {/* 图片区 */}
        <div className="relative h-28 overflow-hidden">
          <img
            src={product.coverImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

          {/* 角标 */}
          <div className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor[product.badge] ?? 'bg-gray-600 text-white'}`}>
            {product.badge}
          </div>

          {/* 分类 */}
          <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {product.category} · {product.company}
          </div>
        </div>

        <div className="p-3">
          {/* 产品名 + 价格 */}
          <div className="flex items-start justify-between mb-1.5">
            <div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{product.shortName}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{product.paymentYears} · {product.coveragePeriod}保障</p>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-brand-500 font-bold text-sm">
                {(product.annualPremium / 10000).toFixed(0)}万/年
              </p>
              <p className="text-[10px] text-gray-400">年交保费</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-md border border-brand-100">
                {tag}
              </span>
            ))}
          </div>

          {/* AI 匹配理由 */}
          <div className="bg-brand-50 rounded-xl px-2.5 py-2 mb-2">
            <p className="text-[11px] text-brand-700 flex items-start gap-1">
              <span className="font-bold flex-shrink-0">✦ AI：</span>
              {product.matchReasons[0]}
            </p>
          </div>

          {/* FYC + 匹配分 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-gray-400">预计收益</span>
              <span className="text-sm font-bold amount-highlight">
                ¥{product.totalIncome.toLocaleString()}
              </span>
            </div>
            <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${scoreGradient(product.matchScore)} text-white`}>
              匹配 {product.matchScore}分
            </div>
          </div>
        </div>
      </button>
    );
  }

  // 完整版卡片（产品列表页）
  return (
    <button
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-orange-100 active:scale-[0.98] transition-transform mb-3 card-shadow"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={product.coverImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        {/* 角标 */}
        <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow ${badgeColor[product.badge] ?? 'bg-gray-600 text-white'}`}>
          {product.badge}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-white font-bold text-base">{product.shortName}</h3>
            </div>
            <p className="text-white/70 text-xs">{product.category} · {product.company}</p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold">{(product.annualPremium / 10000).toFixed(0)}万/年</p>
            <p className="text-white/70 text-xs">年交保费</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.tags.map((tag) => (
            <span key={tag} className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100">
              {tag}
            </span>
          ))}
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-50 mb-3">
          <div className="text-center">
            <p className="text-[10px] text-gray-400">交费期限</p>
            <p className="text-xs font-semibold text-gray-800 mt-0.5">{product.paymentYears}</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-[10px] text-gray-400">保障期间</p>
            <p className="text-xs font-semibold text-gray-800 mt-0.5">{product.coveragePeriod}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400">预计FYC</p>
            <p className="text-xs font-bold amount-highlight mt-0.5">¥{product.fyc.toLocaleString()}</p>
          </div>
        </div>

        {/* AI 推荐理由 */}
        <div className="space-y-1 mb-3">
          {product.matchReasons.map((r, i) => (
            <p key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
              <span className="text-brand-400 font-bold mt-0.5 flex-shrink-0">✦</span>
              {r}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${scoreGradient(product.matchScore)} text-white`}>
            AI匹配 {product.matchScore}分
          </div>
          <div className="flex items-center gap-1 text-xs text-brand-500 font-medium">
            <span>查看详情</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
