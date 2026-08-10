import React from 'react';
import { Link } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const VirtualTour = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>Museu da Computação</Text>
        <Text style={styles.title}>Tour Virtual</Text>
        <Text accessibilityRole="text" style={styles.message}>
          Em construção...
        </Text>
        <Link to="/" style={styles.homeLink}>
          <Text style={styles.linkText}>Voltar para o início</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  eyebrow: {
    color: '#AD4A4A',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    color: '#18121E',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
  message: {
    color: '#18121E',
    fontSize: 24,
    marginBottom: 32,
  },
  homeLink: {
    paddingVertical: 8,
  },
  linkText: {
    color: '#AD4A4A',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default VirtualTour;
