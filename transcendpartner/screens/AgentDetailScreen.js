import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';

export default function AgentDetailScreen({ route, navigation }) {
  const { agentId } = route.params;
  const [agent, setAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(true);

  // 获取Agent详情
  useEffect(() => {
    const fetchAgentDetail = async () => {
      try {
        setIsLoading(true);
        const response = await api.agents.getAgents();
        if (response.success) {
          const foundAgent = response.data.find(a => a.id === agentId);
          if (foundAgent) {
            setAgent(foundAgent);
            setIsActive(foundAgent.status === 'active');
          }
        }
      } catch (error) {
        console.error('获取Agent详情失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgentDetail();
  }, [agentId]);

  const handleToggleStatus = () => {
    setIsActive(!isActive);
    // 这里可以调用API更新Agent状态
  };

  const handleEditAgent = () => {
    // 导航到Agent编辑页面
    console.log('Edit agent:', agentId);
  };

  const handleDeleteAgent = () => {
    // 导航到Agent删除确认页面
    console.log('Delete agent:', agentId);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1d9bf0" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  if (!agent) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Agent不存在</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#e7e9ea" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agent详情</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleEditAgent}>
            <Ionicons name="create-outline" size={24} color="#1d9bf0" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.agentCard}>
          <View style={styles.agentHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {agent.type === 'twin' ? '🧬' : '⚡'}
              </Text>
            </View>
            <View style={styles.agentInfo}>
              <Text style={styles.agentName}>{agent.name}</Text>
              <View style={styles.agentMeta}>
                <Text style={styles.agentType}>
                  {agent.type === 'twin' ? '孪生伙伴' : '超级伙伴'}
                </Text>
                <Text style={styles.agentLevel}>Lv.{agent.level}</Text>
              </View>
              <View style={[styles.statusBadge, isActive ? styles.statusActive : styles.statusInactive]}>
                <Text style={styles.statusText}>
                  {isActive ? '活跃' : '休眠'}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.statusToggle, isActive ? styles.statusToggleActive : styles.statusToggleInactive]}
            onPress={handleToggleStatus}
          >
            <Text style={styles.statusToggleText}>
              {isActive ? '点击休眠' : '点击激活'}
            </Text>
          </TouchableOpacity>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>基本信息</Text>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>性格特质</Text>
              <Text style={styles.detailValue}>{agent.personality}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>兴趣爱好</Text>
              <Text style={styles.detailValue}>{agent.interests}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>创建时间</Text>
              <Text style={styles.detailValue}>2026-04-16</Text>
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>能力设置</Text>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>语言模型配置</Text>
              <Ionicons name="chevron-forward" size={20} color="#71767b" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>外部载体接入</Text>
              <Ionicons name="chevron-forward" size={20} color="#71767b" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>权限管理</Text>
              <Ionicons name="chevron-forward" size={20} color="#71767b" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>行为记录</Text>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>聊天记录</Text>
              <Ionicons name="chevron-forward" size={20} color="#71767b" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>发布动态</Text>
              <Ionicons name="chevron-forward" size={20} color="#71767b" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>信用评分</Text>
              <Ionicons name="chevron-forward" size={20} color="#71767b" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDeleteAgent}
          >
            <Text style={styles.deleteButtonText}>删除Agent</Text>
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#71767b',
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
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  agentCard: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 12,
    margin: 16,
    padding: 20,
  },
  agentHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 40,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 8,
  },
  agentMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  agentType: {
    fontSize: 14,
    color: '#71767b',
    marginRight: 12,
  },
  agentLevel: {
    fontSize: 14,
    color: '#1d9bf0',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusActive: {
    backgroundColor: 'rgba(0, 186, 124, 0.2)',
  },
  statusInactive: {
    backgroundColor: 'rgba(113, 118, 123, 0.2)',
  },
  statusText: {
    fontSize: 12,
    color: '#00ba7c',
  },
  statusToggle: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  statusToggleActive: {
    backgroundColor: 'rgba(0, 186, 124, 0.2)',
  },
  statusToggleInactive: {
    backgroundColor: 'rgba(113, 118, 123, 0.2)',
  },
  statusToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  detailSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  detailLabel: {
    fontSize: 14,
    color: '#71767b',
  },
  detailValue: {
    fontSize: 14,
    color: '#e7e9ea',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  settingText: {
    fontSize: 15,
    color: '#e7e9ea',
  },
  deleteButton: {
    backgroundColor: 'rgba(244, 33, 46, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(244, 33, 46, 0.4)',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#f4212e',
    fontWeight: '600',
  },
});