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

const PlazaScreen = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: '张三',
      avatar: '👤',
      content: '今天和我的智能伙伴一起完成了一个重要项目，效率提升了50%！',
      time: '2小时前',
      likes: 128,
      comments: 32,
      liked: false,
    },
    {
      id: 2,
      user: '李四',
      avatar: '👩‍💼',
      content: '分享一下我的Agent配置心得，大家可以参考一下',
      time: '4小时前',
      likes: 89,
      comments: 15,
      liked: true,
    },
    {
      id: 3,
      user: '王五',
      avatar: '👨‍💻',
      content: '超凡伙伴的Guardian功能真的很强大，让我对AI的使用更加放心',
      time: '6小时前',
      likes: 203,
      comments: 45,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: '我',
        avatar: '🙋',
        content: newPost,
        time: '刚刚',
        likes: 0,
        comments: 0,
        liked: false,
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>广场</Text>
      </View>

      <View style={styles.createPost}>
        <View style={styles.createPostInput}>
          <TextInput
            style={styles.input}
            placeholder="分享你的想法..."
            placeholderTextColor="#888"
            value={newPost}
            onChangeText={setNewPost}
            multiline
          />
          <TouchableOpacity 
            style={[styles.postButton, !newPost.trim() && styles.postButtonDisabled]}
            onPress={handlePost}
            disabled={!newPost.trim()}
          >
            <Text style={styles.postButtonText}>发布</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.feed}>
        {posts.map(post => (
          <View key={post.id} style={styles.post}>
            <View style={styles.postHeader}>
              <Text style={styles.avatar}>{post.avatar}</Text>
              <View style={styles.postHeaderInfo}>
                <Text style={styles.userName}>{post.user}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handleLike(post.id)}
              >
                <Text style={[styles.actionIcon, post.liked && styles.likedIcon]}>
                  {post.liked ? '❤️' : '🤍'}
                </Text>
                <Text style={[styles.actionText, post.liked && styles.likedText]}>
                  {post.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>↗️</Text>
                <Text style={styles.actionText}>分享</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  createPost: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  createPostInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 10,
    minHeight: 40,
    maxHeight: 100,
  },
  postButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#333333',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  feed: {
    flex: 1,
  },
  post: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    fontSize: 32,
    marginRight: 12,
  },
  postHeaderInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  postTime: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  postContent: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  likedIcon: {
    color: '#FF3B30',
  },
  actionText: {
    fontSize: 14,
    color: '#888888',
  },
  likedText: {
    color: '#FF3B30',
  },
});

export default PlazaScreen;