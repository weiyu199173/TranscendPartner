import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';

const MAX_CONTENT_LENGTH = 200;

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = async () => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await api.plaza.createPost(content);
      if (response.success) {
        Alert.alert('发布成功', '您的动态已发布');
        // 发布成功，导航回广场页面
        navigation.goBack();
      } else {
        Alert.alert('发布失败', '请稍后重试');
      }
    } catch (error) {
      console.error('发布失败:', error);
      Alert.alert('发布失败', '网络错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>取消</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>发布动态</Text>
        <TouchableOpacity 
          style={[styles.postButton, (!content.trim() || isLoading) && styles.postButtonDisabled]}
          onPress={handleCreatePost}
          disabled={!content.trim() || isLoading}
        >
          <Text style={[styles.postButtonText, (!content.trim() || isLoading) && styles.postButtonTextDisabled]}>
            {isLoading ? '发布中...' : '发布'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.userMeta}>
            <Text style={styles.userName}>用户</Text>
            <View style={styles.privacyContainer}>
              <Ionicons name="globe-outline" size={14} color="#71767b" />
              <Text style={styles.privacyText}>公开</Text>
            </View>
          </View>
        </View>

        <TextInput
          style={styles.contentInput}
          placeholder="分享你的想法..."
          placeholderTextColor="#71767b"
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={MAX_CONTENT_LENGTH}
        />

        <Text style={styles.charCount}>
          {content.length}/{MAX_CONTENT_LENGTH}
        </Text>

        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.toolButton}>
            <Ionicons name="image-outline" size={24} color="#1d9bf0" />
            <Text style={styles.toolButtonText}>图片</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton}>
            <Ionicons name="videocam-outline" size={24} color="#1d9bf0" />
            <Text style={styles.toolButtonText}>视频</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton}>
            <Ionicons name="map-outline" size={24} color="#1d9bf0" />
            <Text style={styles.toolButtonText}>位置</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton}>
            <Ionicons name="at-outline" size={24} color="#1d9bf0" />
            <Text style={styles.toolButtonText}>提及</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton}>
            <Ionicons name="hash-outline" size={24} color="#1d9bf0" />
            <Text style={styles.toolButtonText}>话题</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>发布提示</Text>
          <Text style={styles.tipText}>
            • 请遵守社区规范，文明发言
          </Text>
          <Text style={styles.tipText}>
            • 不要发布敏感内容
          </Text>
          <Text style={styles.tipText}>
            • 尊重他人，友善交流
          </Text>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#1d9bf0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  postButton: {
    padding: 8,
  },
  postButtonDisabled: {
    opacity: 0.6,
  },
  postButtonText: {
    fontSize: 16,
    color: '#1d9bf0',
    fontWeight: '600',
  },
  postButtonTextDisabled: {
    color: '#71767b',
  },
  scrollView: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  userMeta: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e7e9ea',
    marginBottom: 4,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  privacyText: {
    fontSize: 14,
    color: '#71767b',
    marginLeft: 4,
  },
  contentInput: {
    padding: 16,
    fontSize: 16,
    color: '#e7e9ea',
    minHeight: 200,
  },
  charCount: {
    fontSize: 14,
    color: '#71767b',
    textAlign: 'right',
    marginRight: 16,
    marginBottom: 16,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  toolButton: {
    alignItems: 'center',
  },
  toolButtonText: {
    fontSize: 12,
    color: '#71767b',
    marginTop: 4,
  },
  tipContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(29, 155, 240, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(29, 155, 240, 0.3)',
    borderRadius: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1d9bf0',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#71767b',
    marginBottom: 4,
  },
});