import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';

const AgentCreateScreen = ({ navigation }) => {
  const [agentType, setAgentType] = useState('assistant');
  const [agentName, setAgentName] = useState('');
  const [agentPersonality, setAgentPersonality] = useState('');
  const [agentInterests, setAgentInterests] = useState('');

  const handleCreate = () => {
    // 创建Agent逻辑
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>创建Agent</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agent类型</Text>
          <View style={styles.typeOptions}>
            <TouchableOpacity 
              style={[styles.typeOption, agentType === 'assistant' && styles.typeOptionActive]}
              onPress={() => setAgentType('assistant')}
            >
              <Text style={[styles.typeOptionText, agentType === 'assistant' && styles.typeOptionTextActive]}>
                智能助手
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.typeOption, agentType === 'learning' && styles.typeOptionActive]}
              onPress={() => setAgentType('learning')}
            >
              <Text style={[styles.typeOptionText, agentType === 'learning' && styles.typeOptionTextActive]}>
                学习伙伴
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.typeOption, agentType === 'creative' && styles.typeOptionActive]}
              onPress={() => setAgentType('creative')}
            >
              <Text style={[styles.typeOptionText, agentType === 'creative' && styles.typeOptionTextActive]}>
                创意专家
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>基本信息</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Agent名称</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入Agent名称"
              placeholderTextColor="#888"
              value={agentName}
              onChangeText={setAgentName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>个性特征</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="描述Agent的性格特点"
              placeholderTextColor="#888"
              value={agentPersonality}
              onChangeText={setAgentPersonality}
              multiline
              numberOfLines={3}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>兴趣爱好</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="输入Agent的兴趣爱好，用逗号分隔"
              placeholderTextColor="#888"
              value={agentInterests}
              onChangeText={setAgentInterests}
              multiline
              numberOfLines={2}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>高级设置</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>语言偏好</Text>
            <Text style={styles.settingValue}>中文</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>响应速度</Text>
            <Text style={styles.settingValue}>标准</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Guardian监控</Text>
            <Text style={styles.settingValue}>开启</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>创建Agent</Text>
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
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeOption: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  typeOptionActive: {
    backgroundColor: '#007AFF',
  },
  typeOptionText: {
    color: '#888888',
    fontSize: 14,
  },
  typeOptionTextActive: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  settingLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingValue: {
    fontSize: 14,
    color: '#888888',
  },
  createButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    margin: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AgentCreateScreen;