/**
 * W Studio Lab — Mock Data
 * 所有动态数据接口用 mock 数据填充。
 * 接口位置均有注释标注"此处后续对接真实API"，便于第二版接入时无需重构前端。
 */

// ─── CDN URLs ─────────────────────────────────────────────────────────────────
// Hero carousel: fig_A/B/C (original Pangu/FuXi figures, colorful for hero display)
export const CDN = {
  FIG_A: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fig_A_final_77f3008c.webp",
  FIG_B: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fig_B_final_9159735f.webp",
  FIG_C: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fig_C_final_9c41c528.webp",
  // FuXi 7-day forecast figures (2026-03-29 00UTC init, 7 columns each)
  FUXI_FIG1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fuxi_fig1_z500slp_dfe4b8e6.webp",
  FUXI_FIG2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fuxi_fig2_850wind_501dc1b9.webp",
  FUXI_FIG3: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fuxi_fig3_700rh_ae1f1aae.webp",
  FUXI_FIG4: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fuxi_fig4_surface_51e5d448.webp",
  FUXI_FIG5: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fuxi_fig5_10mwind_aad8859d.webp",
  FUXI_FIG6: "https://d2xsxph8kpxj0f.cloudfront.net/310519663270941291/X7uFkaiHSx728UhT6iuzDD/fuxi_fig6_precip_0cb2e3f0.webp",
};

// ─── Hero Carousel ────────────────────────────────────────────────────────────
// 此处后续对接真实API：GET /api/hero/slides
export const HERO_SLIDES = [
  {
    src: CDN.FIG_A,
    caption: "500hPa Geopotential Height · FuXi Init: 2026-03-29 00UTC",
    sub: "FuXi / NVIDIA Earth-2",
  },
  {
    src: CDN.FIG_B,
    caption: "850hPa Wind Speed + Wind Barbs · FuXi Init: 2026-03-29 00UTC",
    sub: "FuXi / NVIDIA Earth-2",
  },
  {
    src: CDN.FIG_C,
    caption: "10m Wind Speed + Wind Barbs · FuXi Init: 2026-03-29 00UTC",
    sub: "FuXi / NVIDIA Earth-2",
  },
];

// ─── Six Module Cards ─────────────────────────────────────────────────────────
// 此处后续对接真实API：GET /api/modules/list
export const MODULES = [
  {
    id: "weather",
    name: "AI气象·模式预报",
    description: "盘古大模型与伏羲模型驱动的华东天气预报，7天时效，6变量可视化",
    href: "/weather",
    status: "active" as const,
    statusLabel: "已有产出",
    tags: ["Earth-2", "Pangu-Weather", "FuXi", "GFS"],
    icon: "weather",
  },
  {
    id: "energy",
    name: "双碳·新能源",
    description: "WRF+AI精细化光伏功率预测，碳排放核算与双碳路径分析",
    href: "/energy",
    status: "dev" as const,
    statusLabel: "开发中",
    tags: ["WRF", "XGBoost", "PVLib", "FastAPI"],
    icon: "energy",
    externalLink: "http://121.89.88.210:3001/login",
    externalLinkLabel: "进入能碳平台",
    externalLinkNote: "测试账号：mcdnhjz / 012345",
  },
  {
    id: "env",
    name: "大气环境监测",
    description: "常州空气质量实时监测与预警，多污染物可视化，数据来源中国环境监测总站",
    href: "https://changzhouaqi-8tepdfcr.manus.space/",
    status: "active" as const,
    statusLabel: "已有产出",
    tags: ["实时数据", "AQI", "Python", "Vue"],
    icon: "env",
  },
  {
    id: "city",
    name: "数字城市",
    description: "历史建筑与城市空间的数字化，241处不可移动文物空间分布可视化",
    href: "https://pudongviz-lsnmlvkw.manus.space/",
    status: "active" as const,
    statusLabel: "已有产出",
    tags: ["WebGIS", "Leaflet", "GIS", "空间分析"],
    icon: "city",
  },
  {
    id: "works",
    name: "AI工程实践",
    description:
      "AI辅助投标系统（BidMaster）与智能客服门户（UTIC），TypeScript全栈+Claude API+Dify，从需求到云端部署全链路走通",
    href: "/works",
    status: "active" as const,
    statusLabel: "已有产出",
    tags: ["TypeScript", "Claude API", "Dify", "FastAPI"],
    icon: "works",
    externalLink: "http://121.89.88.210:3002",
    externalLinkLabel: "BidMaster 投标系统",
  },
  {
    id: "notes",
    name: "气候思考",
    description: "随笔与思考，看起来随意其实不然",
    href: "/notes",
    status: "active" as const,
    statusLabel: "持续更新",
    tags: ["AI气象", "双碳", "GIS", "工程AI"],
    icon: "notes",
  },
];

