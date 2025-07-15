// screens/Books/BookListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import BookCard from '../../components/BookCard';
import { getAllBooks, deleteBook } from '../../services/bookService';
import { useAuth } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const BookListScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isAdmin } = useAuth();
  const theme = useTheme();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      Alert.alert('Error', 'Gagal memuat daftar buku.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBooks();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchBooks();
  };

  const handleCardPress = (id) => {
    navigation.navigate('BookDetail', { bookId: id });
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus buku ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              await deleteBook(id);
              Alert.alert('Berhasil', 'Buku berhasil dihapus.');
              fetchBooks(); // Refresh list
            } catch (error) {
              console.error('Error deleting book:', error);
              Alert.alert('Error', 'Gagal menghapus buku.');
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
          onPress={() => navigation.navigate('BookForm')}
          style={styles.addButton}
        >
          Tambah Buku Baru
        </Button>
      )}
      {books.length === 0 ? (
        <Text style={styles.emptyText}>Tidak ada buku yang tersedia.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <BookCard book={item} onPress={handleCardPress} />
              {isAdmin && (
                <View style={styles.actionButtons}>
                  <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('BookForm', { bookId: item.id })}
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

export default BookListScreen;
