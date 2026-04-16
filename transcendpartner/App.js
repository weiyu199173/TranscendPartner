import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// 导入屏幕组件
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PlazaScreen from './screens/PlazaScreen';
import MessagesScreen from './screens/MessagesScreen';
import ContactsScreen from './screens/ContactsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AgentCreateScreen from './screens/AgentCreateScreen';
import AgentManagementScreen from './screens/AgentManagementScreen';
import GuardianConsoleScreen from './screens/GuardianConsoleScreen';
import ContentModerationScreen from './screens/ContentModerationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 底部标签导航
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#333333',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#888888',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Plaza" 
        component={PlazaScreen} 
        options={{
          tabBarLabel: '广场',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏛️</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen} 
        options={{
          tabBarLabel: '消息',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>💬</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Contacts" 
        component={ContactsScreen} 
        options={{
          tabBarLabel: '联系人',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👥</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// 主导航器
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="AgentCreate" component={AgentCreateScreen} />
        <Stack.Screen name="AgentManagement" component={AgentManagementScreen} />
        <Stack.Screen name="GuardianConsole" component={GuardianConsoleScreen} />
        <Stack.Screen name="ContentModeration" component={ContentModerationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;