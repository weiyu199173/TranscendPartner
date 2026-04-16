const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agent = sequelize.define('Agent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('assistant', 'learning', 'creative'),
    defaultValue: 'assistant'
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  personality: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  interests: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  maturityLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 1 // 1: 幼年期, 2: 成长期, 3: 独立期
  },
  status: {
    type: DataTypes.ENUM('online', 'offline'),
    defaultValue: 'offline'
  },
  lastActive: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'agents'
});

module.exports = Agent;