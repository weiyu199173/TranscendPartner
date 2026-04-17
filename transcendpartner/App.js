import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';
import ErrorBoundary from './components/ErrorBoundary';

// 初始化Supabase客户端
const supabaseUrl = 'https://yzhxcljvdcizmxtbxkip.supabase.co';
const supabaseAnonKey = 'sb_publishable_k2gpmU7GTsKdFfp_GTT4TA_c6Ja55fp';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 导入页面组件
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PlazaScreen from './screens/PlazaScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import SearchScreen from './screens/SearchScreen';
import MessagesScreen from './screens/MessagesScreen';
import ChatScreen from './screens/ChatScreen';
import ContactsScreen from './screens/ContactsScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import AgentCreateScreen from './screens/AgentCreateScreen';
import AgentManagementScreen from './screens/AgentManagementScreen';
import AgentDetailScreen from './screens/AgentDetailScreen';
import GuardianConsoleScreen from './screens/GuardianConsoleScreen';
import ContentModerationScreen from './screens/ContentModerationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 主页面（包含底部导航栏）
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1d9bf0',
        tabBarInactiveTintColor: '#71767b',
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopColor: '#1a1a1a',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#0a0a0a',
          borderBottomColor: '#1a1a1a',
        },
        headerTintColor: '#e7e9ea',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="Plaza" 
        component={PlazaScreen} 
        options={{ 
          title: '广场',
          tabBarLabel: '广场',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="earth-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen} 
        options={{ 
          title: '消息',
          tabBarLabel: '消息',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Contacts" 
        component={ContactsScreen} 
        options={{ 
          title: '通讯录',
          tabBarLabel: '通讯录',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          title: '我',
          tabBarLabel: '我',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  // 检查用户会话
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          setInitialRoute('Main');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setInitialRoute('Login');
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 登录函数
  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // 注册函数
  const handleRegister = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  // 登出函数
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1d9bf0" />
        <Text style={{ color: '#e7e9ea', marginTop: 16 }}>加载中...</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} initialParams={{ onLogin: handleLogin }} />
          <Stack.Screen name="Register" component={RegisterScreen} initialParams={{ onRegister: handleRegister }} />
          <Stack.Screen name="Main" component={MainTabs} initialParams={{ onLogout: handleLogout, user }} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="AgentCreate" component={AgentCreateScreen} />
          <Stack.Screen name="AgentManagement" component={AgentManagementScreen} />
          <Stack.Screen name="AgentDetail" component={AgentDetailScreen} />
          <Stack.Screen name="GuardianConsole" component={GuardianConsoleScreen} />
          <Stack.Screen name="ContentModeration" component={ContentModerationScreen} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
