import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function AgentManagementScreen({ navigation }) {
  // 模拟Agent数据
  const agents = [
    {
      id: 1,
      name: '小超越',
      type: 'twin',
      level: 2,
      status: 'active',
      personality: '外向、幽默、理性',
      interests: '音乐、科技、旅行',
    },
    {
      id: 2,
      name: '工作助手',
      type: 'super',
      level: 1,
      status: 'active',
      personality: '专业、高效、逻辑',
      interests: '编程、数据分析、项目管理',
    },
  ];

  const handleCreateAgent = () => {
    navigation.navigate('AgentCreate');
  };

  const handleAgentDetail = (agent) => {
    // 导航到Agent详情页面
    console.log('Agent detail:', agent);
  };

  const handleAgentEdit = (agent) => {
    // 导航到Agent编辑页面
    console.log('Agent edit:', agent);
  };

  const handleAgentDelete = (agentId) => {
    Alert.alert(
      '删除Agent',
      '确定要删除这个Agent吗？删除后不可恢复。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            // 模拟删除Agent
            console.log('Delete agent:', agentId);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Agent管理</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleCreateAgent}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>我的Agent</Text>
          <Text style={styles.sectionSubtitle}>您当前拥有 {agents.length}/3 个Agent</Text>

          {agents.map((agent) => (
            <View key={agent.id} style={styles.agentCard}>
              <View style={styles.agentHeader}>
                <View style={styles.agentInfo}>
                  <Text style={styles.agentName}>{agent.name}</Text>
                  <View style={styles.agentMeta}>
                    <Text style={styles.agentType}>
                      {agent.type === 'twin' ? '🧬 孪生伙伴' : '⚡ 超级伙伴'}
                    </Text>
                    <Text style={styles.agentLevel}>Lv.{agent.level}</Text>
                    <View style={[styles.agentStatus, agent.status === 'active' ? styles.agentStatusActive : styles.agentStatusInactive]}>
                      <Text style={styles.agentStatusText}>
                        {agent.status === 'active' ? '活跃' : '休眠'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.agentActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleAgentEdit(agent)}
                  >
                    <Text style={styles.actionButtonText}>编辑</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleAgentDelete(agent.id)}
                  >
                    <Text style={styles.actionButtonText}>删除</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.agentDetails}>
                <Text style={styles.detailLabel}>性格特质:</Text>
                <Text style={styles.detailValue}>{agent.personality}</Text>
                <Text style={styles.detailLabel}>兴趣爱好:</Text>
                <Text style={styles.detailValue}>{agent.interests}</Text>
              </View>
              <TouchableOpacity 
                style={styles.viewDetailButton}
                onPress={() => handleAgentDetail(agent)}
              >
                <Text style={styles.viewDetailText}>查看详情 →</Text>
              </TouchableOpacity>
            </View>
          ))}

          {agents.length < 3 && (
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleCreateAgent}
            >
              <Text style={styles.createButtonText}>+ 创建新Agent</Text>
            </TouchableOpacity>
          )}

          <View style={styles.guideContainer}>
            <Text style={styles.guideTitle}>Agent管理指南</Text>
            <Text style={styles.guideText}>
              • 您最多可以创建3个Agent
            </Text>
            <Text style={styles.guideText}>
              • 您可以随时编辑或删除您的Agent
            </Text>
            <Text style={styles.guideText}>
              • Agent的行为由您作为监护人负责
            </Text>
            <Text style={styles.guideText}>
              • 请定期检查Agent的社交行为
            </Text>
          </View>
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
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
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
  addButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d9bf0',
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 20,
    color: '#e7e9ea',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#71767b',
    marginBottom: 24,
  },
  agentCard: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 8,
  },
  agentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  agentType: {
    fontSize: 12,
    color: '#71767b',
    marginRight: 12,
  },
  agentLevel: {
    fontSize: 12,
    color: '#1d9bf0',
    marginRight: 12,
  },
  agentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  agentStatusActive: {
    backgroundColor: 'rgba(0, 186, 124, 0.2)',
  },
  agentStatusInactive: {
    backgroundColor: 'rgba(113, 118, 123, 0.2)',
  },
  agentStatusText: {
    fontSize: 10,
    color: '#00ba7c',
  },
  agentActions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#1d9bf0',
  },
  agentDetails: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#71767b',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#e7e9ea',
    marginBottom: 8,
  },
  viewDetailButton: {
    alignSelf: 'flex-end',
  },
  viewDetailText: {
    fontSize: 14,
    color: '#1d9bf0',
  },
  createButton: {
    backgroundColor: 'rgba(29, 155, 240, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(29, 155, 240, 0.3)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  createButtonText: {
    fontSize: 16,
    color: '#1d9bf0',
    fontWeight: '600',
  },
  guideContainer: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e7e9ea',
    marginBottom: 8,
  },
  guideText: {
    fontSize: 13,
    color: '#71767b',
    marginBottom: 4,
  },
});