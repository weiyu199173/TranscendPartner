import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const handleAgentManagement = () => {
    navigation.navigate('AgentManagement');
  };

  const handleAgentCreate = () => {
    navigation.navigate('AgentCreate');
  };

  const handleGuardianConsole = () => {
    navigation.navigate('GuardianConsole');
  };

  const handleContentModeration = () => {
    navigation.navigate('ContentModeration');
  };

  const handleSettings = () => {
    // 导航到设置页面
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>个人中心</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.userSection}>
          <Text style={styles.avatar}>👤</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>用户</Text>
            <Text style={styles.userPhone}>138****8888</Text>
          </View>
        </View>

        <View style={styles.guardianSection}>
          <Text style={styles.sectionTitle}>Guardian 信用分</Text>
          <View style={styles.guardianScore}>
            <Text style={styles.scoreNumber}>85</Text>
            <Text style={styles.scoreLabel}>良好</Text>
          </View>
          <Text style={styles.scoreDescription}>您的Guardian信用分反映了您对智能Agent的管理能力和使用规范程度</Text>
        </View>

        <View style={styles.agentSection}>
          <Text style={styles.sectionTitle}>我的Agent</Text>
          <View style={styles.agentCards}>
            <TouchableOpacity style={styles.agentCard}>
              <Text style={styles.agentAvatar}>🤖</Text>
              <Text style={styles.agentName}>智能助手</Text>
              <Text style={styles.agentStatus}>在线</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.agentCard}>
              <Text style={styles.agentAvatar}>📚</Text>
              <Text style={styles.agentName}>学习伙伴</Text>
              <Text style={styles.agentStatus}>在线</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.agentCardAdd} onPress={handleAgentCreate}>
              <Text style={styles.agentAddIcon}>+</Text>
              <Text style={styles.agentAddText}>创建Agent</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={handleAgentManagement}>
            <Text style={styles.menuIcon}>🎛️</Text>
            <Text style={styles.menuText}>Agent管理</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleGuardianConsole}>
            <Text style={styles.menuIcon}>🛡️</Text>
            <Text style={styles.menuText}>Guardian控制台</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleContentModeration}>
            <Text style={styles.menuIcon}>🔍</Text>
            <Text style={styles.menuText}>内容审核</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuText}>设置</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>版本 1.0.0</Text>
        </View>
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
  content: {
    flex: 1,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  avatar: {
    fontSize: 60,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#888888',
  },
  guardianSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  guardianScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 12,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  scoreDescription: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
  },
  agentSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  agentCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  agentCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 10,
  },
  agentAvatar: {
    fontSize: 40,
    marginBottom: 8,
  },
  agentName: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  agentStatus: {
    fontSize: 12,
    color: '#4CD964',
  },
  agentCardAdd: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentAddIcon: {
    fontSize: 32,
    color: '#007AFF',
    marginBottom: 8,
  },
  agentAddText: {
    fontSize: 14,
    color: '#007AFF',
  },
  menuSection: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  menuArrow: {
    fontSize: 20,
    color: '#888888',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    color: '#888888',
  },
});

export default ProfileScreen;