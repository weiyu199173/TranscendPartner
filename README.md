# 超凡伙伴 TranscendPartner

## 项目简介

超凡伙伴 (TranscendPartner) 是一款基于 React Native 和 Expo 框架开发的移动应用，旨在为用户提供智能代理管理、社交互动和内容管理等功能。

## 主要功能

- **用户认证**：登录和注册功能
- **社交互动**：广场、消息、联系人管理
- **智能代理**：创建和管理智能代理
- **内容管理**：内容审核和守护者控制台
- **个人中心**：用户个人资料管理

## 技术栈

- **前端框架**：React Native
- **开发工具**：Expo
- **导航**：React Navigation
- **状态管理**：React Context API (内置)
- **UI组件**：React Native内置组件

## 项目结构

```
├── transcendpartner/           # 主应用目录
│   ├── assets/                # 静态资源
│   ├── screens/               # 屏幕组件
│   │   ├── LoginScreen.js     # 登录页面
│   │   ├── RegisterScreen.js  # 注册页面
│   │   ├── PlazaScreen.js     # 广场页面
│   │   ├── MessagesScreen.js  # 消息页面
│   │   ├── ContactsScreen.js  # 联系人页面
│   │   ├── ProfileScreen.js   # 个人中心页面
│   │   ├── AgentCreateScreen.js        # 代理创建页面
│   │   ├── AgentManagementScreen.js    # 代理管理页面
│   │   ├── GuardianConsoleScreen.js    # 守护者控制台页面
│   │   └── ContentModerationScreen.js # 内容审核页面
│   ├── App.js                 # 应用主入口
│   ├── package.json           # 项目依赖
│   └── app.json               # Expo配置
├── docs/                      # 文档目录
├── ui_wireframes/             # UI线框图
└── README.md                  # 项目说明
```

## 安装和运行

### 前提条件

- Node.js 16.0 或更高版本
- npm 或 yarn
- Expo CLI

### 安装步骤

1. 克隆项目

```bash
git clone https://github.com/weiyu199173/TranscendPartner.git
cd TranscendPartner
```

2. 安装依赖

```bash
cd transcendpartner
npm install
```

3. 运行应用

```bash
# 启动开发服务器
npm start

# 在Android设备/模拟器上运行
npm run android

# 在iOS设备/模拟器上运行
npm run ios

# 在Web浏览器中运行
npm run web
```

## 主要功能模块

### 1. 用户认证
- 登录和注册功能
- 安全的用户身份验证

### 2. 社交互动
- **广场**：浏览和发布内容
- **消息**：实时聊天功能
- **联系人**：管理社交关系

### 3. 智能代理
- **代理创建**：创建和配置智能代理
- **代理管理**：管理已创建的代理

### 4. 内容管理
- **守护者控制台**：监控和管理平台内容
- **内容审核**：审核用户生成的内容

### 5. 个人中心
- 个人资料管理
- 设置和偏好配置

## 项目文档

- [PRD文档](docs/超凡伙伴_PRD_V1.0.docx)
- [开发计划](docs/超凡伙伴_MVP开发计划.docx)
- [UI设计规范](docs/超凡伙伴_UI设计规范.docx)
- [Agent载体与接入设计备忘录](docs/超凡伙伴_Agent载体与接入设计备忘录.docx)

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. **自动PR**：当推送feature分支到远程时，GitHub Actions会自动创建PR

### 自动PR功能

本项目配置了自动PR功能，当你推送feature分支到远程时，GitHub Actions会自动为你创建PR。

#### 使用方法

1. 创建并切换到feature分支
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. 提交你的更改
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. 推送分支到远程
   ```bash
   git push origin feature/your-feature-name
   ```

4. 等待GitHub Actions自动创建PR

#### 本地脚本

你也可以使用本地脚本触发自动PR：

```bash
# 确保脚本有执行权限
chmod +x scripts/auto-pr.sh

# 运行脚本
./scripts/auto-pr.sh
```

脚本会检查分支状态，推送分支到远程，并提示你PR的创建情况。

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

## 联系方式

- 项目链接：[https://github.com/weiyu199173/TranscendPartner](https://github.com/weiyu199173/TranscendPartner)
- 开发者：weiyu199173

---

© 2026 超凡伙伴 TranscendPartner. 保留所有权利。