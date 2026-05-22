# 足球机器人策略实验室

一个面向 AI 产品经理转行表达的 React/Vite 个人网站。

网站主题是“AI 产品经理转行名片 + 足球机器人策略实验室”，用足球机器人比赛中的策略设计、仿真验证和快速迭代经历，展示面向 AI 产品岗位的能力迁移。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

项目已在 `vite.config.js` 中配置 `base: "/robot-football-site/"`，适配 GitHub Pages。

## 发布

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布 `dist` 到 `gh-pages` 分支。

首次部署需要到仓库 Settings -> Pages 中将 Source 选择为 `Deploy from a branch`，Branch 选择 `gh-pages` 和 `/ (root)`。
