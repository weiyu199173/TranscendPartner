import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  // 模拟用户数据
  const user = {
    name: '用户',
    avatar: '👤',
    bio: '欢迎使用超凡伙伴',
    phone: '138****8888',
    guardianCredit: 95,
  };

  // 模拟孪生伙伴数据
  const twinAgent = {
    name: '小超越',
    avatar: '🧬',
    level: 2,
    credit: 85,
    personality: '外向、幽默、理性',
    interests: '音乐、科技、旅行',
  };

  // 模拟超级伙伴数据
  const superAgent = {
    name: '工作助手',
    avatar: '⚡',
    level: 1,
    credit: 75,
    personality: '专业、高效、逻辑',
    interests: '编程、数据分析、项目管理',
  };

  const handleEditProfile = () => {
    // 导航到编辑个人资料页面
    navigation.navigate('EditProfile');
  };

  const handleAgentManagement = () => {
    // 导航到Agent管理页面
    navigation.navigate('AgentManagement');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>个人主页</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>编辑</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 用户信息卡片 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>用户信息</Text>
            <TouchableOpacity style={styles.cardAction}>
              <Ionicons name="create-outline" size={20} color="#1d9bf0" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.avatar}</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userBio}>{user.bio}</Text>
              <Text style={styles.userPhone}>{user.phone}</Text>
            </View>
          </View>
          <View style={styles.creditInfo}>
            <Text style={styles.creditLabel}>监护人信用分</Text>
            <View style={styles.creditBar}>
              <View style={[styles.creditFill, { width: `${user.guardianCredit}%` }]} />
            </View>
            <Text style={styles.creditValue}>{user.guardianCredit}/100</Text>
          </View>
        </View>

        {/* 孪生伙伴卡片 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>🧬 孪生伙伴</Text>
            <TouchableOpacity style={styles.cardAction}>
              <Ionicons name="chevron-forward" size={20} color="#71767b" />
            </TouchableOpacity>
          </View>
          <View style={styles.agentInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{twinAgent.avatar}</Text>
            </View>
            <View style={styles.agentDetails}>
              <Text style={styles.agentName}>{twinAgent.name}</Text>
              <View style={styles.agentMeta}>
                <Text style={styles.agentLevel}>Lv.{twinAgent.level}</Text>
                <Text style={styles.agentCredit}>信用分: {twinAgent.credit}</Text>
              </View>
              <Text style={styles.agentPersonality}>性格: {twinAgent.personality}</Text>
              <Text style={styles.agentInterests}>兴趣: {twinAgent.interests}</Text>
            </View>
          </View>
        </View>

        {/* 超级伙伴卡片 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>⚡ 超级伙伴</Text>
            <TouchableOpacity style={styles.cardAction}>
              <Ionicons name="chevron-forward" size={20} color="#71767b" />
            </TouchableOpacity>
          </View>
          <View style={styles.agentInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{superAgent.avatar}</Text>
            </View>
            <View style={styles.agentDetails}>
              <Text style={styles.agentName}>{superAgent.name}</Text>
              <View style={styles.agentMeta}>
                <Text style={styles.agentLevel}>Lv.{superAgent.level}</Text>
                <Text style={styles.agentCredit}>信用分: {superAgent.credit}</Text>
              </View>
              <Text style={styles.agentPersonality}>性格: {superAgent.personality}</Text>
              <Text style={styles.agentInterests}>兴趣: {superAgent.interests}</Text>
            </View>
          </View>
        </View>

        {/* 功能按钮 */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAgentManagement}>
            <Ionicons name="people-outline" size={20} color="#e7e9ea" />
            <Text style={styles.actionButtonText}>Agent管理</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('GuardianConsole')}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#e7e9ea" />
            <Text style={styles.actionButtonText}>监护人控制台</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ContentModeration')}>
            <Ionicons name="flag-outline" size={20} color="#e7e9ea" />
            <Text style={styles.actionButtonText}>内容安全审核</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={20} color="#e7e9ea" />
            <Text style={styles.actionButtonText}>设置</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={20} color="#e7e9ea" />
            <Text style={styles.actionButtonText}>帮助与反馈</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="log-out-outline" size={20} color="#e7e9ea" />
            <Text style={styles.actionButtonText}>退出登录</Text>
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
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    fontSize: 14,
    color: '#1d9bf0',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e7e9ea',
  },
  cardAction: {
    padding: 4,
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 4,
  },
  userBio: {
    fontSize: 14,
    color: '#71767b',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#71767b',
  },
  creditInfo: {
    marginTop: 8,
  },
  creditLabel: {
    fontSize: 14,
    color: '#71767b',
    marginBottom: 8,
  },
  creditBar: {
    height: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  creditFill: {
    height: '100%',
    backgroundColor: '#1d9bf0',
  },
  creditValue: {
    fontSize: 12,
    color: '#1d9bf0',
    textAlign: 'right',
  },
  agentInfo: {
    flexDirection: 'row',
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 4,
  },
  agentMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  agentLevel: {
    fontSize: 12,
    color: '#1d9bf0',
    marginRight: 12,
  },
  agentCredit: {
    fontSize: 12,
    color: '#71767b',
  },
  agentPersonality: {
    fontSize: 14,
    color: '#71767b',
    marginBottom: 4,
  },
  agentInterests: {
    fontSize: 14,
    color: '#71767b',
  },
  actionButtons: {
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  actionButtonText: {
    fontSize: 15,
    color: '#e7e9ea',
    marginLeft: 12,
  },
});