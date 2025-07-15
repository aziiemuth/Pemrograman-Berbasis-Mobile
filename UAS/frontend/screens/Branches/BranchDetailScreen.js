// screens/Branches/BranchDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { getCabangById, deleteCabang } from '../../services/branchService'; // Pastikan ini ada
import { useAuth } from '../../context/AuthContext';

const BranchDetailScreen = ({ route, navigation }) => {
  const { branchId } = route.params;
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    const fetchBranch = async () => {
      setLoading(true);
      try {
        const data = await getCabangById(branchId);
        setBranch(data);
      } catch (error) {
        console.error('Error fetching branch details:', error);
        Alert.alert('Error', 'Gagal memuat detail cabang.');
      } finally {
        setLoading(false);
      }
    };
    fetchBranch();
  }, [branchId]);

  const handleDelete = async () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus cabang ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              await deleteCabang(branchId);
              Alert.alert('Berhasil', 'Cabang berhasil dihapus.');
              navigation.goBack(); // Kembali ke daftar cabang
            } catch (error) {
              console.error('Error deleting branch:', error);
              Alert.alert('Error', 'Gagal menghapus cabang.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!branch) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Cabang tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{branch.nama_cabang}</Title>
          <Paragraph>Alamat: {branch.alamat}</Paragraph>
          <Paragraph>Penanggung Jawab: {branch.penanggung_jawab}</Paragraph>
        </Card.Content>
      </Card>

      {isAdmin && (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('BranchForm', { branchId: branch.id })}
            style={styles.button}
          >
            Edit Cabang
          </Button>
          <Button
            mode="outlined"
            onPress={handleDelete}
            style={styles.button}
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
          >
            Hapus Cabang
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginBottom: 20,
    elevation: 3,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default BranchDetailScreen;
