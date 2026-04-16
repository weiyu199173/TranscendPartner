import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const MessagesScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: '张三',
      avatar: '👤',
      lastMessage: '今天的会议你参加了吗？',
      time: '10:30',
      unread: 2,
    },
    {
      id: 2,
      user: '李四',
      avatar: '👩‍💼',
      lastMessage: 'Agent配置的文档已经发给你了',
      time: '昨天',
      unread: 0,
    },
    {
      id: 3,
      user: '王五',
      avatar: '👨‍💻',
      lastMessage: 'Guardian功能真的很强大',
      time: '前天',
      unread: 1,
    },
    {
      id: 4,
      user: '智能助手',
      avatar: '🤖',
      lastMessage: '我已经完成了任务',
      time: '3天前',
      unread: 0,
    },
  ]);

  const handleMessagePress = (message) => {
    // 导航到聊天页面
    navigation.navigate('Chat', { user: message.user });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>消息</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>编辑</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messageList}>
        {messages.map(message => (
          <TouchableOpacity 
            key={message.id} 
            style={styles.messageItem}
            onPress={() => handleMessagePress(message)}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{message.avatar}</Text>
              {message.unread > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{message.unread}</Text>
                </View>
              )}
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.userName}>{message.user}</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
              <Text style={[styles.lastMessage, message.unread > 0 && styles.unreadMessage]}>
                {message.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  messageList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 40,
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
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
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 12,
    color: '#888888',
  },
  lastMessage: {
    fontSize: 14,
    color: '#888888',
  },
  unreadMessage: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default MessagesScreen;