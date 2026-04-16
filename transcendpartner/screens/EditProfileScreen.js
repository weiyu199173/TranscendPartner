import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';

export default function EditProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({
    name: '',
    bio: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 获取用户资料
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await api.user.getProfile();
        if (response.success) {
          setUserData({
            name: response.data.name,
            bio: response.data.bio,
            phone: response.data.phone,
          });
        }
      } catch (error) {
        console.error('获取用户资料失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await api.user.updateProfile(userData);
      if (response.success) {
        // 保存成功，导航回个人资料页面
        navigation.goBack();
      }
    } catch (error) {
      console.error('保存个人资料失败:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1d9bf0" />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>取消</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>编辑个人资料</Text>
            <TouchableOpacity 
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={isSaving}
            >
              <Text style={styles.saveButtonText}>
                {isSaving ? '保存中...' : '保存'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={styles.profileImageContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
              <TouchableOpacity style={styles.changeImageButton}>
                <Ionicons name="camera" size={20} color="#e7e9ea" />
                <Text style={styles.changeImageText}>更换头像</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>昵称</Text>
                <TextInput
                  style={styles.input}
                  placeholder="请输入昵称"
                  placeholderTextColor="#71767b"
                  value={userData.name}
                  onChangeText={(text) => setUserData({ ...userData, name: text })}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>个人简介</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="介绍一下自己吧..."
                  placeholderTextColor="#71767b"
                  value={userData.bio}
                  onChangeText={(text) => setUserData({ ...userData, bio: text })}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>手机号</Text>
                <TextInput
                  style={styles.input}
                  placeholder="请输入手机号"
                  placeholderTextColor="#71767b"
                  value={userData.phone}
                  onChangeText={(text) => setUserData({ ...userData, phone: text })}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>账号安全</Text>
                <TouchableOpacity style={styles.securityItem}>
                  <Text style={styles.securityItemText}>修改密码</Text>
                  <Ionicons name="chevron-forward" size={20} color="#71767b" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.securityItem}>
                  <Text style={styles.securityItemText}>绑定邮箱</Text>
                  <Ionicons name="chevron-forward" size={20} color="#71767b" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.securityItem}>
                  <Text style={styles.securityItemText}>两步验证</Text>
                  <Ionicons name="chevron-forward" size={20} color="#71767b" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#71767b',
    marginTop: 12,
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
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#71767b',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e7e9ea',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#1d9bf0',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
  },
  changeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeImageText: {
    fontSize: 14,
    color: '#1d9bf0',
    marginLeft: 4,
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
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
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 12,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  securityItemText: {
    fontSize: 15,
    color: '#e7e9ea',
  },
});