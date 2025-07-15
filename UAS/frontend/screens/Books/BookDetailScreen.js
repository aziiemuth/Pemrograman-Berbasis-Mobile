// screens/Books/BookDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { getBookById, deleteBook } from '../../services/bookService';
import { useAuth } from '../../context/AuthContext';

const BookDetailScreen = ({ route, navigation }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const data = await getBookById(bookId);
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        Alert.alert('Error', 'Gagal memuat detail buku.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleDelete = async () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus buku ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              await deleteBook(bookId);
              Alert.alert('Berhasil', 'Buku berhasil dihapus.');
              navigation.goBack(); // Kembali ke daftar buku
            } catch (error) {
              console.error('Error deleting book:', error);
              Alert.alert('Error', 'Gagal menghapus buku.');
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

  if (!book) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Buku tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{book.judul}</Title>
          <Paragraph>Pengarang: {book.pengarang}</Paragraph>
          <Paragraph>Penerbit: {book.penerbit}</Paragraph>
          <Paragraph>Tahun Terbit: {book.tahun_terbit}</Paragraph>
          <Paragraph>Jumlah: {book.jumlah}</Paragraph>
          <Paragraph>Lokasi Cabang ID: {book.lokasi_cabang_id}</Paragraph>
        </Card.Content>
      </Card>

      {isAdmin && (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('BookForm', { bookId: book.id })}
            style={styles.button}
          >
            Edit Buku
          </Button>
          <Button
            mode="outlined"
            onPress={handleDelete}
            style={styles.button}
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
          >
            Hapus Buku
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

export default BookDetailScreen;
