import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>个人主页</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>用户信息</Text>
            <Text style={styles.cardText}>这里将展示您的个人信息</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>孪生伙伴</Text>
            <Text style={styles.cardText}>这里将展示您的孪生伙伴信息</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>超级伙伴</Text>
            <Text style={styles.cardText}>这里将展示您的超级伙伴信息</Text>
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
    padding: 16,
  },
  card: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e7e9ea',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#71767b',
  },
});