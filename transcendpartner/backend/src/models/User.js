const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phone: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nickname: {
    type: DataTypes.STRING(50),
    defaultValue: '用户'
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  guardianScore: {
    type: DataTypes.INTEGER,
    defaultValue: 80
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
  tableName: 'users',
  hooks: {
    // 密码加密
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// 验证密码
User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;