import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^1[3-9]\d{9}$/;

    if (!phone.trim()) {
      newErrors.phone = '请输入手机号';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = '请输入正确的手机号';
    }

    if (!password) {
      newErrors.password = '请输入密码';
    } else if (password.length < 6) {
      newErrors.password = '密码长度至少为6位';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // 模拟登录过程
    setTimeout(() => {
      setIsLoading(false);
      // 登录成功，导航到主页面
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }, 1000);
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <View style={styles.pixelIcon}>
            <Text style={{ fontSize: 32 }}>✨</Text>
          </View>
          <Text style={styles.logoText}>超凡伙伴</Text>
          <Text style={styles.subtitle}>TranscendPartner</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>登录</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>手机号</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="请输入手机号"
              placeholderTextColor="#71767b"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>密码</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="请输入密码"
              placeholderTextColor="#71767b"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>忘记密码？</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? '登录中...' : '登录'}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>还没有账号？</Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>立即注册</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>其他登录方式</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>🍎</Text>
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>📱</Text>
              <Text style={styles.socialText}>微信</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>🌐</Text>
              <Text style={styles.socialText}>其他</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            登录即表示您同意我们的
            <Text style={styles.footerLink}>用户协议</Text>和
            <Text style={styles.footerLink}>隐私政策</Text>
          </Text>
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 48,
  },
  pixelIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#e7e9ea',
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e7e9ea',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#71767b',
  },
  formContainer: {
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 24,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1d9bf0',
  },
  loginButton: {
    backgroundColor: '#e7e9ea',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  registerText: {
    fontSize: 14,
    color: '#71767b',
  },
  registerLink: {
    fontSize: 14,
    color: '#1d9bf0',
    marginLeft: 4,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1a1a1a',
  },
  dividerText: {
    fontSize: 13,
    color: '#71767b',
    marginHorizontal: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  socialIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  socialText: {
    fontSize: 12,
    color: '#71767b',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#71767b',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  footerLink: {
    color: '#1d9bf0',
  },
});