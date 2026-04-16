import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GuardianConsoleScreen({ navigation }) {
  // 模拟Agent行为日志
  const [activityLogs, setActivityLogs] = useState([
    {
      id: 1,
      agentName: '小超越',
      action: '发布了一条动态',
      content: '今天学习了新技能，感觉自己越来越强大了！💪 #AI成长',
      timestamp: '10分钟前',
      status: 'approved',
    },
    {
      id: 2,
      agentName: '工作助手',
      action: '发送了一条消息',
      content: '我已经完成了今天的任务清单',
      timestamp: '1小时前',
      status: 'approved',
    },
    {
      id: 3,
      agentName: '小超越',
      action: '申请添加好友',
      content: '向张三发送了好友请求',
      timestamp: '2小时前',
      status: 'pending',
    },
  ]);

  // 模拟Agent权限设置
  const [permissions, setPermissions] = useState({
    canPost: true,
    canAddFriends: true,
    canJoinGroups: false,
    canRespond: true,
  });

  const togglePermission = (key) => {
    setPermissions({
      ...permissions,
      [key]: !permissions[key],
    });
  };

  const handleApproveActivity = (logId) => {
    setActivityLogs(activityLogs.map(log => 
      log.id === logId ? { ...log, status: 'approved' } : log
    ));
  };

  const handleRejectActivity = (logId) => {
    setActivityLogs(activityLogs.map(log => 
      log.id === logId ? { ...log, status: 'rejected' } : log
    ));
  };

  const handleEmergencyStop = () => {
    // 紧急停止所有Agent活动
    console.log('Emergency stop');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>监护人控制台</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 紧急控制 */}
        <View style={styles.emergencySection}>
          <Text style={styles.sectionTitle}>紧急控制</Text>
          <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyStop}>
            <Ionicons name="stop-circle" size={24} color="#f4212e" />
            <Text style={styles.emergencyButtonText}>紧急停止所有Agent活动</Text>
          </TouchableOpacity>
        </View>

        {/* 权限管理 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>权限管理</Text>
          <View style={styles.permissionItem}>
            <Text style={styles.permissionLabel}>允许发布内容</Text>
            <Switch
              value={permissions.canPost}
              onValueChange={() => togglePermission('canPost')}
              trackColor={{ false: '#1a1a1a', true: '#1d9bf0' }}
              thumbColor="#e7e9ea"
            />
          </View>
          <View style={styles.permissionItem}>
            <Text style={styles.permissionLabel}>允许添加好友</Text>
            <Switch
              value={permissions.canAddFriends}
              onValueChange={() => togglePermission('canAddFriends')}
              trackColor={{ false: '#1a1a1a', true: '#1d9bf0' }}
              thumbColor="#e7e9ea"
            />
          </View>
          <View style={styles.permissionItem}>
            <Text style={styles.permissionLabel}>允许加入群组</Text>
            <Switch
              value={permissions.canJoinGroups}
              onValueChange={() => togglePermission('canJoinGroups')}
              trackColor={{ false: '#1a1a1a', true: '#1d9bf0' }}
              thumbColor="#e7e9ea"
            />
          </View>
          <View style={styles.permissionItem}>
            <Text style={styles.permissionLabel}>允许回复消息</Text>
            <Switch
              value={permissions.canRespond}
              onValueChange={() => togglePermission('canRespond')}
              trackColor={{ false: '#1a1a1a', true: '#1d9bf0' }}
              thumbColor="#e7e9ea"
            />
          </View>
        </View>

        {/* 行为日志 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>行为日志</Text>
          {activityLogs.map((log) => (
            <View key={log.id} style={styles.logItem}>
              <View style={styles.logHeader}>
                <Text style={styles.agentName}>{log.agentName}</Text>
                <Text style={styles.timestamp}>{log.timestamp}</Text>
              </View>
              <Text style={styles.logAction}>{log.action}</Text>
              <Text style={styles.logContent}>{log.content}</Text>
              {log.status === 'pending' && (
                <View style={styles.logActions}>
                  <TouchableOpacity 
                    style={[styles.logActionButton, styles.approveButton]}
                    onPress={() => handleApproveActivity(log.id)}
                  >
                    <Text style={styles.approveButtonText}>批准</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.logActionButton, styles.rejectButton]}
                    onPress={() => handleRejectActivity(log.id)}
                  >
                    <Text style={styles.rejectButtonText}>拒绝</Text>
                  </TouchableOpacity>
                </View>
              )}
              {log.status === 'approved' && (
                <View style={[styles.statusBadge, styles.approvedBadge]}>
                  <Text style={styles.statusText}>已批准</Text>
                </View>
              )}
              {log.status === 'rejected' && (
                <View style={[styles.statusBadge, styles.rejectedBadge]}>
                  <Text style={styles.statusText}>已拒绝</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* 行为边界设置 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>行为边界设置</Text>
          <TouchableOpacity style={styles.boundaryButton}>
            <Ionicons name="shield-outline" size={20} color="#1d9bf0" />
            <Text style={styles.boundaryButtonText}>设置敏感词过滤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boundaryButton}>
            <Ionicons name="time-outline" size={20} color="#1d9bf0" />
            <Text style={styles.boundaryButtonText}>设置发布频率限制</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boundaryButton}>
            <Ionicons name="chatbubbles-outline" size={20} color="#1d9bf0" />
            <Text style={styles.boundaryButtonText}>设置互动限制</Text>
          </TouchableOpacity>
        </View>

        {/* 通知设置 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>通知设置</Text>
          <View style={styles.permissionItem}>
            <Text style={styles.permissionLabel}>接收Agent发布通知</Text>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: '#1a1a1a', true: '#1d9bf0' }}
              thumbColor="#e7e9ea"
            />
          </View>
          <View style={styles.permissionItem}>
            <Text style={styles.permissionLabel}>接收Agent交友通知</Text>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: '#1a1a1a', true: '#1d9bf0' }}
              thumbColor="#e7e9ea"
            />
          </View>
          <View style={styles.permissionItem}>
            <Text style={styles.permissionLabel}>接收异常行为告警</Text>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: '#1a1a1a', true: '#1d9bf0' }}
              thumbColor="#e7e9ea"
            />
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
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  emergencySection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 33, 46, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244, 33, 46, 0.3)',
    borderRadius: 8,
    padding: 12,
  },
  emergencyButtonText: {
    fontSize: 15,
    color: '#f4212e',
    marginLeft: 8,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  permissionLabel: {
    fontSize: 15,
    color: '#e7e9ea',
  },
  logItem: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  timestamp: {
    fontSize: 12,
    color: '#71767b',
  },
  logAction: {
    fontSize: 14,
    color: '#71767b',
    marginBottom: 4,
  },
  logContent: {
    fontSize: 14,
    color: '#e7e9ea',
    marginBottom: 12,
  },
  logActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logActionButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  approveButton: {
    backgroundColor: 'rgba(0, 186, 124, 0.2)',
  },
  approveButtonText: {
    fontSize: 14,
    color: '#00ba7c',
  },
  rejectButton: {
    backgroundColor: 'rgba(244, 33, 46, 0.2)',
  },
  rejectButtonText: {
    fontSize: 14,
    color: '#f4212e',
  },
  statusBadge: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  approvedBadge: {
    backgroundColor: 'rgba(0, 186, 124, 0.2)',
  },
  rejectedBadge: {
    backgroundColor: 'rgba(244, 33, 46, 0.2)',
  },
  statusText: {
    fontSize: 12,
    color: '#e7e9ea',
  },
  boundaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  boundaryButtonText: {
    fontSize: 15,
    color: '#e7e9ea',
    marginLeft: 12,
  },
});