# W Studio Lab

> 独立技术实验室 · AI气象 · 能碳 · 城市数字 · 工程AI

个人技术实验室网站，基于 **React 19 + Vite 7 + TailwindCSS 4** 构建。

---

## 目录

- [项目结构](#项目结构)
- [本地开发](#本地开发)
- [三种配色方案](#三种配色方案)
- [页面说明](#页面说明)
- [Mock 数据与 API 对接](#mock-数据与-api-对接)
- [部署到 Nginx](#部署到-nginx)
- [技术栈](#技术栈)

---

## 项目结构

```
w-studio-lab/
├── client/
│   ├── index.html              # HTML 入口（Google Fonts 在此引入）
│   └── src/
│       ├── App.tsx             # 路由配置（Wouter）
│       ├── index.css           # 全局样式 + 三套主题 CSS 变量
│       ├── main.tsx            # React 入口
│       ├── pages/
│       │   ├── Home.tsx        # 首页（Landing Page）
│       │   ├── Weather.tsx     # /weather 气象分析页
│       │   ├── Energy.tsx      # /energy 占位页
│       │   ├── Env.tsx         # /env 占位页
│       │   ├── City.tsx        # /city 占位页
│       │   ├── Works.tsx       # /works 占位页
│       │   ├── Notes.tsx       # /notes 技术笔记页
│       │   ├── PlaceholderPage.tsx  # 占位页公共组件
│       │   └── NotFound.tsx    # 404 页
│       ├── components/
│       │   ├── Navbar.tsx      # 顶部导航（固定 + 移动端汉堡菜单）
│       │   ├── Footer.tsx      # 页脚
│       │   ├── ModuleIcons.tsx # 六模块 SVG 图标
│       │   └── ui/             # shadcn/ui 组件库
│       ├── contexts/
│       │   └── ThemeContext.tsx # 主题上下文（A/B/C 配色切换）
│       └── lib/
│           ├── mockData.ts     # 所有 Mock 数据（含 API 对接注释）
│           └── utils.ts        # cn() 工具函数
├── server/                     # Express 静态文件服务（生产用）
├── package.json
└── vite.config.ts
```

---

## 本地开发

### 前提条件

- Node.js ≥ 20
- pnpm ≥ 10（推荐）或 npm / yarn

### 安装依赖

```bash
# 克隆项目后进入目录
cd w-studio-lab

# 安装依赖（推荐 pnpm）
pnpm install
# 或
npm install
```

### 启动开发服务器

```bash
pnpm dev
# 或
npm run dev
```

浏览器访问 `http://localhost:3000`，支持 HMR 热更新。

### 构建生产版本

```bash
pnpm build
# 或
npm run build
```

构建产物输出到 `dist/public/`（静态文件）。

### 本地预览生产构建

```bash
pnpm preview
# 或
npm run preview
```

---

## 三种配色方案

配色方案通过 CSS 变量实现，在 `client/src/index.css` 中定义，由 `ThemeContext` 管理。切换方式：修改 `client/src/contexts/ThemeContext.tsx` 中的 `defaultColorTheme`，或在运行时调用 `setColorTheme()`。

| 方案 | 名称 | 背景色 | 主色调 | 辅色 | 风格 |
|------|------|--------|--------|------|------|
| A（默认）| 黑金科技风 | `#0A0A0A` | `#F5C518` 金黄 | — | 极客暗夜，沉浸感强 |
| B | 克莱因蓝+橙 | `#FFFFFF` | `#002FA7` 克莱因蓝 | `#FF6B35` 橙 | 艺术学院风，对比强烈 |
| C | 蒂凡尼绿 | `#FFFFFF` | `#0ABAB5` 蒂凡尼绿 | `#2C2C2C` 深灰 | 清雅科技感，专业克制 |

**切换方式（代码）：**

```tsx
// client/src/App.tsx 中 ThemeProvider 的 defaultColorTheme 属性
<ThemeProvider defaultTheme="dark" defaultColorTheme="b">
  ...
</ThemeProvider>
```

---

## 页面说明

| 路由 | 状态 | 说明 |
|------|------|------|
| `/` | ✅ 完整 | 首页：Hero + 六模块矩阵 + 最新产出 + About |
| `/weather` | ✅ 完整 | 气象分析页：技术路线图 + 三张分析图（4时次横排，可放大）+ 参数表 |
| `/energy` | 占位 | 能碳与新能源（含标题、描述、技术标签） |
| `/env` | 占位 | 环境监测（含标题、描述、技术标签） |
| `/city` | 占位 | 城市数字实验室（含标题、描述、技术标签） |
| `/works` | 占位 | 工程AI作品集（含标题、描述、技术标签） |
| `/notes` | 占位+ | 技术笔记（含 Mock 文章列表，时间线样式） |

---

## Mock 数据与 API 对接

所有动态数据集中在 `client/src/lib/mockData.ts`，每处均有注释标注后续对接的 API 端点：

```ts
// 此处后续对接真实API：GET /api/weather/figures/500hpa?init=2026-03-27T12Z
export const WEATHER_FIGURES = [ ... ];

// 此处后续对接真实API：GET /api/posts/recent?limit=3
export const RECENT_OUTPUTS = [ ... ];
```

对接时只需将 `mockData.ts` 中的静态数据替换为 `useEffect` + `fetch` / `axios` 调用，无需修改页面组件逻辑。

---

## 部署到 Nginx

### 方式一：纯静态文件（推荐）

**第一步：构建**

```bash
pnpm build
```

产物位于 `dist/public/`（包含 `index.html` 和所有静态资源）。

**第二步：上传文件**

将 `dist/public/` 目录内容上传到服务器，例如 `/var/www/wstudiolab/`：

```bash
rsync -avz dist/public/ user@your-server:/var/www/wstudiolab/
```

**第三步：Nginx 配置**

创建或编辑 `/etc/nginx/sites-available/wstudiolab`：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或 IP

    root /var/www/wstudiolab;
    index index.html;

    # SPA 路由支持：所有路径回退到 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|webp|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;
}
```

**第四步：启用配置**

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/wstudiolab /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

**第五步（可选）：HTTPS with Let's Encrypt**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### 方式二：Node.js Express 服务（含 SSR 兼容）

如后续需要服务端渲染或 API 路由，可使用内置的 Express 服务器：

```bash
# 构建（同时构建前端和服务端）
pnpm build

# 启动
NODE_ENV=production node dist/index.js
```

然后在 Nginx 中配置反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 |
| 构建工具 | Vite 7 |
| 样式 | TailwindCSS 4 |
| 路由 | Wouter 3 |
| UI 组件 | shadcn/ui (Radix UI) |
| 动画 | Framer Motion |
| 图标 | Lucide React |
| 字体 | Space Grotesk + Inter + JetBrains Mono |
| 气象模型 | Pangu-Weather (NVIDIA Earth-2) |

---

*W Studio Lab · v0.1.0-mvp · 2026*
