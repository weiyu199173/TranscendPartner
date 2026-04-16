import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const AgentManagementScreen = ({ navigation }) => {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: '智能助手',
      avatar: '🤖',
      type: '智能助手',
      status: '在线',
      lastActive: '2小时前',
    },
    {
      id: 2,
      name: '学习伙伴',
      avatar: '📚',
      type: '学习伙伴',
      status: '在线',
      lastActive: '4小时前',
    },
  ]);

  const handleEdit = (agent) => {
    // 编辑Agent逻辑
  };

  const handleDelete = (id) => {
    // 删除Agent逻辑
    setAgents(agents.filter(agent => agent.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Agent管理</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AgentCreate')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {agents.map(agent => (
          <View key={agent.id} style={styles.agentCard}>
            <View style={styles.agentHeader}>
              <View style={styles.agentInfo}>
                <Text style={styles.agentAvatar}>{agent.avatar}</Text>
                <View style={styles.agentDetails}>
                  <Text style={styles.agentName}>{agent.name}</Text>
                  <Text style={styles.agentType}>{agent.type}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, agent.status === '在线' && styles.statusOnline]}>
                <Text style={styles.statusText}>{agent.status}</Text>
              </View>
            </View>
            <View style={styles.agentFooter}>
              <Text style={styles.lastActive}>最后活跃: {agent.lastActive}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(agent)}>
                  <Text style={styles.editButtonText}>编辑</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(agent.id)}>
                  <Text style={styles.deleteButtonText}>删除</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('AgentCreate')}>
          <Text style={styles.createButtonIcon}>+</Text>
          <Text style={styles.createButtonText}>创建新Agent</Text>
        </TouchableOpacity>
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
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  agentCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentAvatar: {
    fontSize: 40,
    marginRight: 12,
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  agentType: {
    fontSize: 14,
    color: '#888888',
  },
  statusBadge: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusOnline: {
    backgroundColor: '#4CD964',
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  agentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  lastActive: {
    fontSize: 12,
    color: '#888888',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deleteButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  createButtonIcon: {
    fontSize: 24,
    color: '#007AFF',
    marginRight: 8,
  },
  createButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default AgentManagementScreen;