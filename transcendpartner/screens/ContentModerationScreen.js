import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';

const ContentModerationScreen = ({ navigation }) => {
  const [sensitiveWords, setSensitiveWords] = useState(['敏感词1', '敏感词2', '敏感词3']);
  const [newWord, setNewWord] = useState('');
  const [contentList, setContentList] = useState([
    {
      id: 1,
      user: '张三',
      content: '这是一条正常的内容',
      status: '通过',
      time: '10分钟前',
    },
    {
      id: 2,
      user: '李四',
      content: '这是一条包含敏感词1的内容',
      status: '待审核',
      time: '20分钟前',
    },
    {
      id: 3,
      user: '王五',
      content: '这是另一条正常的内容',
      status: '通过',
      time: '30分钟前',
    },
  ]);

  const handleAddWord = () => {
    if (newWord.trim() && !sensitiveWords.includes(newWord)) {
      setSensitiveWords([...sensitiveWords, newWord]);
      setNewWord('');
    }
  };

  const handleRemoveWord = (word) => {
    setSensitiveWords(sensitiveWords.filter(w => w !== word));
  };

  const handleApproveContent = (id) => {
    setContentList(contentList.map(item => 
      item.id === id ? { ...item, status: '通过' } : item
    ));
  };

  const handleRejectContent = (id) => {
    setContentList(contentList.map(item => 
      item.id === id ? { ...item, status: '拒绝' } : item
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>内容审核</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>敏感词管理</Text>
          <View style={styles.addWordContainer}>
            <TextInput
              style={styles.input}
              placeholder="输入敏感词"
              placeholderTextColor="#888"
              value={newWord}
              onChangeText={setNewWord}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddWord}>
              <Text style={styles.addButtonText}>添加</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wordsList}>
            {sensitiveWords.map((word, index) => (
              <View key={index} style={styles.wordItem}>
                <Text style={styles.wordText}>{word}</Text>
                <TouchableOpacity onPress={() => handleRemoveWord(word)}>
                  <Text style={styles.removeButton}>删除</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>内容审核</Text>
          {contentList.map(item => (
            <View key={item.id} style={styles.contentItem}>
              <View style={styles.contentHeader}>
                <Text style={styles.contentUser}>{item.user}</Text>
                <Text style={[styles.contentStatus, item.status === '待审核' && styles.statusPending, item.status === '通过' && styles.statusApproved, item.status === '拒绝' && styles.statusRejected]}>
                  {item.status}
                </Text>
              </View>
              <Text style={styles.contentText}>{item.content}</Text>
              <Text style={styles.contentTime}>{item.time}</Text>
              {item.status === '待审核' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.approveButton} onPress={() => handleApproveContent(item.id)}>
                    <Text style={styles.approveButtonText}>通过</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rejectButton} onPress={() => handleRejectContent(item.id)}>
                    <Text style={styles.rejectButtonText}>拒绝</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  addWordContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  wordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  wordText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 8,
  },
  removeButton: {
    color: '#FF3B30',
    fontSize: 12,
  },
  contentItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contentStatus: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusPending: {
    backgroundColor: '#FF9500',
    color: '#FFFFFF',
  },
  statusApproved: {
    backgroundColor: '#4CD964',
    color: '#FFFFFF',
  },
  statusRejected: {
    backgroundColor: '#FF3B30',
    color: '#FFFFFF',
  },
  contentText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 8,
  },
  contentTime: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#4CD964',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  approveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default ContentModerationScreen;