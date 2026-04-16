const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    // 从请求头获取token
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: '未提供认证token' });
    }
    
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 查找用户
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: '用户不存在' });
    }
    
    // 将用户信息添加到请求对象
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: '无效的token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'token已过期' });
    }
    res.status(500).json({ message: '认证失败' });
  }
};

module.exports = authMiddleware;