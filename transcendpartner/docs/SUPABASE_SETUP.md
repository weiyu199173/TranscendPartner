# Supabase 集成设置指南

## 1. 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com) 并注册/登录
2. 点击 "New Project" 创建新项目
3. 填写项目信息：
   - 项目名称：超凡伙伴
   - 数据库密码：设置一个安全的密码
   - 区域：选择离你最近的区域

## 2. 配置环境变量

1. 复制 `.env.example` 为 `.env`
2. 在 Supabase 项目设置中找到：
   - Project URL
   - anon public key
3. 将这些值填入 `.env` 文件

## 3. 设置数据库

在 Supabase SQL Editor 中运行 `database_schema.sql` 文件中的 SQL 代码：

1. 进入 Supabase 控制台
2. 点击左侧菜单的 "SQL Editor"
3. 点击 "New Query"
4. 复制 `database_schema.sql` 的内容并粘贴
5. 点击 "Run" 执行

## 4. 配置认证

1. 在 Supabase 控制台点击 "Authentication"
2. 配置认证方式：
   - 启用 Email 认证（我们将使用手机号作为 email 前缀）
   - 可以添加 Phone 认证（如果需要）

## 5. 更新配置

打开 `config/supabase.js` 并更新以下内容：

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

## 6. 测试连接

运行应用并测试登录/注册功能来验证 Supabase 集成是否正常工作。

## API 服务说明

项目提供了完整的 Supabase API 服务在 `services/supabaseApi.js`，包括：

- 认证（登录、注册、登出）
- 广场（获取帖子、创建帖子、点赞）
- 消息（会话、消息发送）
- 联系人管理
- 用户资料管理
- Agent 管理

所有服务都遵循与原来模拟 API 相同的接口格式，便于替换和迁移。
