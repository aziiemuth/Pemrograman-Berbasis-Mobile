// screens/Loans/LoanFormScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { createPeminjaman, getPeminjamanById, updatePeminjaman } from '../../services/loanService'; // Pastikan ini ada

const LoanFormScreen = ({ route, navigation }) => {
  const { loanId } = route.params || {};
  const isEditMode = !!loanId;

  const [memberId, setMemberId] = useState('');
  const [bookId, setBookId] = useState('');
  const [tanggalPinjam, setTanggalPinjam] = useState(''); // Format YYYY-MM-DD
  const [tanggalKembali, setTanggalKembali] = useState(''); // Format YYYY-MM-DD, bisa kosong
  const [status, setStatus] = useState('dipinjam'); // Default status
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    if (isEditMode) {
      const fetchLoanData = async () => {
        setInitialLoad(true);
        try {
          const data = await getPeminjamanById(loanId);
          setMemberId(data.member_id.toString());
          setBookId(data.book_id.toString());
          setTanggalPinjam(data.tanggal_pinjam);
          setTanggalKembali(data.tanggal_kembali || '');
          setStatus(data.status);
        } catch (error) {
          console.error('Error fetching loan for edit:', error);
          Alert.alert('Error', 'Gagal memuat data peminjaman untuk diedit.');
          navigation.goBack();
        } finally {
          setInitialLoad(false);
        }
      };
      fetchLoanData();
    } else {
      setInitialLoad(false);
    }
  }, [loanId, isEditMode]);

  const handleSubmit = async () => {
    if (!memberId || !bookId || !tanggalPinjam) {
      Alert.alert('Peringatan', 'Member ID, Book ID, dan Tanggal Pinjam harus diisi.');
      return;
    }

    setLoading(true);
    const loanData = {
      member_id: parseInt(memberId),
      book_id: parseInt(bookId),
      tanggal_pinjam: tanggalPinjam,
      tanggal_kembali: tanggalKembali || null, // Kirim null jika kosong
      status: status,
    };

    try {
      if (isEditMode) {
        await updatePeminjaman(loanId, loanData);
        Alert.alert('Berhasil', 'Data peminjaman berhasil diperbarui.');
      } else {
        await createPeminjaman(loanData);
        Alert.alert('Berhasil', 'Peminjaman berhasil dicatat.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving loan:', error);
      Alert.alert('Error', `Gagal ${isEditMode ? 'memperbarui' : 'mencatat'} peminjaman.`);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title} variant="headlineMedium">
        {isEditMode ? 'Edit Peminjaman' : 'Catat Peminjaman Baru'}
      </Text>
      <TextInput
        label="Member ID"
        value={memberId}
        onChangeText={setMemberId}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Book ID"
        value={bookId}
        onChangeText={setBookId}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Tanggal Pinjam (YYYY-MM-DD)"
        value={tanggalPinjam}
        onChangeText={setTanggalPinjam}
        mode="outlined"
        placeholder="Contoh: 2025-06-25"
        style={styles.input}
      />
      <TextInput
        label="Tanggal Kembali (YYYY-MM-DD, Opsional)"
        value={tanggalKembali}
        onChangeText={setTanggalKembali}
        mode="outlined"
        placeholder="Contoh: 2025-07-01"
        style={styles.input}
      />
      {/* Untuk status, bisa pakai Dropdown/Picker dari react-native-paper */}
      <TextInput
        label="Status (dipinjam/dikembalikan)"
        value={status}
        onChangeText={setStatus}
        mode="outlined"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        {isEditMode ? 'Simpan Perubahan' : 'Catat Peminjaman'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default LoanFormScreen;
