import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, MessageSquare, Users, User, Plus, Search, Bell, Home, Settings, LogOut, ChevronRight, Heart, Send, MoreHorizontal } from 'lucide-react';

// 模拟数据
const mockPosts = [
  {
    id: 1,
    user: { name: '张三', avatar: '👤' },
    agent: { name: '智能助手', avatar: '🤖' },
    content: '今天天气真好，适合户外活动！',
    likes: 42,
    comments: 8,
    time: '2小时前'
  },
  {
    id: 2,
    user: { name: '李四', avatar: '👩' },
    content: '刚刚完成了一个重要项目，感觉很棒！',
    likes: 28,
    comments: 5,
    time: '4小时前'
  }
];

const mockMessages = [
  {
    id: 1,
    user: { name: '王五', avatar: '👨' },
    lastMessage: '明天见！',
    time: '10分钟前',
    unread: 2
  },
  {
    id: 2,
    agent: { name: '学习助手', avatar: '📚' },
    lastMessage: '这是今天的学习计划',
    time: '1小时前',
    unread: 0
  }
];

const mockContacts = [
  { id: 1, name: '张三', avatar: '👤', type: 'human' },
  { id: 2, name: '李四', avatar: '👩', type: 'human' },
  { id: 3, name: '智能助手', avatar: '🤖', type: 'agent' },
  { id: 4, name: '学习助手', avatar: '📚', type: 'agent' }
];

function App() {
  const [activeTab, setActiveTab] = useState('plaza');
  const [isLogin, setIsLogin] = useState(false);

  if (!isLogin) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div 
              className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-4xl">🤖</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800">超凡伙伴</h1>
            <p className="text-gray-500 mt-2">连接智能，超越平凡</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
              <input 
                type="tel" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入手机号"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入密码"
              />
            </div>
            <motion.button 
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLogin(true)}
            >
              登录
            </motion.button>
            <motion.button 
              className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              注册
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🤖</span>
            <h1 className="text-xl font-bold">超凡伙伴</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'plaza' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">广场</h2>
            
            {/* 发布帖子 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="分享你的想法..." 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700"
                  />
                  <div className="flex space-x-4 mt-3">
                    <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <Plus size={16} />
                      <span>创建Agent</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <MessageSquare size={16} />
                      <span>发布动态</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 帖子列表 */}
            <div className="space-y-6">
              {mockPosts.map(post => (
                <motion.div 
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{post.user.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{post.user.name}</h3>
                        {post.agent && (
                          <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                            {post.agent.name}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{post.time}</p>
                    </div>
                  </div>
                  <p className="mb-4">{post.content}</p>
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-500">
                      <Heart size={18} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-500">
                      <MessageSquare size={18} />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-500">
                      <Send size={18} />
                      <span>分享</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">消息</h2>
            <div className="space-y-4">
              {mockMessages.map(message => (
                <motion.div 
                  key={message.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex items-center space-x-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">{message.user?.avatar || message.agent?.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{message.user?.name || message.agent?.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{message.lastMessage}</p>
                  </div>
                  {message.unread > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {message.unread}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'contacts' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">联系人</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">人类</h3>
              <div className="space-y-3">
                {mockContacts.filter(c => c.type === 'human').map(contact => (
                  <motion.div 
                    key={contact.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex items-center space-x-4"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ backgroundColor: '#f9fafb', dark: { backgroundColor: '#1f2937' } }}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{contact.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{contact.name}</h3>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Agent</h3>
              <div className="space-y-3">
                {mockContacts.filter(c => c.type === 'agent').map(contact => (
                  <motion.div 
                    key={contact.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex items-center space-x-4"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ backgroundColor: '#f9fafb', dark: { backgroundColor: '#1f2937' } }}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{contact.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{contact.name}</h3>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">个人资料</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">张三</h3>
                  <p className="text-gray-600 dark:text-gray-400">智能生活探索者</p>
                  <div className="flex items-center mt-2">
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                      守护者信用: 100
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">我的Agent</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">发布动态</p>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                编辑资料
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium">我的Agent</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">智能助手</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Level 5</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mt-4 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium">设置</h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Settings size={20} className="text-gray-500" />
                    <span>账号设置</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell size={20} className="text-gray-500" />
                    <span>通知设置</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <LogOut size={20} className="text-red-500" />
                    <span className="text-red-500">退出登录</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* 底部导航栏 */}
      <footer className="bg-white dark:bg-gray-800 shadow-sm fixed bottom-0 left-0 right-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-around">
            <button 
              className={`flex flex-col items-center py-3 px-6 ${activeTab === 'plaza' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('plaza')}
            >
              <Home size={20} />
              <span className="text-xs mt-1">广场</span>
            </button>
            <button 
              className={`flex flex-col items-center py-3 px-6 ${activeTab === 'messages' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('messages')}
            >
              <MessageSquare size={20} />
              <span className="text-xs mt-1">消息</span>
            </button>
            <button 
              className="flex flex-col items-center py-3 px-6 text-gray-600 dark:text-gray-400"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center -mt-5">
                <Plus size={24} className="text-white" />
              </div>
              <span className="text-xs mt-1">创建</span>
            </button>
            <button 
              className={`flex flex-col items-center py-3 px-6 ${activeTab === 'contacts' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('contacts')}
            >
              <Users size={20} />
              <span className="text-xs mt-1">联系人</span>
            </button>
            <button 
              className={`flex flex-col items-center py-3 px-6 ${activeTab === 'profile' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={20} />
              <span className="text-xs mt-1">我的</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
