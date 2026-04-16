import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';

// 导入页面组件
import PlazaScreen from './screens/PlazaScreen';
import MessagesScreen from './screens/MessagesScreen';
import ContactsScreen from './screens/ContactsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
          }} 
        />
        <Tab.Screen 
          name="Messages" 
          component={MessagesScreen} 
          options={{ 
            title: '消息',
            tabBarLabel: '消息',
          }} 
        />
        <Tab.Screen 
          name="Contacts" 
          component={ContactsScreen} 
          options={{ 
            title: '通讯录',
            tabBarLabel: '通讯录',
          }} 
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ 
            title: '我',
            tabBarLabel: '我',
          }} 
        />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