// ─── Recent Outputs ───────────────────────────────────────────────────────────
// 此处后续对接真实API：GET /api/posts/recent?limit=3
export const RECENT_OUTPUTS = [
  {
    id: 1,
    title: "华东7天天气形势分析 · 2026-03-29 · FuXi / NVIDIA Earth-2",
    date: "2026-03-29",
    module: "AI气象",
    moduleColor: "weather",
    // 此处后续对接真实API：GET /api/weather/latest-thumbnail
    thumbnail: CDN.FUXI_FIG1,
    href: "/weather",
    description:
      "基于伏羲大模型的7天华东地区天气预报，含500hPa高空形势、850hPa低空急流、700hPa湿度场、地面气压温度、10m风场及逐日降水量分析。",
  },
  {
    id: 2,
    title: "常州AQI实时监测平台",
    date: "2026-01",
    module: "大气环境",
    moduleColor: "env",
    // 此处后续对接真实API：GET /api/env/latest-screenshot
    thumbnail: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80",
    href: "https://changzhouaqi-8tepdfcr.manus.space/",
    description: "多污染物实时可视化与阈值报警，数据来源中国环境监测总站公开接口。",
  },
  {
    id: 3,
    title: "浦东文物WebGIS系统",
    date: "2024",
    module: "数字城市",
    moduleColor: "city",
    // 此处后续对接真实API：GET /api/city/latest-screenshot
    thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    href: "https://pudongviz-lsnmlvkw.manus.space/",
    description: "241处不可移动文物空间分布可视化，支持多维筛选与保护级别分析。城市数据致谢：SJTU-IRCAHC",
  },
];

// ─── FuXi Weather Figures (for /weather page) ─────────────────────────────────
// 此处后续对接真实API：GET /api/weather/fuxi/latest
export interface WeatherFigure {
  id: string;
  title: string;
  shortTitle: string;
  src: string;
  variable: string;
  explanation: string;
}

