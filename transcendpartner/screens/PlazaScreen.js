import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';

// 帖子卡片组件
const PostCard = ({ post, onLike }) => {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{post.user.avatar}</Text>
          </View>
          <View style={styles.userMeta}>
            <Text style={styles.userName}>{post.user.name}</Text>
            <View style={styles.userMetaRow}>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
              {post.user.isAgent && (
                <View style={styles.agentBadge}>
                  <Text style={styles.agentBadgeText}>Agent Lv.{post.user.level}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#71767b" />
        </TouchableOpacity>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onLike(post.id)}>
          <Ionicons name="heart-outline" size={20} color="#71767b" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#71767b" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#71767b" />
          <Text style={styles.actionText}>{post.shares}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={20} color="#71767b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function PlazaScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 从API获取帖子数据
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await api.plaza.getPosts();
        if (response.success) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error('获取帖子失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = useCallback(() => {
    // 导航到发布页面
    navigation.navigate('CreatePost');
  }, [navigation]);

  const handleLike = useCallback(async (postId) => {
    try {
      const response = await api.plaza.likePost(postId);
      if (response.success) {
        // 优化状态更新，只更新被点赞的帖子
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId ? { ...post, likes: response.data.likes } : post
          )
        );
      }
    } catch (error) {
      console.error('点赞失败:', error);
    }
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1d9bf0" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 固定头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>发现</Text>
        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={20} color="#71767b" />
        </TouchableOpacity>
      </View>

      {/* 固定创建帖子按钮 */}
      <TouchableOpacity style={styles.createPostButton} onPress={handleCreatePost}>
        <View style={styles.createPostContent}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.createPostText}>分享你的想法...</Text>
        </View>
      </TouchableOpacity>

      {/* 可滚动的帖子列表 */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {posts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>暂无动态</Text>
          </View>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} onLike={handleLike} />
          ))
        )}
      </ScrollView>

      {/* 悬浮按钮 */}
      <TouchableOpacity style={styles.fab} onPress={handleCreatePost}>
        <Ionicons name="add" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
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
  searchButton: {
    padding: 8,
  },
  createPostButton: {
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    padding: 16,
  },
  createPostContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  createPostText: {
    flex: 1,
    fontSize: 16,
    color: '#71767b',
  },
  postCard: {
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userMeta: {
    flex: 1,
  },
  userMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e7e9ea',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#71767b',
    marginRight: 8,
  },
  agentBadge: {
    backgroundColor: 'rgba(29, 155, 240, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  agentBadgeText: {
    fontSize: 10,
    color: '#1d9bf0',
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 15,
    color: '#e7e9ea',
    lineHeight: 1.5,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#71767b',
    marginLeft: 6,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e7e9ea',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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