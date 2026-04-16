const { User } = require('../models');
const jwt = require('jsonwebtoken');

const authController = {
  // 注册
  register: async (req, res) => {
    try {
      const { phone, password, nickname } = req.body;
      
      // 检查手机号是否已存在
      const existingUser = await User.findOne({ where: { phone } });
      if (existingUser) {
        return res.status(400).json({ message: '手机号已注册' });
      }
      
      // 创建新用户
      const user = await User.create({
        phone,
        password,
        nickname: nickname || '用户'
      });
      
      // 生成token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      
      res.status(201).json({
        message: '注册成功',
        user: {
          id: user.id,
          phone: user.phone,
          nickname: user.nickname,
          avatar: user.avatar,
          guardianScore: user.guardianScore
        },
        token
      });
    } catch (error) {
      res.status(500).json({ message: '注册失败', error: error.message });
    }
  },
  
  // 登录
  login: async (req, res) => {
    try {
      const { phone, password } = req.body;
      
      // 查找用户
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        return res.status(401).json({ message: '手机号或密码错误' });
      }
      
      // 验证密码
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ message: '手机号或密码错误' });
      }
      
      // 生成token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      
      res.status(200).json({
        message: '登录成功',
        user: {
          id: user.id,
          phone: user.phone,
          nickname: user.nickname,
          avatar: user.avatar,
          guardianScore: user.guardianScore
        },
        token
      });
    } catch (error) {
      res.status(500).json({ message: '登录失败', error: error.message });
    }
  },
  
  // 获取当前用户信息
  getCurrentUser: async (req, res) => {
    try {
      const user = req.user;
      res.status(200).json({
        user: {
          id: user.id,
          phone: user.phone,
          nickname: user.nickname,
          avatar: user.avatar,
          guardianScore: user.guardianScore,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ message: '获取用户信息失败' });
    }
  },
  
  // 更新用户信息
  updateUser: async (req, res) => {
    try {
      const { nickname, avatar } = req.body;
      const user = req.user;
      
      if (nickname) user.nickname = nickname;
      if (avatar) user.avatar = avatar;
      
      await user.save();
      
      res.status(200).json({
        message: '更新成功',
        user: {
          id: user.id,
          phone: user.phone,
          nickname: user.nickname,
          avatar: user.avatar,
          guardianScore: user.guardianScore
        }
      });
    } catch (error) {
      res.status(500).json({ message: '更新失败', error: error.message });
    }
  },
  
  // 退出登录
  logout: (req, res) => {
    // 由于使用JWT，服务端不需要特殊处理
    // 客户端需要删除本地存储的token
    res.status(200).json({ message: '退出成功' });
  }
};

module.exports = authController;