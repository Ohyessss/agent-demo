// 代理人 Demo - 完整故事线对话数据
// 故事线：一个代理人周一上午，拜访客户李明的完整工作流

export interface Customer {
  id: string;
  name: string;
  avatar: string;
  age: number;
  occupation: string;
  phone: string;
  gender: string;
  // 客户经营
  temperature: string;       // 客户温度：高温/中温/低温
  grid: string;              // 九宫格定位
  group: string;             // 客群标签
  // 需求
  coreNeeds: string[];       // 核心需求
  riskGaps: RiskGap[];       // 保障缺口
  existingCoverage: string;  // 现有保障
  // 财务
  annualIncome: number;      // 年收入（万元）
  assets: string[];          // 资产
  // 家庭
  family: string;
  childAge: string;
  // 跟进
  visitDate: string;         // 本次预约时间
  followUpCount: number;
  lastContact: string;
  notes: string;
}

export interface RiskGap {
  type: string;   // 缺口类型
  amount: string; // 缺口金额
  level: 'high' | 'medium' | 'low';
}

// 当前接待客户：李明（故事线主角）
export const currentCustomer: Customer = {
  id: 'c001',
  name: '李明',
  avatar: '李',
  age: 45,
  occupation: '公司合伙人',
  phone: '138****9988',
  gender: '男',
  temperature: '高温',
  grid: '社会中坚',
  group: '焦虑中年',
  coreNeeds: ['保财富', '保养老', '子女教育金'],
  riskGaps: [
    { type: '财富缺口', amount: '80万', level: 'high' },
    { type: '养老缺口', amount: '180万', level: 'high' },
    { type: '重疾保障', amount: '50万', level: 'medium' },
  ],
  existingCoverage: '仅有公司团险，无个人长期险',
  annualIncome: 120,
  assets: ['香蜜湖房产一套', '宝马 X5', '特斯拉 Model Y'],
  family: '已婚，太太主理家庭理财',
  childAge: '孩子8岁，小学二年级',
  visitDate: '今天 14:00',
  followUpCount: 3,
  lastContact: '上周三 电话',
  notes:
    '客户对年金险兴趣浓厚，担心资金流动性。太太主导家庭大额决策，需一并沟通。已授权中银保信同业保障数据查询。',
};

export interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  type: 'text' | 'product-cards' | 'gap-analysis' | 'fyc-result' | 'visit-summary';
  content?: string;
  productIds?: string[];
  timestamp: string;
}

// =============================================
// 对话脚本 - 5步推进（完整代理人故事线）
// =============================================

