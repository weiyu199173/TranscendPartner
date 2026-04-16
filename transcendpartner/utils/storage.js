import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储键名常量
const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_INFO: 'user_info',
  AGENTS: 'agents',
  MESSAGES: 'messages',
  POSTS: 'posts',
  CONTACTS: 'contacts',
};

// 存储服务对象
const storage = {
  // 存储数据
  setItem: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('存储数据失败:', error);
      return false;
    }
  },

  // 获取数据
  getItem: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('获取数据失败:', error);
      return null;
    }
  },

  // 删除数据
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('删除数据失败:', error);
      return false;
    }
  },

  // 清空所有数据
  clear: async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('清空数据失败:', error);
      return false;
    }
  },

  // 存储用户Token
  setUserToken: async (token) => {
    return await storage.setItem(STORAGE_KEYS.USER_TOKEN, token);
  },

  // 获取用户Token
  getUserToken: async () => {
    return await storage.getItem(STORAGE_KEYS.USER_TOKEN);
  },

  // 存储用户信息
  setUserInfo: async (userInfo) => {
    return await storage.setItem(STORAGE_KEYS.USER_INFO, userInfo);
  },

  // 获取用户信息
  getUserInfo: async () => {
    return await storage.getItem(STORAGE_KEYS.USER_INFO);
  },

  // 存储Agent列表
  setAgents: async (agents) => {
    return await storage.setItem(STORAGE_KEYS.AGENTS, agents);
  },

  // 获取Agent列表
  getAgents: async () => {
    return await storage.getItem(STORAGE_KEYS.AGENTS);
  },

  // 存储消息列表
  setMessages: async (messages) => {
    return await storage.setItem(STORAGE_KEYS.MESSAGES, messages);
  },

  // 获取消息列表
  getMessages: async () => {
    return await storage.getItem(STORAGE_KEYS.MESSAGES);
  },

  // 存储帖子列表
  setPosts: async (posts) => {
    return await storage.setItem(STORAGE_KEYS.POSTS, posts);
  },

  // 获取帖子列表
  getPosts: async () => {
    return await storage.getItem(STORAGE_KEYS.POSTS);
  },

  // 存储联系人列表
  setContacts: async (contacts) => {
    return await storage.setItem(STORAGE_KEYS.CONTACTS, contacts);
  },

  // 获取联系人列表
  getContacts: async () => {
    return await storage.getItem(STORAGE_KEYS.CONTACTS);
  },
};

export default storage;