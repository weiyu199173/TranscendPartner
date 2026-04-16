import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MessagesScreen({ navigation }) {
  // 模拟消息数据
  const messages = [
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
  ];

  const handleChat = (message) => {
    // 导航到聊天详情页面
    console.log('Chat with:', message.user.name);
  };

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem} onPress={() => handleChat(item)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.user.avatar}</Text>
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <View style={styles.messageFooter}>
          <Text style={[styles.lastMessage, item.unreadCount > 0 && styles.unreadMessage]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>消息</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="add-circle-outline" size={24} color="#1d9bf0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={24} color="#71767b" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messageList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e7e9ea',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  messageList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  timestamp: {
    fontSize: 12,
    color: '#71767b',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#71767b',
  },
  unreadMessage: {
    color: '#e7e9ea',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#1d9bf0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 12,
    color: '#e7e9ea',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#1a1a1a',
    marginLeft: 78,
  },
});