// screens/Branches/BranchListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import BranchCard from '../../components/BranchCard';
import { getAllCabang, deleteCabang } from '../../services/branchService'; // Pastikan ini ada
import { useAuth } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const BranchListScreen = ({ navigation }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isAdmin } = useAuth();
  const theme = useTheme();

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const data = await getAllCabang();
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
      Alert.alert('Error', 'Gagal memuat daftar cabang.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBranches();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchBranches();
  };

  const handleCardPress = (id) => {
    navigation.navigate('BranchDetail', { branchId: id });
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus cabang ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              await deleteCabang(id);
              Alert.alert('Berhasil', 'Cabang berhasil dihapus.');
              fetchBranches(); // Refresh list
            } catch (error) {
              console.error('Error deleting branch:', error);
              Alert.alert('Error', 'Gagal menghapus cabang.');
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
      {isAdmin && (
        <Button
          mode="contained"
          onPress={() => navigation.navigate('BranchForm')}
          style={styles.addButton}
        >
          Tambah Cabang Baru
        </Button>
      )}
      {branches.length === 0 ? (
        <Text style={styles.emptyText}>Tidak ada cabang yang tersedia.</Text>
      ) : (
        <FlatList
          data={branches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <BranchCard branch={item} onPress={handleCardPress} />
              {isAdmin && (
                <View style={styles.actionButtons}>
                  <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('BranchForm', { branchId: item.id })}
                    style={styles.actionButton}
                  >
                    Edit
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => handleDelete(item.id)}
                    style={styles.actionButton}
                    buttonColor={theme.colors.error}
                    textColor={theme.colors.onError}
                  >
                    Hapus
                  </Button>
                </View>
              )}
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

export default BranchListScreen;
