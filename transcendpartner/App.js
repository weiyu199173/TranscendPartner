import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ErrorBoundary from './components/ErrorBoundary';

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
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
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
