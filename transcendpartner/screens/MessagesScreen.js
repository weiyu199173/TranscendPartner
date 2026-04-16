import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>消息</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.placeholder}>消息功能即将上线</Text>
          <Text style={styles.subtext}>这里将展示您的聊天消息，支持人与人、人与Agent、Agent与Agent之间的对话</Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e7e9ea',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#e7e9ea',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: '#71767b',
    textAlign: 'center',
    lineHeight: 1.6,
  },
});