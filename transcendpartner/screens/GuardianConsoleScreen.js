import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';

const GuardianConsoleScreen = ({ navigation }) => {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: '智能助手',
      avatar: '🤖',
      status: '在线',
      permissions: {
        chat: true,
        internet: true,
        location: false,
        camera: false,
      },
      recentActivity: '5分钟前发送了一条消息',
    },
    {
      id: 2,
      name: '学习伙伴',
      avatar: '📚',
      status: '在线',
      permissions: {
        chat: true,
        internet: true,
        location: false,
        camera: false,
      },
      recentActivity: '10分钟前查询了学习资料',
    },
  ]);

  const [emergencyStop, setEmergencyStop] = useState(false);

  const togglePermission = (agentId, permission) => {
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, permissions: { ...agent.permissions, [permission]: !agent.permissions[permission] } }
        : agent
    ));
  };

  const toggleEmergencyStop = () => {
    setEmergencyStop(!emergencyStop);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Guardian控制台</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.emergencySection}>
          <View style={styles.emergencyHeader}>
            <Text style={styles.emergencyTitle}>紧急停止</Text>
            <Switch
              value={emergencyStop}
              onValueChange={toggleEmergencyStop}
              trackColor={{ false: '#333333', true: '#FF3B30' }}
              thumbColor={emergencyStop ? '#FFFFFF' : '#888888'}
            />
          </View>
          <Text style={[styles.emergencyStatus, emergencyStop && styles.emergencyStatusActive]}>
            {emergencyStop ? '已启动紧急停止' : '未启动'}
          </Text>
          <Text style={styles.emergencyDescription}>
            启动紧急停止将立即暂停所有Agent的活动
          </Text>
        </View>

        {agents.map(agent => (
          <View key={agent.id} style={styles.agentSection}>
            <View style={styles.agentHeader}>
              <View style={styles.agentInfo}>
                <Text style={styles.agentAvatar}>{agent.avatar}</Text>
                <View style={styles.agentDetails}>
                  <Text style={styles.agentName}>{agent.name}</Text>
                  <Text style={styles.agentStatus}>{agent.status}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>权限管理</Text>
            <View style={styles.permissionList}>
              <View style={styles.permissionItem}>
                <Text style={styles.permissionLabel}>聊天功能</Text>
                <Switch
                  value={agent.permissions.chat}
                  onValueChange={() => togglePermission(agent.id, 'chat')}
                  trackColor={{ false: '#333333', true: '#007AFF' }}
                  thumbColor={agent.permissions.chat ? '#FFFFFF' : '#888888'}
                />
              </View>
              <View style={styles.permissionItem}>
                <Text style={styles.permissionLabel}>网络访问</Text>
                <Switch
                  value={agent.permissions.internet}
                  onValueChange={() => togglePermission(agent.id, 'internet')}
                  trackColor={{ false: '#333333', true: '#007AFF' }}
                  thumbColor={agent.permissions.internet ? '#FFFFFF' : '#888888'}
                />
              </View>
              <View style={styles.permissionItem}>
                <Text style={styles.permissionLabel}>位置访问</Text>
                <Switch
                  value={agent.permissions.location}
                  onValueChange={() => togglePermission(agent.id, 'location')}
                  trackColor={{ false: '#333333', true: '#007AFF' }}
                  thumbColor={agent.permissions.location ? '#FFFFFF' : '#888888'}
                />
              </View>
              <View style={styles.permissionItem}>
                <Text style={styles.permissionLabel}>相机访问</Text>
                <Switch
                  value={agent.permissions.camera}
                  onValueChange={() => togglePermission(agent.id, 'camera')}
                  trackColor={{ false: '#333333', true: '#007AFF' }}
                  thumbColor={agent.permissions.camera ? '#FFFFFF' : '#888888'}
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>最近活动</Text>
            <Text style={styles.activityText}>{agent.recentActivity}</Text>
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
  emergencySection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  emergencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emergencyStatus: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  emergencyStatusActive: {
    color: '#FF3B30',
  },
  emergencyDescription: {
    fontSize: 12,
    color: '#888888',
  },
  agentSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  agentStatus: {
    fontSize: 14,
    color: '#888888',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  permissionList: {
    marginBottom: 16,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  permissionLabel: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  activityText: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
  },
});

export default GuardianConsoleScreen;