export const conversationSteps: ChatMessage[][] = [

  // ── Step 0：早晨 AI 主动提醒拜访 ──────────────────────────────
  [
    {
      id: 'msg-0-1',
      role: 'ai',
      type: 'text',
      content: `早上好，张主任 👋\n\n**今日有 1 个重要拜访提醒 ⏰**\n\n今日 **14:00** 拜访客户 **李明**\n📍 深圳·香蜜湖\n\n提前分析客户需求、准备专属产品方案，有助于提高促成概率。需要帮您定制一份产品方案吗？`,
      timestamp: '09:01',
    },
  ],

  // ── Step 1：AI 分析客户画像 + 保障缺口 ────────────────────────
  [
    {
      id: 'msg-1-user',
      role: 'user',
      type: 'text',
      content: '好的，帮我给李明定制一份产品方案',
      timestamp: '09:02',
    },
    {
      id: 'msg-1-1',
      role: 'ai',
      type: 'text',
      content: `正在调取李明客户信息，进行个性化需求分析……\n\n**【客户画像】** 李明，45岁，公司合伙人\n九宫格定位：**社会中坚** | 客群：**焦虑中年**\n\n面临风险：资产贬值、养老储备不足\n重点需求：**保财富 · 保养老 · 子女教育金**\n\n**【保障缺口分析】**\n结合客户授权的中银保信同业保障数据：\n🔴 财富缺口：**80万**（高优先级）\n🔴 养老缺口：**180万**（高优先级）\n🟡 重疾保障：**50万**（中优先级）\n\n已为您生成 3 套匹配方案，请查收 👇`,
      timestamp: '09:02',
    },
    {
      id: 'msg-1-2',
      role: 'ai',
      type: 'product-cards',
      productIds: ['ins001', 'ins002', 'ins003'],
      timestamp: '09:02',
    },
  ],

  // ── Step 2：代理人询问 FYC 收益 ───────────────────────────────
  [
    {
      id: 'msg-2-user',
      role: 'user',
      type: 'text',
      content: '促成这个方案我的销售利益有多少？',
      timestamp: '09:05',
    },
    {
      id: 'msg-2-1',
      role: 'ai',
      type: 'text',
      content: `促成**【添盈·臻享家医】**方案后，您的预计收益：\n\n💰 **首佣 FYC：6,000 元**\n🎁 **销售津贴：1,500 元**\n**合计收入：7,500 元**\n\n---\n\n📈 **晋升激励提醒：**\n距晋级 **P4** 还差 **4,500C** 累计 FYC\n距达标 **金钻** 还差 **4,000C**\n\n➕ 若同时促成**智享福2024**（1件），可再获 FYC 3,000元，距金钻仅差 **1,000C**，加油冲刺！ 🚀`,
      timestamp: '09:05',
    },
  ],

  // ── Step 3：拜访结束，语音录入，AI 生成拜访总结 ───────────────
  [
    {
      id: 'msg-3-user',
      role: 'user',
      type: 'text',
      content: '刚拜访完李明，客户决定投保添盈方案，帮我整理拜访总结',
      timestamp: '15:43',
    },
    {
      id: 'msg-3-1',
      role: 'ai',
      type: 'text',
      content: `恭喜出单！🎉 正在为您生成拜访总结……`,
      timestamp: '15:43',
    },
    {
      id: 'msg-3-2',
      role: 'ai',
      type: 'visit-summary',
      content: `拜访总结`,
      timestamp: '15:43',
    },
    {
      id: 'msg-3-3',
      role: 'ai',
      type: 'text',
      content: `**【异议处理建议】**\n客户曾担心年金资金锁定过长 💡\n\n**话术参考：**\n"年金险可灵活设置领取年龄、期间和方式。搭配万能账户后，孩子上学、结婚各阶段都能按需领取，因需赋型、以变应变。"\n\n---\n\n📍 **您当前在香蜜湖附近，还有 2 位客户可顺道拜访：**\n• **李四** — 同小区，中温客户，关注子女教育金\n• **王五** — 同商圈，高意向，已预约下次面谈\n\n是否更新客户档案并安排下一位拜访？`,
      timestamp: '15:44',
    },
  ],

  // ── Step 4：更新档案，推荐附近客户 ───────────────────────────
  [
    {
      id: 'msg-4-user',
      role: 'user',
      type: 'text',
      content: '更新客户档案，帮我分析王五的情况',
      timestamp: '15:45',
    },
    {
      id: 'msg-4-1',
      role: 'ai',
      type: 'text',
      content: `✅ 已同步更新李明拜访信息及客户情况到客户档案\n\n---\n\n正在分析**王五**的客户画像……\n\n**【王五 · 快速画像】**\n年龄：44岁 | 职业：私企老板 | 温度：🔥 高意向\n九宫格：社会中坚 | 已预约下次面谈时间：本周四 16:00\n\n**核心需求：** 养老规划（关键期）+ 资产保全\n**缺口：** 养老缺口约 200万\n\n**推荐方案：** 金越年金红26（10万/年，10年交）\n预计 FYC：**6,000 元**\n\n**销售攻略：**\n王五处于养老规划关键期，建议切入"财富传承+稳健现金流"场景，强调锁定当前利率窗口期，勿错过。\n\n需要我为本周四的拜访提前生成专属方案吗？`,
      timestamp: '15:46',
    },
  ],
];

// ── 每步结束后显示的快捷回复 ──────────────────────────────────────
export const quickRepliesPerStep: string[][] = [
  ['好的，帮我给李明定制一份产品方案', '先看看李明的客户档案', '查看今日行事历'],
  ['促成这个方案我的销售利益有多少？', '帮我生成销售攻略', '查看方案详情'],
  ['刚拜访完李明，客户决定投保添盈方案，帮我整理拜访总结', '客户还在犹豫，给我异议处理话术', '客户暂不购买，更新跟进状态'],
  ['更新客户档案，帮我分析王五的情况', '暂不拜访附近客户', '帮我发看房邀请给王五'],
  ['好的，帮王五生成专属方案', '加入本周四拜访计划', '查看本周全部经营计划'],
];
