// screens/ProfileScreen.js
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native'; // Tetap bisa dipakai untuk kebutuhan lain

const ProfileScreen = () => {
  const { user, logout, isLoading } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation(); // Tidak wajib dipakai untuk logout

  const handleLogout = async () => {
    const success = await logout();

    if (!success) {
      Alert.alert('Error', 'Gagal logout. Silakan coba lagi.');
    }


  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Tidak ada data pengguna.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title} variant="headlineMedium">Profil Pengguna</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user.username}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Role:</Text>
        <Text style={styles.value}>{user.role}</Text>
      </View>

      {user.id_anggota && (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>ID Anggota:</Text>
          <Text style={styles.value}>{user.id_anggota}</Text>
        </View>
      )}

      <Button
        mode="contained"
        onPress={handleLogout}
        loading={isLoading}
        disabled={isLoading}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 30,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flexShrink: 1,
  },
  logoutButton: {
    marginTop: 40,
    width: '80%',
  },
});

export default ProfileScreen;
