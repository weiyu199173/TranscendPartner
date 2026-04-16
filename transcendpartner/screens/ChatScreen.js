import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';

export default function ChatScreen({ route, navigation }) {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // 加载聊天记录
    loadMessages();
  }, []);

  useEffect(() => {
    // 自动滚动到底部
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const response = await api.messages.getChatMessages(user.id);
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('加载消息失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    setIsSending(true);
    try {
      const response = await api.messages.sendMessage(user.id, inputText);
      if (response.success) {
        const newMessage = response.data;
        setMessages(prev => [...prev, newMessage]);
        setInputText('');
        
        // 模拟回复
        setTimeout(() => {
          const replyMessage = {
            id: Math.floor(Math.random() * 1000),
            text: '这是一条自动回复消息',
            sender: 'agent',
            timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages(prev => [...prev, replyMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error('发送消息失败:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#e7e9ea" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{user.name}</Text>
          {user.isAgent && (
            <Text style={styles.headerSubtitle}>Agent Lv.{user.level}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="information-circle-outline" size={24} color="#71767b" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1d9bf0" />
          <Text style={styles.loadingText}>加载消息中...</Text>
        </View>
      ) : (
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
        >
          {messages.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>暂无消息</Text>
            </View>
          ) : (
            messages.map((message) => (
              <View 
                key={message.id} 
                style={[
                  styles.messageContainer,
                  message.sender === 'user' ? styles.userMessageContainer : styles.agentMessageContainer
                ]}
              >
                <View 
                  style={[
                    styles.messageBubble,
                    message.sender === 'user' ? styles.userMessageBubble : styles.agentMessageBubble
                  ]}
                >
                  <Text style={[
                    styles.messageText,
                    message.sender === 'user' ? styles.userMessageText : styles.agentMessageText
                  ]}>
                    {message.text}
                  </Text>
                </View>
                <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle-outline" size={24} color="#71767b" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="输入消息..."
          placeholderTextColor="#71767b"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity 
          style={[styles.sendButton, (!inputText.trim() || isSending) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || isSending}
        >
          {isSending ? (
            <ActivityIndicator size="small" color="#71767b" />
          ) : (
            <Ionicons name="send" size={20} color={inputText.trim() ? '#000' : '#71767b'} />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#1d9bf0',
    marginTop: 2,
  },
  headerButton: {
    padding: 8,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 16,
  },
  messageContainer: {
    marginVertical: 8,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  agentMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  userMessageBubble: {
    backgroundColor: '#1d9bf0',
    borderBottomRightRadius: 4,
  },
  agentMessageBubble: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#e7e9ea',
  },
  agentMessageText: {
    color: '#e7e9ea',
  },
  messageTimestamp: {
    fontSize: 11,
    color: '#71767b',
    marginTop: 4,
    marginHorizontal: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    backgroundColor: '#000',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#e7e9ea',
    marginHorizontal: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e7e9ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#71767b',
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#71767b',
  },
});