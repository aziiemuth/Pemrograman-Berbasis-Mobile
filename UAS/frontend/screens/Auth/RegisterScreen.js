// screens/Auth/RegisterScreen.js
import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const { register, isLoading, authError } = useAuth();
  const theme = useTheme();

  const handleRegister = async (userData) => {
    const success = await register(userData);
    if (success) {
      Alert.alert('Registrasi Berhasil', 'Akun Anda berhasil dibuat. Silakan login.');
      navigation.navigate('Login');
    } else {
      // Error message already handled by AuthForm via authError
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={styles.title} variant="headlineMedium">Register</Text>
        <AuthForm
          type="register"
          onSubmit={handleRegister}
          isLoading={isLoading}
          error={authError}
        />
        <Text
          style={[styles.link, { color: theme.colors.primary }]}
          onPress={() => navigation.navigate('Login')}
        >
          Sudah punya akun? Login di sini.
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

export default RegisterScreen;
