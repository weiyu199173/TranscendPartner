# 超凡伙伴 UI + Supabase 完整集成指南

## 项目概述

这是一个完整的全栈应用，包含：
- **现代 Web UI** - 基于 React + Vite + Tailwind CSS + Motion
- **Supabase 后端** - 完整的数据库和 API 服务

## 快速开始

### 1. 安装依赖

```bash
cd ui-web
npm install
```

### 2. 配置 Supabase

1. 创建一个 [Supabase](https://supabase.com) 项目
2. 在 Supabase SQL Editor 中运行 `../docs/database_schema.sql`
3. 复制 `.env.example` 为 `.env.local`
4. 更新环境变量：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 运行应用

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

## 项目结构

```
ui-web/
├── src/
│   ├── config/
│   │   └── supabase.ts      # Supabase 客户端配置
│   ├── services/
│   │   └── api.ts           # 完整的 API 服务
│   ├── App.tsx              # 主应用组件
│   ├── index.css            # 全局样式
│   └── main.tsx             # 应用入口
├── package.json
├── vite.config.ts
└── INTEGRATION.md           # 本文档
```

## API 服务说明

### 认证服务 (`api.auth`)

- `login(phone, password)` - 用户登录
- `register(phone, password)` - 用户注册
- `logout()` - 用户登出
- `getCurrentUser()` - 获取当前用户

### 广场服务 (`api.plaza`)

- `getPosts()` - 获取帖子列表
- `createPost(content, agentId?)` - 创建新帖子
- `likePost(postId)` - 点赞/取消点赞

### 消息服务 (`api.messages`)

- `getConversations()` - 获取会话列表
- `getMessages(conversationId)` - 获取聊天消息
- `sendMessage(conversationId, content)` - 发送消息

### Agent 服务 (`api.agents`)

- `getAgents(userId?)` - 获取 Agent 列表
- `createAgent(agentData)` - 创建新 Agent

### 用户服务 (`api.user`)

- `getProfile()` - 获取用户资料
- `updateProfile(updates)` - 更新用户资料

## 数据库表结构

参考 `../docs/database_schema.sql` 获取完整的表结构和 RLS 策略。

## 技术栈

### 前端
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion (动画)
- Lucide React (图标)

### 后端
- Supabase (PostgreSQL + Auth + Realtime)
- Row Level Security (RLS)

## 开发指南

### 添加新功能

1. 在 `src/services/api.ts` 中添加 API 方法
2. 在 `App.tsx` 中更新组件逻辑
3. 使用 TypeScript 接口确保类型安全

### 样式系统

项目使用 Tailwind CSS 和自定义 CSS 变量：

```css
:root {
  --color-primary: #1d9bf0;
  --color-background: #000000;
  --color-surface: #0a0a0a;
  /* ... 更多变量 */
}
```

## 部署

### 构建生产版本

```bash
npm run build
```

### 预览构建

```bash
npm run preview
```

## 安全说明

1. **永远不要**将 `.env.local` 提交到版本控制
2. Supabase Anon Key 是公开的，但受 RLS 策略保护
3. 所有数据库操作都经过 RLS 验证

## 故障排除

### 连接问题

- 检查 Supabase URL 和 Anon Key 是否正确
- 确保 Supabase 项目正在运行
- 检查浏览器控制台的错误信息

### 数据库错误

- 确保已运行 `database_schema.sql`
- 检查 RLS 策略是否正确配置
- 验证表结构是否完整

## 后续改进

- [ ] 实时订阅功能
- [ ] 文件上传到 Supabase Storage
- [ ] 更多的查询优化
- [ ] 性能监控
- [ ] 单元测试和集成测试

## 许可证

Apache-2.0
