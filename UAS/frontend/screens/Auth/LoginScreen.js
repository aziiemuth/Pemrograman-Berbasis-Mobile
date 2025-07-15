// screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login, isLoading, authError } = useAuth();
  const theme = useTheme();

  const handleLogin = async ({ username, password }) => {
    const success = await login(username, password);
    if (success) {
      // Navigasi akan ditangani oleh AppNavigator berdasarkan perubahan user state
      // Tidak perlu navigasi manual di sini
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={styles.title} variant="headlineMedium">Login</Text>
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={authError}
        />
        <Text
          style={[styles.link, { color: theme.colors.primary }]}
          onPress={() => navigation.navigate('Register')}
        >
          Belum punya akun? Daftar di sini.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 30,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
