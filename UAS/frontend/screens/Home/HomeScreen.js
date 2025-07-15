// screens/Home/HomeScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user, isAdmin } = useAuth();
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.welcomeText} variant="headlineMedium">
        Selamat Datang, {user?.username}!
      </Text>
      <Text style={styles.roleText} variant="bodyLarge">
        Peran Anda: {user?.role}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('BookList')}
          style={styles.button}
        >
          Lihat Daftar Buku
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('MemberList')}
          style={styles.button}
        >
          Lihat Daftar Anggota
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('BranchList')}
          style={styles.button}
        >
          Lihat Daftar Cabang
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('LoanList')}
          style={styles.button}
        >
          Lihat Daftar Peminjaman
        </Button>

        {isAdmin && (
          <View style={styles.adminSection}>
            <Text style={styles.adminTitle} variant="titleLarge">
              Menu Admin
            </Text>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('BookForm')}
              style={styles.button}
            >
              Tambah Buku Baru
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('MemberForm')}
              style={styles.button}
            >
              Tambah Anggota Baru
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('BranchForm')}
              style={styles.button}
            >
              Tambah Cabang Baru
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('LoanForm')}
              style={styles.button}
            >
              Catat Peminjaman Baru
            </Button>
          </View>
        )}

        <Button
          mode="text"
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileButton}
        >
          Lihat Profil
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  roleText: {
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    marginVertical: 10,
  },
  adminSection: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  adminTitle: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
  profileButton: {
    marginTop: 30,
  },
});

export default HomeScreen;
