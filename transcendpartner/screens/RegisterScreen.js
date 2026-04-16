import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../api';

export default function RegisterScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!phone.trim()) {
      newErrors.phone = '请输入手机号';
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      newErrors.phone = '请输入正确的手机号';
    }
    
    if (!verificationCode.trim()) {
      newErrors.verificationCode = '请输入验证码';
    } else if (verificationCode.length !== 6) {
      newErrors.verificationCode = '验证码长度为6位';
    }
    
    if (!password.trim()) {
      newErrors.password = '请设置密码';
    } else if (password.length < 6) {
      newErrors.password = '密码长度至少为6位';
    }
    
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = '请确认密码';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async () => {
    if (!phone.trim()) {
      setErrors({ ...errors, phone: '请输入手机号' });
      return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setErrors({ ...errors, phone: '请输入正确的手机号' });
      return;
    }
    
    try {
      const response = await api.auth.sendVerificationCode(phone);
      if (response.success) {
        Alert.alert('提示', '验证码已发送');
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
      }
    } catch (error) {
      console.error('发送验证码失败:', error);
      Alert.alert('发送失败', '网络错误，请稍后重试');
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await api.auth.register(phone, verificationCode, password);
      if (response.success) {
        Alert.alert('注册成功', '请登录您的账号', [
          {
            text: '确定',
            onPress: () => navigation.navigate('Login')
          }
        ]);
      } else {
        Alert.alert('注册失败', '验证码错误或已过期');
      }
    } catch (error) {
      console.error('注册失败:', error);
      Alert.alert('注册失败', '网络错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
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
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="请输入手机号"
              placeholderTextColor="#71767b"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (errors.phone) {
                  setErrors({ ...errors, phone: '' });
                }
              }}
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>验证码</Text>
            <View style={styles.verificationContainer}>
              <TextInput
                style={[styles.verificationInput, errors.verificationCode && styles.inputError]}
                placeholder="请输入验证码"
                placeholderTextColor="#71767b"
                value={verificationCode}
                onChangeText={(text) => {
                  setVerificationCode(text);
                  if (errors.verificationCode) {
                    setErrors({ ...errors, verificationCode: '' });
                  }
                }}
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
            {errors.verificationCode && <Text style={styles.errorText}>{errors.verificationCode}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>密码</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="请设置密码"
              placeholderTextColor="#71767b"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors({ ...errors, password: '' });
                }
                if (errors.confirmPassword) {
                  setErrors({ ...errors, confirmPassword: '' });
                }
              }}
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>确认密码</Text>
            <TextInput
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              placeholder="请再次输入密码"
              placeholderTextColor="#71767b"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) {
                  setErrors({ ...errors, confirmPassword: '' });
                }
              }}
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
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
  inputError: {
    borderColor: '#f4212e',
  },
  errorText: {
    fontSize: 12,
    color: '#f4212e',
    marginTop: 4,
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