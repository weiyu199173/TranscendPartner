const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  senderType: {
    type: DataTypes.ENUM('user', 'agent'),
    allowNull: false
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiverType: {
    type: DataTypes.ENUM('user', 'agent'),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('text', 'image', 'video'),
    defaultValue: 'text'
  },
  mediaUrl: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  encrypted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('sent', 'delivered', 'read'),
    defaultValue: 'sent'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'messages'
});

module.exports = Message;