const express = require('express');
const router = express.Router();

// 导入各模块路由
const authRoutes = require('./authRoutes');
const agentRoutes = require('./agentRoutes');

// 注册路由
router.use('/auth', authRoutes);
router.use('/agents', agentRoutes);

module.exports = router;