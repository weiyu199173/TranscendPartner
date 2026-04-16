import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactsScreen({ navigation }) {
  // 模拟联系人数据
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: '小超越',
      avatar: '🧬',
      isAgent: true,
      level: 2,
      category: 'agent',
    },
    {
      id: 2,
      name: '工作助手',
      avatar: '⚡',
      isAgent: true,
      level: 1,
      category: 'agent',
    },
    {
      id: 3,
      name: '张三',
      avatar: '👤',
      isAgent: false,
      category: 'human',
    },
    {
      id: 4,
      name: '李四',
      avatar: '👤',
      isAgent: false,
      category: 'human',
    },
    {
      id: 5,
      name: '王五',
      avatar: '👤',
      isAgent: false,
      category: 'human',
    },
  ]);

  const [activeCategory, setActiveCategory] = useState('all'); // all, human, agent

  const filteredContacts = activeCategory === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.category === activeCategory);

  const handleContactPress = (contact) => {
    // 导航到联系人详情页面
    console.log('Contact:', contact.name);
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity style={styles.contactItem} onPress={() => handleContactPress(item)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.contactContent}>
        <Text style={styles.contactName}>{item.name}</Text>
        {item.isAgent && (
          <Text style={styles.agentInfo}>Agent Lv.{item.level}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.messageButton}>
        <Ionicons name="chatbubble-outline" size={20} color="#71767b" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>通讯录</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#1d9bf0" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryTabs}>
        <TouchableOpacity 
          style={[styles.categoryTab, activeCategory === 'all' && styles.categoryTabActive]}
          onPress={() => setActiveCategory('all')}
        >
          <Text style={[styles.categoryTabText, activeCategory === 'all' && styles.categoryTabTextActive]}>
            全部
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.categoryTab, activeCategory === 'human' && styles.categoryTabActive]}
          onPress={() => setActiveCategory('human')}
        >
          <Text style={[styles.categoryTabText, activeCategory === 'human' && styles.categoryTabTextActive]}>
            人类
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.categoryTab, activeCategory === 'agent' && styles.categoryTabActive]}
          onPress={() => setActiveCategory('agent')}
        >
          <Text style={[styles.categoryTabText, activeCategory === 'agent' && styles.categoryTabTextActive]}>
            Agent
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.contactList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>暂无联系人</Text>
          </View>
        }
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
  addButton: {
    padding: 8,
  },
  categoryTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  categoryTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  categoryTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#1d9bf0',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#71767b',
  },
  categoryTabTextActive: {
    color: '#1d9bf0',
    fontWeight: '600',
  },
  contactList: {
    flex: 1,
  },
  contactItem: {
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
  contactContent: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e7e9ea',
    marginBottom: 2,
  },
  agentInfo: {
    fontSize: 12,
    color: '#1d9bf0',
  },
  messageButton: {
    padding: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#1a1a1a',
    marginLeft: 78,
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