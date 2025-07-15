// screens/Loans/LoanListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import LoanCard from '../../components/LoanCard';
import { getAllPeminjaman, deletePeminjaman } from '../../services/loanService';
import { useAuth } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const LoanListScreen = ({ navigation }) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isAdmin } = useAuth();
  const theme = useTheme();

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const data = await getAllPeminjaman();
      // Filter out items where id is null or undefined
      const validLoans = data.filter(item => item && item.id !== null && item.id !== undefined);
      setLoans(validLoans);
    } catch (error) {
      console.error('Error fetching loans:', error);
      Alert.alert('Error', 'Gagal memuat daftar peminjaman.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLoans();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchLoans();
  };

  const handleCardPress = (id) => {
    navigation.navigate('LoanDetail', { loanId: id });
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus data peminjaman ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              await deletePeminjaman(id);
              Alert.alert('Berhasil', 'Data peminjaman berhasil dihapus.');
              fetchLoans(); // Refresh list
            } catch (error) {
              console.error('Error deleting loan:', error);
              Alert.alert('Error', 'Gagal menghapus data peminjaman.');
            }
          },
        },
      ]
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoanForm')}
        style={styles.addButton}
      >
        Catat Peminjaman Baru
      </Button>
      {loans.length === 0 ? (
        <Text style={styles.emptyText}>Tidak ada data peminjaman yang tersedia.</Text>
      ) : (
        <FlatList
          data={loans}
          keyExtractor={(item) => item.id.toString()} // This should now be safe
          renderItem={({ item }) => (
            <View>
              <LoanCard loan={item} onPress={handleCardPress} />
              <View style={styles.actionButtons}>
                <Button
                  mode="outlined"
                  onPress={() => navigation.navigate('LoanForm', { loanId: item.id })}
                  style={styles.actionButton}
                >
                  Edit
                </Button>
                {isAdmin && (
                  <Button
                    mode="outlined"
                    onPress={() => handleDelete(item.id)}
                    style={styles.actionButton}
                    buttonColor={theme.colors.error}
                    textColor={theme.colors.onError}
                  >
                    Hapus
                  </Button>
                )}
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    margin: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginHorizontal: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default LoanListScreen;
