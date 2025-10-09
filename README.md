# 余晓 - 小说网站

一个简单优雅的在线小说阅读平台，采用纸质书般的阅读体验，使用 Next.js 和 TypeScript 构建。

## 特点

- 📖 纸质书般的阅读体验，淡黄色背景模拟真实纸张
- ✨ 简洁优雅的排版，专注于内容阅读
- 📝 使用 Markdown 格式撰写小说，简单易用
- 🚀 基于 Next.js 的静态网站生成，快速加载
- 📱 响应式设计，支持移动端阅读

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 添加您的小说内容

首先编辑 `content/novel/info.md` 设置小说基本信息：

```markdown
---
title: 余晓
author: 作者名
description: 小说简介
---
```

然后为每个章节创建独立的 Markdown 文件（`chapter_01.md`, `chapter_02.md` 等）：

```markdown
---
title: 第一章
author: 作者名
---

"再也不见了，我踩过的土地......"

正文内容...
```

章节文件命名规则：`chapter_XX.md`，其中 XX 是两位数的章节编号（如 01, 02, 03）。系统会自动按编号排序。

### 3. 开发模式运行

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 4. 构建静态网站

```bash
npm run build
```

构建完成后，静态文件会生成在 `out` 目录中，您可以将其部署到任何静态网站托管服务。

## 部署

生成的静态文件可以部署到：

- GitHub Pages
- Netlify
- Vercel
- 任何支持静态网站的托管服务

只需将 `out` 目录中的内容上传即可。

## 项目结构

```
yu-xiao/
├── app/                       # Next.js App Router
│   ├── chapter/[slug]/       # 章节页面（动态路由）
│   │   └── page.tsx
│   ├── globals.css           # 全局样式（纸质效果）
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 首页（目录页）
├── content/novel/            # 小说内容目录
│   ├── info.md               # 小说基本信息
│   ├── chapter_01.md         # 第一章
│   ├── chapter_02.md         # 第二章
│   └── ...                   # 更多章节
├── lib/                      # 工具函数
│   └── novel.ts              # Markdown 处理逻辑
├── public/                   # 静态资源
├── next.config.js            # Next.js 配置
├── tsconfig.json             # TypeScript 配置
└── package.json              # 项目依赖
```

## 自定义样式

所有的视觉样式都在 `app/globals.css` 中定义。您可以根据需要调整：

- 纸张背景颜色（默认：淡黄色 `#fffef0`）
- 字体大小和行距
- 标题样式
- 段落缩进

## Markdown 支持

支持的 Markdown 语法：

- 标题：`##` `###`
- 段落
- 引用：`> 引用内容`
- 列表：`-` 或 `1.`
- 粗体：`**文本**`
- 斜体：`*文本*`
- 代码：`` `代码` ``
- 分隔线：`---`

## 许可证

ISC
