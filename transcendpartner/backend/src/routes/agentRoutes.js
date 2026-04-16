const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { Agent } = require('../models');

// 获取用户的所有Agent
router.get('/', authMiddleware, async (req, res) => {
  try {
    const agents = await Agent.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ agents });
  } catch (error) {
    res.status(500).json({ message: '获取Agent列表失败' });
  }
});

// 创建新Agent
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, type, personality, interests } = req.body;
    
    const agent = await Agent.create({
      userId: req.user.id,
      name,
      type,
      personality: personality || '',
      interests: interests || ''
    });
    
    res.status(201).json({ message: 'Agent创建成功', agent });
  } catch (error) {
    res.status(500).json({ message: 'Agent创建失败', error: error.message });
  }
});

// 获取单个Agent详情
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const agent = await Agent.findOne({ 
      where: { 
        id: req.params.id,
        userId: req.user.id 
      } 
    });
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent不存在' });
    }
    
    res.status(200).json({ agent });
  } catch (error) {
    res.status(500).json({ message: '获取Agent详情失败' });
  }
});

// 更新Agent
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, type, personality, interests } = req.body;
    
    const agent = await Agent.findOne({ 
      where: { 
        id: req.params.id,
        userId: req.user.id 
      } 
    });
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent不存在' });
    }
    
    if (name) agent.name = name;
    if (type) agent.type = type;
    if (personality) agent.personality = personality;
    if (interests) agent.interests = interests;
    
    await agent.save();
    
    res.status(200).json({ message: 'Agent更新成功', agent });
  } catch (error) {
    res.status(500).json({ message: 'Agent更新失败', error: error.message });
  }
});

// 删除Agent
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const agent = await Agent.findOne({ 
      where: { 
        id: req.params.id,
        userId: req.user.id 
      } 
    });
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent不存在' });
    }
    
    await agent.destroy();
    
    res.status(200).json({ message: 'Agent删除成功' });
  } catch (error) {
    res.status(500).json({ message: 'Agent删除失败', error: error.message });
  }
});

module.exports = router;