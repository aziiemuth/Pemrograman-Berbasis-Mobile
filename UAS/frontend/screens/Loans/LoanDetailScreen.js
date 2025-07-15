// screens/Loans/LoanDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { getPeminjamanById, deletePeminjaman } from '../../services/loanService'; // Pastikan ini ada
import { useAuth } from '../../context/AuthContext';

const LoanDetailScreen = ({ route, navigation }) => {
  const { loanId } = route.params;
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    const fetchLoan = async () => {
      setLoading(true);
      try {
        const data = await getPeminjamanById(loanId);
        setLoan(data);
      } catch (error) {
        console.error('Error fetching loan details:', error);
        Alert.alert('Error', 'Gagal memuat detail peminjaman.');
      } finally {
        setLoading(false);
      }
    };
    fetchLoan();
  }, [loanId]);

  const handleDelete = async () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus data peminjaman ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              await deletePeminjaman(loanId);
              Alert.alert('Berhasil', 'Data peminjaman berhasil dihapus.');
              navigation.goBack(); // Kembali ke daftar peminjaman
            } catch (error) {
              console.error('Error deleting loan:', error);
              Alert.alert('Error', 'Gagal menghapus data peminjaman.');
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

  if (!loan) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Data peminjaman tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Peminjaman ID: {loan.id}</Title>
          <Paragraph>Member ID: {loan.member_id}</Paragraph>
          <Paragraph>Book ID: {loan.book_id}</Paragraph>
          <Paragraph>Tanggal Pinjam: {loan.tanggal_pinjam}</Paragraph>
          <Paragraph>Tanggal Kembali: {loan.tanggal_kembali || 'Belum Dikembalikan'}</Paragraph>
          <Paragraph>Status: {loan.status}</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('LoanForm', { loanId: loan.id })}
          style={styles.button}
        >
          Edit Peminjaman
        </Button>
        {isAdmin && ( // Hanya admin yang bisa menghapus
          <Button
            mode="outlined"
            onPress={handleDelete}
            style={styles.button}
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
          >
            Hapus Peminjaman
          </Button>
        )}
      </View>
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

export default LoanDetailScreen;
