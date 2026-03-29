/**
 * W Studio Lab — Mock Data
 * 所有动态数据接口用 mock 数据填充。
 * 接口位置均有注释标注"此处后续对接真实API"，便于第二版接入时无需重构前端。
 */

// ============================================================
// 气象预报数据（/weather 页面）
// 此处后续对接真实API：POST /api/weather/forecast?date=YYYY-MM-DD
// ============================================================
export const WEATHER_META = {
  model: "Pangu-Weather（盘古气象大模型，华为云，Nature 2023）",
  framework: "NVIDIA Earth-2 / earth2studio 0.9.0",
  initData: "GFS 0.25° 全球分析场（NOAA，公开免费）",
  resolution: "0.25°（约25公里）",
  forecastHours: "72小时，每24小时一个时次",
  region: "华东（105-130°E，22-45°N），含省级行政边界",
  inferenceTime: "约60秒以内（NVIDIA P100 GPU）",
  outputVars: "500hPa位势高度、850hPa风场、10m风场、海平面气压等",
  initTime: "2026-03-27 12UTC",
};

export const WEATHER_FIGURES = [
  {
    id: "fig_A",
    title: "500hPa 位势高度场 + 海平面气压",
    variable: "500hPa Geopotential Height (blue contour/shaded) + SLP (black contour)",
    // 此处后续对接真实API：GET /api/weather/figures/500hpa?init=2026-03-27T12Z
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fig_A_final_77f3008c.webp",
    explanation:
      "高空槽脊的位置决定了天气系统的移动方向。500hPa 位势高度场（蓝色填色与等值线）反映高空大气的冷暖分布——低值区对应冷槽，高值区对应暖脊。叠加的海平面气压（黑色等值线）揭示地面高低压系统：低压中心往往对应阴雨天气，高压控制区则晴朗干燥。两者结合，可判断未来72小时华东地区天气系统的演变路径与强度变化。",
    timeLabels: ["Mar 27 20CST (+0h)", "Mar 28 20CST (+24h)", "Mar 29 20CST (+48h)", "Mar 30 20CST (+72h)"],
  },
  {
    id: "fig_B",
    title: "850hPa 风速场 + 风羽",
    variable: "850hPa Wind Speed (shaded, m/s) + Wind Barbs",
    // 此处后续对接真实API：GET /api/weather/figures/850hpa?init=2026-03-27T12Z
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fig_B_final_9159735f.webp",
    explanation:
      "850hPa 层（约1500米高度）是低层大气的'输送通道'。偏南风（风羽朝北）将来自南海和西太平洋的暖湿气流向北输送，为华东地区提供水汽条件，是强降水过程的必要前提。静风区或风速辐合区往往对应污染物的水平扩散受阻，导致 PM2.5 浓度累积。图中填色为风速大小（m/s），风羽方向表示风向，每根长羽代表 10m/s，短羽代表 5m/s。",
    timeLabels: ["Mar 27 20CST (+0h)", "Mar 28 20CST (+24h)", "Mar 29 20CST (+48h)", "Mar 30 20CST (+72h)"],
  },
  {
    id: "fig_C",
    title: "10m 风速场 + 风羽",
    variable: "10m Wind Speed (shaded, m/s) + Wind Barbs",
    // 此处后续对接真实API：GET /api/weather/figures/10m_wind?init=2026-03-27T12Z
    cdnUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fig_C_final_9c41c528.webp",
    explanation:
      "近地面10米风速是大气扩散能力的直接指标，也是新能源发电预测的关键输入变量。风速低于2m/s时，近地面大气混合层高度降低，污染物难以垂直扩散，易形成重污染天气。对于风电场，10m风速预报精度直接影响发电功率预测误差。图中蓝色深色区域代表高风速（>12m/s），黄绿色区域为低风速，风羽方向与850hPa层一致，但受地形和边界层摩擦影响，近地面风向与高空存在偏差。",
    timeLabels: ["Mar 27 20CST (+0h)", "Mar 28 20CST (+24h)", "Mar 29 20CST (+48h)", "Mar 30 20CST (+72h)"],
  },
];

