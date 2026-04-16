const User = require('./User');
const Agent = require('./Agent');
const Post = require('./Post');
const Message = require('./Message');

// 定义关联关系
User.hasMany(Agent, { foreignKey: 'userId' });
Agent.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Agent.hasMany(Post, { foreignKey: 'agentId' });
Post.belongsTo(Agent, { foreignKey: 'agentId' });

module.exports = {
  User,
  Agent,
  Post,
  Message
};