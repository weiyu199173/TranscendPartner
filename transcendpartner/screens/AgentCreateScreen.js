import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function AgentCreateScreen({ navigation }) {
  const [agentType, setAgentType] = useState('twin'); // twin or super
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('');
  const [interests, setInterests] = useState('');
  const [languageStyle, setLanguageStyle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAgent = () => {
    if (!name || !personality) return;
    
    setIsLoading(true);
    // 模拟创建Agent过程
    setTimeout(() => {
      setIsLoading(false);
      // 创建成功，导航到Agent管理页面
      navigation.navigate('AgentManagement');
    }, 1000);
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
          <Text style={styles.headerTitle}>创建Agent</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>选择Agent类型</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity 
              style={[styles.typeButton, agentType === 'twin' && styles.typeButtonActive]}
              onPress={() => setAgentType('twin')}
            >
              <Text style={[styles.typeButtonText, agentType === 'twin' && styles.typeButtonTextActive]}>
                🧬 孪生伙伴
              </Text>
              <Text style={[styles.typeButtonSubtext, agentType === 'twin' && styles.typeButtonTextActive]}>
                情感陪伴型
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.typeButton, agentType === 'super' && styles.typeButtonActive]}
              onPress={() => setAgentType('super')}
            >
              <Text style={[styles.typeButtonText, agentType === 'super' && styles.typeButtonTextActive]}>
                ⚡ 超级伙伴
              </Text>
              <Text style={[styles.typeButtonSubtext, agentType === 'super' && styles.typeButtonTextActive]}>
                工作能力型
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>基本信息</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Agent名字</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入Agent名字"
              placeholderTextColor="#71767b"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>性格特质</Text>
            <TextInput
              style={styles.input}
              placeholder="例如：外向、幽默、理性"
              placeholderTextColor="#71767b"
              value={personality}
              onChangeText={setPersonality}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>兴趣爱好</Text>
            <TextInput
              style={styles.input}
              placeholder="例如：音乐、科技、旅行"
              placeholderTextColor="#71767b"
              value={interests}
              onChangeText={setInterests}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>语言风格</Text>
            <TextInput
              style={styles.input}
              placeholder="例如：文艺、科技、口语化"
              placeholderTextColor="#71767b"
              value={languageStyle}
              onChangeText={setLanguageStyle}
            />
          </View>

          {agentType === 'twin' && (
            <View style={styles.llmContainer}>
              <Text style={styles.sectionTitle}>LLM配置</Text>
              <View style={styles.llmCard}>
                <Text style={styles.llmCardTitle}>需要配置大模型API</Text>
                <Text style={styles.llmCardText}>
                  孪生伙伴需要您提供大模型API Key来驱动其核心能力。您可以使用OpenAI、豆包、千问等主流模型。
                </Text>
                <TouchableOpacity style={styles.llmButton}>
                  <Text style={styles.llmButtonText}>配置API Key</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {agentType === 'super' && (
            <View style={styles.llmContainer}>
              <Text style={styles.sectionTitle}>外部载体接入</Text>
              <View style={styles.llmCard}>
                <Text style={styles.llmCardTitle}>需要接入外部Agent载体</Text>
                <Text style={styles.llmCardText}>
                  超级伙伴需要从外部载体（如Trae Solo、OpenClaw、扣子等）接入。请选择您要接入的载体。
                </Text>
                <TouchableOpacity style={styles.llmButton}>
                  <Text style={styles.llmButtonText}>选择载体</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.createButton, isLoading && styles.createButtonDisabled]}
            onPress={handleCreateAgent}
            disabled={isLoading}
          >
            <Text style={styles.createButtonText}>
              {isLoading ? '创建中...' : '创建Agent'}
            </Text>
          </TouchableOpacity>

          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>创建提示</Text>
            <Text style={styles.tipText}>
              • 每个用户最多可以创建3个Agent
            </Text>
            <Text style={styles.tipText}>
              • Agent创建后需要经过审核才能使用
            </Text>
            <Text style={styles.tipText}>
              • 您需要为Agent的行为承担监护责任
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
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  typeButtonActive: {
    borderColor: '#1d9bf0',
    backgroundColor: 'rgba(29, 155, 240, 0.1)',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e7e9ea',
    marginBottom: 4,
  },
  typeButtonTextActive: {
    color: '#1d9bf0',
  },
  typeButtonSubtext: {
    fontSize: 12,
    color: '#71767b',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e7e9ea',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#e7e9ea',
  },
  llmContainer: {
    marginVertical: 24,
  },
  llmCard: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
  },
  llmCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e7e9ea',
    marginBottom: 8,
  },
  llmCardText: {
    fontSize: 14,
    color: '#71767b',
    marginBottom: 16,
    lineHeight: 1.6,
  },
  llmButton: {
    backgroundColor: '#1d9bf0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  llmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  createButton: {
    backgroundColor: '#e7e9ea',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  tipContainer: {
    backgroundColor: 'rgba(29, 155, 240, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(29, 155, 240, 0.3)',
    borderRadius: 12,
    padding: 16,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1d9bf0',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#71767b',
    marginBottom: 4,
  },
});