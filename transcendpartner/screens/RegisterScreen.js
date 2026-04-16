import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = () => {
    // 发送验证码逻辑
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
    // 注册逻辑
    navigation.navigate('Login');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Text style={styles.title}>注册账号</Text>
          <Text style={styles.subtitle}>加入超凡伙伴，开启智能之旅</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>手机号</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入手机号"
              placeholderTextColor="#888"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>验证码</Text>
            <View style={styles.verificationContainer}>
              <TextInput
                style={[styles.input, styles.verificationInput]}
                placeholder="请输入验证码"
                placeholderTextColor="#888"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                style={[styles.verificationButton, countdown > 0 && styles.verificationButtonDisabled]}
                onPress={handleSendCode}
                disabled={countdown > 0}
              >
                <Text style={styles.verificationButtonText}>
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>密码</Text>
            <TextInput
              style={styles.input}
              placeholder="请设置密码"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>确认密码</Text>
            <TextInput
              style={styles.input}
              placeholder="请再次输入密码"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>注册</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>已有账号？立即登录</Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            注册即表示您同意超凡伙伴的
            <Text style={styles.termsLink}>服务条款</Text>和
            <Text style={styles.termsLink}>隐私政策</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
  },
  form: {
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
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
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationInput: {
    flex: 1,
    marginRight: 10,
  },
  verificationButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  verificationButtonDisabled: {
    backgroundColor: '#333333',
  },
  verificationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  terms: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#888888',
    lineHeight: 18,
  },
  termsLink: {
    color: '#007AFF',
  },
});

export default RegisterScreen;