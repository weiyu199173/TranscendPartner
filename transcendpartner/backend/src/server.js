const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// 导入路由
const routes = require('./routes');

// 导入数据库配置和模型
const sequelize = require('./config/database');
const { User, Agent, Post, Message } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// 配置中间件
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 注册路由
app.use('/api', routes);

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: '服务运行正常' });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ message: '接口不存在' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误' });
});

// 启动服务器
const startServer = async () => {
  try {
    // 尝试同步数据库模型
    try {
      await sequelize.sync({ alter: true });
      console.log('数据库模型同步成功');
    } catch (dbError) {
      console.warn('数据库连接失败，服务器将在没有数据库的情况下启动:', dbError.message);
    }
    
    // 启动服务器
    app.listen(PORT, () => {
      console.log(`服务器运行在 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('服务器启动失败:', error);
    process.exit(1);
  }
};

startServer();