import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const ContactsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: '张三',
      avatar: '👤',
      type: 'human',
      status: '在线',
    },
    {
      id: 2,
      name: '李四',
      avatar: '👩‍💼',
      type: 'human',
      status: '离线',
    },
    {
      id: 3,
      name: '王五',
      avatar: '👨‍💻',
      type: 'human',
      status: '在线',
    },
    {
      id: 4,
      name: '智能助手',
      avatar: '🤖',
      type: 'agent',
      status: '在线',
    },
    {
      id: 5,
      name: '学习伙伴',
      avatar: '📚',
      type: 'agent',
      status: '在线',
    },
  ]);

  const filteredContacts = contacts.filter(contact => 
    activeTab === 'all' || contact.type === activeTab
  );

  const handleContactPress = (contact) => {
    // 导航到联系人详情或聊天页面
    navigation.navigate('Chat', { user: contact.name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>联系人</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            全部
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'human' && styles.activeTab]}
          onPress={() => setActiveTab('human')}
        >
          <Text style={[styles.tabText, activeTab === 'human' && styles.activeTabText]}>
            人类
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'agent' && styles.activeTab]}
          onPress={() => setActiveTab('agent')}
        >
          <Text style={[styles.tabText, activeTab === 'agent' && styles.activeTabText]}>
            智能
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contactList}>
        {filteredContacts.map(contact => (
          <TouchableOpacity 
            key={contact.id} 
            style={styles.contactItem}
            onPress={() => handleContactPress(contact)}
          >
            <Text style={styles.avatar}>{contact.avatar}</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactStatus}>{contact.status}</Text>
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    color: '#007AFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#888888',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  contactList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  avatar: {
    fontSize: 40,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  contactStatus: {
    fontSize: 14,
    color: '#888888',
  },
});

export default ContactsScreen;