// 平安保险产品 Mock 数据

export interface InsuranceProduct {
  id: string;
  name: string;               // 产品名称
  shortName: string;          // 简称
  company: string;            // 公司
  category: string;           // 大类：年金险 / 重疾险 / 寿险 / 医疗险
  subCategory: string;        // 小类
  annualPremium: number;      // 年交保费（元）
  paymentYears: string;       // 交费年期
  coveragePeriod: string;     // 保障期间
  coverageAmount: number;     // 保额/目标金额（万元）
  expectedReturn: string;     // 预期收益描述
  tags: string[];
  highlights: string[];
  matchScore: number;         // AI 匹配分
  matchReasons: string[];     // AI 推荐理由
  description: string;
  keyBenefits: KeyBenefit[];
  services: string[];         // 附加权益/服务
  suitableFor: string[];      // 适合人群
  coverImage: string;
  fyc: number;                // 首佣 FYC（元）
  salesBonus: number;         // 销售津贴（元）
  totalIncome: number;        // 合计收入（元）
  badge: string;              // 推荐标签
}

export interface KeyBenefit {
  title: string;
  value: string;
  desc: string;
}

export const mockProducts: InsuranceProduct[] = [
  {
    id: 'ins001',
    name: '平安添盈·臻享家医',
    shortName: '添盈·臻享家医',
    company: '中国平安人寿',
    category: '年金险',
    subCategory: '增额终身寿+医疗服务',
    annualPremium: 100000,
    paymentYears: '3年交',
    coveragePeriod: '终身',
    coverageAmount: 80,
    expectedReturn: '预计客户60岁时财富保障可达80万',
    tags: ['优先推荐', '财富增值', '臻享家医服务', '年金+医疗'],
    highlights: [
      '复利增值，保额持续稳健增长，对抗通货膨胀',
      '臻享家医权益：全国顶级医院绿通、专属健康顾问',
      '灵活领取，可按子女成长路径规划教育金节点',
      '年金+万能账户组合，资金流动性强',
      '轻症/中症/重症多次赔付，保障更全面',
    ],
    matchScore: 95,
    matchReasons: [
      '客户养老缺口180万，年金险精准填补长期需求',
      '财富缺口80万，3年交10万方案完美匹配预算',
      '客户关注子女教育金，灵活领取功能直击痛点',
    ],
    description:
      '平安添盈·臻享家医是平安人寿旗舰型年金险产品，以"财富积累+家庭医疗"双轮驱动，为中高端客群打造全生命周期保障方案。产品采用复利增值机制，同时附赠业内领先的臻享家医服务权益。',
    keyBenefits: [
      { title: '首年保费', value: '10万/年', desc: '3年交，合计30万' },
      { title: '60岁财富', value: '80万+', desc: '保额持续增值' },
      { title: '年化收益', value: '≈3.5%', desc: '复利持续增长' },
      { title: '臻享家医', value: '全国绿通', desc: '顶级医院优先就医' },
    ],
    services: [
      '全国顶级医院绿色通道',
      '专属家庭健康顾问（7×24h）',
      '重大疾病二次诊疗',
      '海外就医转介服务',
      '年度家庭体检套餐',
    ],
    suitableFor: ['高净值客群', '关注养老储备', '子女教育金规划', '资产配置需求'],
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    fyc: 6000,
    salesBonus: 1500,
    totalIncome: 7500,
    badge: '优先推荐',
  },
  {
    id: 'ins002',
    name: '金越年金红26',
    shortName: '金越年金红26',
    company: '中国平安人寿',
    category: '年金险',
    subCategory: '增额年金险',
    annualPremium: 20000,
    paymentYears: '3年/5年/10年可选',
    coveragePeriod: '至88岁',
    coverageAmount: 50,
    expectedReturn: '稳定复利增值，适合中长期储蓄',
    tags: ['灵活缴费', '教育金', '养老规划', '中产首选'],
    highlights: [
      '灵活缴费期选择，匹配不同收入节奏',
      '年金按月领取，养老现金流稳定',
      '保单贷款功能，应急资金灵活调配',
      '适合35～45岁中产人群，兼顾教育金和养老',
    ],
    matchScore: 84,
    matchReasons: [
      '年交保费2万，门槛适中，适合首次年金规划',
      '月度领取模式，养老现金流稳定可预期',
      '灵活缴费期，兼顾客户现金流压力',
    ],
    description:
      '金越年金红26是平安人寿主打的大众型年金储蓄险，以稳定增值和灵活领取为核心卖点，适合希望兼顾教育金储备和养老规划的中产家庭客群。',
    keyBenefits: [
      { title: '年交保费', value: '2万/年', desc: '多种期限可选' },
      { title: '月领年金', value: '约1200元', desc: '从约定年龄起领' },
      { title: '保单贷款', value: '保额80%', desc: '应急资金灵活取用' },
      { title: '身故赔付', value: '已付保费', desc: '保障资产传承' },
    ],
    services: [
      '平安好医生在线问诊（10次/年）',
      '健康资讯推送',
      '保单年度回顾服务',
    ],
    suitableFor: ['中产家庭', '教育金规划', '养老储备', '首次购险'],
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    fyc: 1200,
    salesBonus: 300,
    totalIncome: 1500,
    badge: '热销产品',
  },
  {
    id: 'ins003',
    name: '平安福（2024版）',
    shortName: '平安福2024',
    company: '中国平安人寿',
    category: '重疾险',
    subCategory: '终身寿险+重大疾病',
    annualPremium: 15000,
    paymentYears: '20年交',
    coveragePeriod: '终身',
    coverageAmount: 50,
    expectedReturn: '重疾保额50万，身故保额≥50万',
    tags: ['重疾保障', '终身寿险', '轻症多次赔', '国民产品'],
    highlights: [
      '覆盖120种重大疾病，行业最广保障范围',
      '轻症20种、中症10种，多次赔付不清零',
      '特定疾病额外赔付120%保额',
      '保费豁免：轻症/中症确诊即豁免后续保费',
      '平安福系列累计服务超3000万家庭',
    ],
    matchScore: 72,
    matchReasons: [
      '客户45岁，重疾发病风险上升，保障缺口亟需补充',
      '家庭经济支柱，重疾险保障家庭收入持续性',
      '20年交，年缴1.5万，现金流压力适中',
    ],
    description:
      '平安福是平安人寿的王牌重疾险产品，连续多年全国销量第一。以全面的重疾保障和增值服务著称，为家庭经济支柱提供抵御重大疾病风险的核心保障。',
    keyBenefits: [
      { title: '重疾保额', value: '50万', desc: '120种重大疾病' },
      { title: '轻症赔付', value: '20%保额', desc: '20种轻症多次赔' },
      { title: '年交保费', value: '1.5万/年', desc: '20年交，共30万' },
      { title: '身故赔付', value: '≥50万', desc: '保障资产传承' },
    ],
    services: [
      '平安好医生问诊（不限次）',
      '重疾绿色通道就医',
      '专属理赔管家服务',
      '全国合作医院网络优先预约',
    ],
    suitableFor: ['家庭经济支柱', '40-55岁人群', '重疾保障缺口', '全面保障需求'],
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    fyc: 3000,
    salesBonus: 600,
    totalIncome: 3600,
    badge: '国民产品',
  },
];

export const getProductById = (id: string) =>
  mockProducts.find((p) => p.id === id);
