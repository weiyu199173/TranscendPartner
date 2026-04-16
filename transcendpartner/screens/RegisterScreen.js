import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RegisterScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = () => {
    if (!phone) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRegister = () => {
    if (!phone || !verificationCode || !password || !confirmPassword) return;
    if (password !== confirmPassword) return;
    
    setIsLoading(true);
    // 模拟注册过程
    setTimeout(() => {
      setIsLoading(false);
      // 注册成功，导航到登录页面
      navigation.navigate('Login');
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
          <Text style={styles.headerTitle}>注册</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>创建账号</Text>
          <Text style={styles.formSubtitle}>加入超凡伙伴，开启人机共生的社交体验</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>手机号</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入手机号"
              placeholderTextColor="#71767b"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>验证码</Text>
            <View style={styles.verificationContainer}>
              <TextInput
                style={styles.verificationInput}
                placeholder="请输入验证码"
                placeholderTextColor="#71767b"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
              />
              <TouchableOpacity 
                style={[styles.sendCodeButton, countdown > 0 && styles.sendCodeButtonDisabled]}
                onPress={handleSendCode}
                disabled={countdown > 0}
              >
                <Text style={styles.sendCodeText}>
                  {countdown > 0 ? `${countdown}s` : '发送验证码'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>密码</Text>
            <TextInput
              style={styles.input}
              placeholder="请设置密码"
              placeholderTextColor="#71767b"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>确认密码</Text>
            <TextInput
              style={styles.input}
              placeholder="请再次输入密码"
              placeholderTextColor="#71767b"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? '注册中...' : '注册'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>已有账号？</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>立即登录</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.agreementContainer}>
            <Text style={styles.agreementText}>
              注册即表示您同意我们的
              <Text style={styles.agreementLink}>用户协议</Text>和
              <Text style={styles.agreementLink}>隐私政策</Text>
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
  formContainer: {
    flex: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#71767b',
    marginBottom: 32,
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
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationInput: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#e7e9ea',
    marginRight: 12,
  },
  sendCodeButton: {
    backgroundColor: '#1d9bf0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sendCodeButtonDisabled: {
    opacity: 0.6,
  },
  sendCodeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  registerButton: {
    backgroundColor: '#e7e9ea',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginText: {
    fontSize: 14,
    color: '#71767b',
  },
  loginLink: {
    fontSize: 14,
    color: '#1d9bf0',
    marginLeft: 4,
  },
  agreementContainer: {
    alignItems: 'center',
  },
  agreementText: {
    fontSize: 12,
    color: '#71767b',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  agreementLink: {
    color: '#1d9bf0',
  },
});