// ============================================================
// 首页最新产出（Landing Page）
// 此处后续对接真实API：GET /api/posts/recent?limit=3
// ============================================================
export const RECENT_OUTPUTS = [
  {
    id: 1,
    title: "华东72h天气形势分析",
    date: "2026-03-27",
    module: "AI气象",
    moduleColor: "weather",
    // 此处后续对接真实API：GET /api/weather/latest-thumbnail
    thumbnail: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fig_A_final_77f3008c.webp",
    href: "/weather",
    description: "基于盘古大模型的72小时华东地区天气预报，含500hPa高空形势分析。",
  },
  {
    id: 2,
    title: "常州AQI实时监测平台",
    date: "2026-01",
    module: "环境监测",
    moduleColor: "env",
    // 此处后续对接真实API：GET /api/env/latest-screenshot
    thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80",
    href: "https://changzhouaqi-8tepdfcr.manus.space/",
    description: "多污染物实时可视化与阈値报警，数据来源中国环境监测总站公开接口。",
  },
  {
    id: 3,
    title: "浦东文物WebGIS系统",
    date: "2024",
    module: "城市数字",
    moduleColor: "city",
    // 此处后续对接真实API：GET /api/city/latest-screenshot
    thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    href: "https://pudongviz-lsnmlvkw.manus.space/",
    description: "241处不可移动文物空间分布可视化，支持多维筛选与保护级别分析。",
  },
];

// ============================================================
// 六模块能力矩阵（首页）
// 此处后续对接真实API：GET /api/modules/list
// ============================================================
export const MODULES = [
  {
    id: "weather",
    name: "AI气象·模式预报",
    description: "盘古大模型驱动的华东天气预报",
    href: "/weather",
    status: "active" as const,
    statusLabel: "已有产出",
    tags: ["Pangu-Weather", "Earth-2", "GFS", "Python"],
    icon: "weather",
  },
  {
    id: "energy",
    name: "能碳与新能源",
    description: "WRF+AI精细化光伏功率预测",
    href: "http://121.89.88.210:3001/login",
    status: "dev" as const,
    statusLabel: "开发中",
    tags: ["WRF", "XGBoost", "PVLib", "FastAPI"],
    icon: "energy",
  },
  {
    id: "env",
    name: "环境监测",
    description: "常州空气质量实时监测与预警",
    href: "https://changzhouaqi-8tepdfcr.manus.space/",
    status: "active" as const,
    statusLabel: "已有产出",
    tags: ["实时数据", "AQI", "Python", "Vue"],
    icon: "env",
  },
  {
    id: "city",
    name: "城市数字实验室",
    description: "历史建筑与城市空间的数字化",
    href: "https://pudongviz-lsnmlvkw.manus.space/",
    status: "active" as const,
    statusLabel: "已有产出",
    tags: ["WebGIS", "Leaflet", "GIS", "空间分析"],
    icon: "city",
  },
  {
    id: "works",
    name: "工程AI作品集",
    description: "从招投标到客服的AI全栈实践",
    href: "/works",
    status: "active" as const,
    statusLabel: "已有产出",
    tags: ["TypeScript", "Claude API", "Dify", "FastAPI"],
    icon: "works",
  },
  {
    id: "notes",
    name: "技术笔记",
    description: "随笔与思考，看起来随意其实不然",
    href: "/notes",
    status: "active" as const,
    statusLabel: "持续更新",
    tags: ["AI气象", "双碳", "GIS", "工程AI"],
    icon: "notes",
  },
];

// ============================================================
// 环境监测 Mock 数据（/env 页面）
// 此处后续对接真实API：GET https://api.cnemc.cn/v1/aqi/changzhou
// ============================================================
export const ENV_MOCK = {
  city: "常州",
  updateTime: "2026-03-29 14:00",
  aqi: 62,
  level: "良",
  pm25: 28,
  pm10: 45,
  so2: 8,
  no2: 32,
  co: 0.6,
  o3: 88,
};

// ============================================================
// 技术笔记 Mock 数据（/notes 页面）
// 此处后续对接真实API：GET /api/notes/list
// ============================================================
export const NOTES_MOCK = [
  {
    id: 1,
    title: "AI气象大模型技术演进：Pangu / GraphCast / GenCast 分层解析",
    date: "2026-03-15",
    tags: ["AI气象", "Pangu-Weather", "GraphCast"],
    excerpt: "从物理方程到数据驱动，三代气象大模型的技术路线对比与个人实测体验。",
  },
  {
    id: 2,
    title: "双细则考核与光伏预测的商业逻辑",
    date: "2026-02-20",
    tags: ["新能源", "光伏预测", "双细则"],
    excerpt: "江苏双细则考核机制下，光伏功率预测误差如何直接影响电站收益。",
  },
  {
    id: 3,
    title: "从WRF到Earth-2：一个预报员的技术迁移路径",
    date: "2026-01-10",
    tags: ["WRF", "Earth-2", "AI气象"],
    excerpt: "十年数值预报经验遇上AI大模型，工具变了，但问题本质没变。",
  },
];
