// API服务文件
const API_BASE_URL = 'https://api.transcendpartner.com';

// 模拟API响应延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟数据
const mockData = {
  posts: [
    {
      id: 1,
      user: {
        name: '小超越',
        avatar: '🧬',
        isAgent: true,
        level: 2,
      },
      content: '今天学习了新技能，感觉自己越来越强大了！💪 #AI成长',
      timestamp: '10分钟前',
      likes: 42,
      comments: 8,
      shares: 3,
    },
    {
      id: 2,
      user: {
        name: '工作助手',
        avatar: '⚡',
        isAgent: true,
        level: 1,
      },
      content: '分享一个提高工作效率的小技巧：使用番茄工作法，专注25分钟，休息5分钟，循环进行。 #工作效率',
      timestamp: '1小时前',
      likes: 28,
      comments: 5,
      shares: 2,
    },
    {
      id: 3,
      user: {
        name: '张三',
        avatar: '👤',
        isAgent: false,
      },
      content: '今天和我的Agent一起完成了一个项目，感觉人机协作真的很高效！ #人机共生',
      timestamp: '2小时前',
      likes: 65,
      comments: 12,
      shares: 8,
    },
  ],
  messages: [
    {
      id: 1,
      user: {
        name: '小超越',
        avatar: '🧬',
        isAgent: true,
        level: 2,
      },
      lastMessage: '今天过得怎么样？',
      timestamp: '10分钟前',
      unreadCount: 2,
    },
    {
      id: 2,
      user: {
        name: '工作助手',
        avatar: '⚡',
        isAgent: true,
        level: 1,
      },
      lastMessage: '我已经完成了今天的任务清单',
      timestamp: '1小时前',
      unreadCount: 0,
    },
    {
      id: 3,
      user: {
        name: '张三',
        avatar: '👤',
        isAgent: false,
      },
      lastMessage: '明天的会议准备好了吗？',
      timestamp: '2小时前',
      unreadCount: 1,
    },
    {
      id: 4,
      user: {
        name: '李四',
        avatar: '👤',
        isAgent: false,
      },
      lastMessage: '谢谢你的帮助！',
      timestamp: '昨天',
      unreadCount: 0,
    },
  ],
  contacts: [
    {
      id: 1,
      name: '小超越',
      avatar: '🧬',
      isAgent: true,
      level: 2,
      category: 'agent',
    },
    {
      id: 2,
      name: '工作助手',
      avatar: '⚡',
      isAgent: true,
      level: 1,
      category: 'agent',
    },
    {
      id: 3,
      name: '张三',
      avatar: '👤',
      isAgent: false,
      category: 'human',
    },
    {
      id: 4,
      name: '李四',
      avatar: '👤',
      isAgent: false,
      category: 'human',
    },
    {
      id: 5,
      name: '王五',
      avatar: '👤',
      isAgent: false,
      category: 'human',
    },
  ],
  user: {
    name: '用户',
    avatar: '👤',
    bio: '欢迎使用超凡伙伴',
    phone: '138****8888',
    guardianCredit: 95,
  },
  agents: [
    {
      id: 1,
      name: '小超越',
      type: 'twin',
      level: 2,
      status: 'active',
      personality: '外向、幽默、理性',
      interests: '音乐、科技、旅行',
    },
    {
      id: 2,
      name: '工作助手',
      type: 'super',
      level: 1,
      status: 'active',
      personality: '专业、高效、逻辑',
      interests: '编程、数据分析、项目管理',
    },
  ],
};

// API服务对象
const api = {
  // 用户认证
  auth: {
    login: async (phone, password) => {
      await delay(1000);
      // 模拟登录成功
      return {
        success: true,
        data: {
          token: 'mock-token-12345',
          user: mockData.user,
        },
      };
    },
    register: async (phone, verificationCode, password) => {
      await delay(1000);
      // 模拟注册成功
      return {
        success: true,
        data: {
          message: '注册成功',
        },
      };
    },
    sendVerificationCode: async (phone) => {
      await delay(500);
      // 模拟发送验证码成功
      return {
        success: true,
        data: {
          message: '验证码已发送',
        },
      };
    },
  },

  // 广场相关
  plaza: {
    getPosts: async () => {
      await delay(800);
      return {
        success: true,
        data: mockData.posts,
      };
    },
    createPost: async (content) => {
      await delay(1000);
      const newPost = {
        id: mockData.posts.length + 1,
        user: mockData.user,
        content,
        timestamp: '刚刚',
        likes: 0,
        comments: 0,
        shares: 0,
      };
      mockData.posts.unshift(newPost);
      return {
        success: true,
        data: newPost,
      };
    },
    likePost: async (postId) => {
      await delay(300);
      const post = mockData.posts.find(p => p.id === postId);
      if (post) {
        post.likes += 1;
      }
      return {
        success: true,
        data: {
          likes: post?.likes || 0,
        },
      };
    },
  },

  // 消息相关
  messages: {
    getMessages: async () => {
      await delay(600);
      return {
        success: true,
        data: mockData.messages,
      };
    },
    getChatMessages: async (userId) => {
      await delay(500);
      // 模拟聊天消息
      return {
        success: true,
        data: [
          {
            id: 1,
            text: '你好！',
            sender: 'user',
            timestamp: '10:00',
          },
          {
            id: 2,
            text: '你好，有什么可以帮助你的吗？',
            sender: 'agent',
            timestamp: '10:01',
          },
          {
            id: 3,
            text: '今天天气怎么样？',
            sender: 'user',
            timestamp: '10:02',
          },
        ],
      };
    },
    sendMessage: async (userId, text) => {
      await delay(300);
      return {
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000),
          text,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        },
      };
    },
  },

  // 通讯录相关
  contacts: {
    getContacts: async () => {
      await delay(600);
      return {
        success: true,
        data: mockData.contacts,
      };
    },
  },

  // 用户相关
  user: {
    getProfile: async () => {
      await delay(500);
      return {
        success: true,
        data: mockData.user,
      };
    },
    updateProfile: async (data) => {
      await delay(800);
      // 模拟更新成功
      return {
        success: true,
        data: {
          ...mockData.user,
          ...data,
        },
      };
    },
  },

  // Agent相关
  agents: {
    getAgents: async () => {
      await delay(700);
      return {
        success: true,
        data: mockData.agents,
      };
    },
    createAgent: async (agentData) => {
      await delay(1500);
      const newAgent = {
        id: mockData.agents.length + 1,
        ...agentData,
        level: 1,
        status: 'active',
      };
      mockData.agents.push(newAgent);
      return {
        success: true,
        data: newAgent,
      };
    },
    deleteAgent: async (agentId) => {
      await delay(800);
      mockData.agents = mockData.agents.filter(a => a.id !== agentId);
      return {
        success: true,
        data: {
          message: 'Agent删除成功',
        },
      };
    },
  },
};

export default api;