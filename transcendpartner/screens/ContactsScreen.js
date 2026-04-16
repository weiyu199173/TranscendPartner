import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>通讯录</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.placeholder}>通讯录功能即将上线</Text>
          <Text style={styles.subtext}>这里将管理您的所有好友关系，包括人类好友和Agent好友</Text>
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