export const FUXI_FIGURES: WeatherFigure[] = [
  {
    id: "fig1",
    title: "500hPa 位势高度场 + 海平面气压",
    shortTitle: "500hPa 高度场",
    src: CDN.FUXI_FIG1,
    variable: "Z500 + SLP",
    explanation:
      "500hPa位势高度场是天气预报的核心参考层，代表对流层中部（约5500米）的大气环流形势。蓝色等值线密集区对应槽线（冷空气活跃），红橙色区域对应脊（暖高压控制）。叠加的海平面气压等值线（黑色）揭示地面天气系统位置。从Mar29到Apr04的演变可清晰看到西风槽东移、华东地区受高压脊控制的过程，这是判断未来一周晴雨格局的基础。",
  },
  {
    id: "fig2",
    title: "850hPa 风速 + 风羽",
    shortTitle: "850hPa 低空风",
    src: CDN.FUXI_FIG2,
    variable: "Wind850 + Barbs",
    explanation:
      "850hPa层（约1500米）是低空急流的主要活动高度，也是水汽输送的关键通道。深红色区域（风速>20m/s）代表低空急流轴，是强降水和强对流天气的重要触发机制。风羽方向揭示气流辐合辐散：华东沿海的偏南风与内陆偏北风的交汇线，往往是锋面降水的落区。FuXi模型对低空急流的预报精度在中期时效（4-7天）明显优于传统数值模式。",
  },
  {
    id: "fig3",
    title: "700hPa 相对湿度 + 风场",
    shortTitle: "700hPa 湿度场",
    src: CDN.FUXI_FIG3,
    variable: "RH700 + Wind",
    explanation:
      "700hPa层（约3000米）的相对湿度是判断降水潜力最直接的指标，湿度超过70%的区域往往对应未来24小时的降水落区；配合风场辐合线位置，可定性判断强降水中心。这一层次在传统天气预报中是预报员判断降水的核心参考层，现在通过FuXi模型实现了7天时效的预报。绿色（高湿）区域的移动路径即降水带的预报轨迹，棕色（干燥）区域对应晴好天气控制区。",
  },
  {
    id: "fig4",
    title: "地面气压 + 2m气温",
    shortTitle: "地面气压温度",
    src: CDN.FUXI_FIG4,
    variable: "SLP + T2m",
    explanation:
      "地面气压场（黑色等值线）与2m气温（色阶填色）的叠加图是最直观的天气综合分析图。低压中心对应阴雨天气，高压中心对应晴好天气。2m气温的蓝色区域（<5°C）代表冷空气主体，红橙色区域（>20°C）代表暖气团控制。从图中可以看到冷暖气团的交界面（锋区）随时间的移动，这是华东地区春季天气多变的根本原因。FuXi对地面温度的7天预报误差通常在1-2°C以内。",
  },
  {
    id: "fig5",
    title: "10m 风速 + 风羽",
    shortTitle: "10m 地面风",
    src: CDN.FUXI_FIG5,
    variable: "Wind10m + Barbs",
    explanation:
      "10m风场是最贴近地面的风速预报，直接对应气象站观测值，也是海上作业、航运和风能评估的核心参数。蓝色区域（风速>10m/s）在沿海地区代表大风预警级别。风羽的方向揭示地面气流的辐合辐散特征：在低压中心附近，风羽呈逆时针辐合，对应上升气流和降水；在高压中心，风羽呈顺时针辐散，对应下沉气流和晴天。与850hPa风场对比可判断垂直风切变，这是强对流天气的重要判据。",
  },
  {
    id: "fig6",
    title: "逐日降水量（24h累积）",
    shortTitle: "逐日降水",
    src: CDN.FUXI_FIG6,
    variable: "Precip 24h",
    explanation:
      "逐日降水量是FuXi模型的独家输出变量之一，传统数值模式通常输出累积降水，而FuXi直接预报24小时降水量，更便于日常天气服务应用。色阶从白色（无降水）到深蓝色（>50mm/24h，暴雨级别）。从7天演变可以看出降水带的移动路径：华东地区的降水主要集中在锋面过境时段，FuXi对3天内降水落区的预报技巧评分（TS评分）已接近ECMWF水平，7天时效仍有明显参考价值。",
  },
];

// ─── FuXi forecast dates (7 days, Mar29–Apr04) ────────────────────────────────
export const FUXI_DATES = [
  { label: "Mar 29", offset: 0 },
  { label: "Mar 30", offset: 1 },
  { label: "Mar 31", offset: 2 },
  { label: "Apr 01", offset: 3 },
  { label: "Apr 02", offset: 4 },
  { label: "Apr 03", offset: 5 },
  { label: "Apr 04", offset: 6 },
];

// ─── FuXi technical metadata ──────────────────────────────────────────────────
// 此处后续对接真实API：GET /api/weather/fuxi/meta
export const WEATHER_META = {
  model: "FuXi（伏羲，复旦大学，支持15天预报）",
  framework: "NVIDIA Earth-2 / earth2studio",
  initData: "GFS 0.25° 全球分析场（NOAA，公开免费）",
  resolution: "0.25°（约25公里）",
  forecastHours: "7天（168小时），每24小时一个时次",
  region: "华东（105-130°E，22-45°N），含省级行政边界",
  inferenceTime: "约34分钟（GFS下载 + FuXi推理 + zarr输出 + 6变量可视化）",
  outputVars: "500hPa位势高度、850hPa风场、700hPa相对湿度、地面气压+2m温度、10m风场、逐日降水量",
  initTime: "2026-03-29 00UTC",
  pipeline: "GFS → FuXi推理（约34分钟）→ zarr输出 → 6变量可视化",
};

// ─── 环境监测 Mock 数据（/env 页面）─────────────────────────────────────────────
// 此处后续对接真实API：GET https://api.cnemc.cn/v1/aqi/changzhou
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

// ─── 技术笔记 Mock 数据（/notes 页面）────────────────────────────────────────────
// 此处后续对接真实API：GET /api/notes/list
export const NOTES_MOCK = [
  {
    id: 1,
    title: "AI气象大模型技术演进：Pangu / FuXi / GraphCast 分层解析",
    date: "2026-03-15",
    tags: ["AI气象", "FuXi", "Pangu-Weather"],
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
