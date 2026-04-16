import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContentModerationScreen({ navigation }) {
  // 模拟待审核内容
  const [pendingContent, setPendingContent] = useState([
    {
      id: 1,
      type: 'post',
      user: '张三',
      agent: '小超越',
      content: '今天天气真好，出去散步吧！',
      timestamp: '10分钟前',
      image: null,
    },
    {
      id: 2,
      type: 'post',
      user: '李四',
      agent: '工作助手',
      content: '分享一个有趣的故事...',
      timestamp: '30分钟前',
      image: 'https://example.com/image.jpg',
    },
    {
      id: 3,
      type: 'comment',
      user: '王五',
      agent: '小超越',
      content: '这个想法很棒！',
      timestamp: '1小时前',
      image: null,
    },
  ]);

  // 模拟敏感词列表
  const [sensitiveWords, setSensitiveWords] = useState([
    '敏感词1',
    '敏感词2',
    '敏感词3',
  ]);

  const [newSensitiveWord, setNewSensitiveWord] = useState('');

  const handleApproveContent = (contentId) => {
    setPendingContent(pendingContent.filter(item => item.id !== contentId));
    Alert.alert('成功', '内容已批准');
  };

  const handleRejectContent = (contentId) => {
    setPendingContent(pendingContent.filter(item => item.id !== contentId));
    Alert.alert('成功', '内容已拒绝');
  };

  const handleAddSensitiveWord = () => {
    if (newSensitiveWord.trim()) {
      setSensitiveWords([...sensitiveWords, newSensitiveWord.trim()]);
      setNewSensitiveWord('');
      Alert.alert('成功', '敏感词已添加');
    }
  };

  const handleRemoveSensitiveWord = (word) => {
    setSensitiveWords(sensitiveWords.filter(w => w !== word));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>内容安全审核</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 待审核内容 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>待审核内容</Text>
          {pendingContent.length > 0 ? (
            pendingContent.map((item) => (
              <View key={item.id} style={styles.contentItem}>
                <View style={styles.contentHeader}>
                  <View>
                    <Text style={styles.contentUser}>{item.user}</Text>
                    <Text style={styles.contentAgent}>Agent: {item.agent}</Text>
                  </View>
                  <Text style={styles.contentTimestamp}>{item.timestamp}</Text>
                </View>
                <Text style={styles.contentText}>{item.content}</Text>
                {item.image && (
                  <View style={styles.contentImage}>
                    <Text style={styles.imagePlaceholder}>图片预览</Text>
                  </View>
                )}
                <View style={styles.contentActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.approveButton]}
                    onPress={() => handleApproveContent(item.id)}
                  >
                    <Ionicons name="checkmark" size={16} color="#00ba7c" />
                    <Text style={styles.approveButtonText}>批准</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleRejectContent(item.id)}
                  >
                    <Ionicons name="close" size={16} color="#f4212e" />
                    <Text style={styles.rejectButtonText}>拒绝</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>暂无待审核内容</Text>
          )}
        </View>

        {/* 敏感词管理 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>敏感词管理</Text>
          <View style={styles.sensitiveWordInputContainer}>
            <TextInput
              style={styles.sensitiveWordInput}
              placeholder="添加敏感词"
              placeholderTextColor="#71767b"
              value={newSensitiveWord}
              onChangeText={setNewSensitiveWord}
            />
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddSensitiveWord}
            >
              <Ionicons name="add" size={24} color="#1d9bf0" />
            </TouchableOpacity>
          </View>
          <View style={styles.sensitiveWordsList}>
            {sensitiveWords.map((word, index) => (
              <View key={index} style={styles.sensitiveWordItem}>
                <Text style={styles.sensitiveWordText}>{word}</Text>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => handleRemoveSensitiveWord(word)}
                >
                  <Ionicons name="close-circle" size={20} color="#f4212e" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* 审核设置 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>审核设置</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>自动审核阈值</Text>
            <Text style={styles.settingValue}>中等</Text>
            <Ionicons name="chevron-forward" size={20} color="#71767b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>图片审核</Text>
            <Text style={styles.settingValue}>启用</Text>
            <Ionicons name="chevron-forward" size={20} color="#71767b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>视频审核</Text>
            <Text style={styles.settingValue}>启用</Text>
            <Ionicons name="chevron-forward" size={20} color="#71767b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>批量审核</Text>
            <Text style={styles.settingValue}>启用</Text>
            <Ionicons name="chevron-forward" size={20} color="#71767b" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#e7e9ea',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 16,
  },
  contentItem: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  contentUser: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  contentAgent: {
    fontSize: 12,
    color: '#71767b',
    marginTop: 2,
  },
  contentTimestamp: {
    fontSize: 12,
    color: '#71767b',
  },
  contentText: {
    fontSize: 14,
    color: '#e7e9ea',
    marginBottom: 12,
  },
  contentImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  imagePlaceholder: {
    fontSize: 12,
    color: '#71767b',
  },
  contentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  approveButton: {
    backgroundColor: 'rgba(0, 186, 124, 0.2)',
  },
  approveButtonText: {
    fontSize: 14,
    color: '#00ba7c',
    marginLeft: 4,
  },
  rejectButton: {
    backgroundColor: 'rgba(244, 33, 46, 0.2)',
  },
  rejectButtonText: {
    fontSize: 14,
    color: '#f4212e',
    marginLeft: 4,
  },
  sensitiveWordInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sensitiveWordInput: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#e7e9ea',
    marginRight: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(29, 155, 240, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sensitiveWordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sensitiveWordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 33, 46, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 33, 46, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  sensitiveWordText: {
    fontSize: 14,
    color: '#f4212e',
    marginRight: 4,
  },
  removeButton: {
    padding: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  settingLabel: {
    fontSize: 15,
    color: '#e7e9ea',
  },
  settingValue: {
    fontSize: 14,
    color: '#71767b',
    marginRight: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#71767b',
    textAlign: 'center',
    paddingVertical: 20,
  },
});