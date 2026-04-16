import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';

export default function SearchScreen({ navigation, route }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // all, plaza, messages, contacts

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);
      // 模拟搜索功能
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let results = [];
      
      if (activeTab === 'all' || activeTab === 'plaza') {
        const postsResponse = await api.plaza.getPosts();
        if (postsResponse.success) {
          const filteredPosts = postsResponse.data.filter(post => 
            post.content.includes(searchQuery) || 
            post.user.name.includes(searchQuery)
          );
          results = [...results, ...filteredPosts.map(post => ({ ...post, type: 'post' }))];
        }
      }

      if (activeTab === 'all' || activeTab === 'messages') {
        const messagesResponse = await api.messages.getMessages();
        if (messagesResponse.success) {
          const filteredMessages = messagesResponse.data.filter(message => 
            message.user.name.includes(searchQuery) || 
            message.lastMessage.includes(searchQuery)
          );
          results = [...results, ...filteredMessages.map(message => ({ ...message, type: 'message' }))];
        }
      }

      if (activeTab === 'all' || activeTab === 'contacts') {
        const contactsResponse = await api.contacts.getContacts();
        if (contactsResponse.success) {
          const filteredContacts = contactsResponse.data.filter(contact => 
            contact.name.includes(searchQuery)
          );
          results = [...results, ...filteredContacts.map(contact => ({ ...contact, type: 'contact' }))];
        }
      }

      setSearchResults(results);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemPress = (item) => {
    switch (item.type) {
      case 'message':
        navigation.navigate('Chat', { user: item.user });
        break;
      case 'contact':
        // 导航到联系人详情页面
        console.log('Contact detail:', item);
        break;
      case 'post':
        // 导航到帖子详情页面
        console.log('Post detail:', item);
        break;
      default:
        break;
    }
  };

  const renderSearchItem = ({ item }) => {
    switch (item.type) {
      case 'message':
        return (
          <TouchableOpacity style={styles.searchItem} onPress={() => handleItemPress(item)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.user.avatar}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.user.name}</Text>
              <Text style={styles.itemSubtitle} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      case 'contact':
        return (
          <TouchableOpacity style={styles.searchItem} onPress={() => handleItemPress(item)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.avatar}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              {item.isAgent && (
                <Text style={styles.agentInfo}>Agent Lv.{item.level}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      case 'post':
        return (
          <TouchableOpacity style={styles.searchItem} onPress={() => handleItemPress(item)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.user.avatar}</Text>
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.user.name}</Text>
              <Text style={styles.itemSubtitle} numberOfLines={2}>{item.content}</Text>
            </View>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#e7e9ea" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#71767b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索..."
            placeholderTextColor="#71767b"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#71767b" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.tabActive]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>全部</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'plaza' && styles.tabActive]}
          onPress={() => setActiveTab('plaza')}
        >
          <Text style={[styles.tabText, activeTab === 'plaza' && styles.tabTextActive]}>广场</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'messages' && styles.tabActive]}
          onPress={() => setActiveTab('messages')}
        >
          <Text style={[styles.tabText, activeTab === 'messages' && styles.tabTextActive]}>消息</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'contacts' && styles.tabActive]}
          onPress={() => setActiveTab('contacts')}
        >
          <Text style={[styles.tabText, activeTab === 'contacts' && styles.tabTextActive]}>通讯录</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1d9bf0" />
          <Text style={styles.loadingText}>搜索中...</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderSearchItem}
          keyExtractor={(item, index) => `${item.type}-${item.id || index}`}
          style={styles.resultsList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery ? '未找到相关内容' : '请输入搜索关键词'}
              </Text>
            </View>
          }
        />
      )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  backButton: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#e7e9ea',
    paddingVertical: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#1d9bf0',
  },
  tabText: {
    fontSize: 14,
    color: '#71767b',
  },
  tabTextActive: {
    color: '#1d9bf0',
    fontWeight: '600',
  },
  resultsList: {
    flex: 1,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e7e9ea',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#71767b',
  },
  agentInfo: {
    fontSize: 12,
    color: '#1d9bf0',
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