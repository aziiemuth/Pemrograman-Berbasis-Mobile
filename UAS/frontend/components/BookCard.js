// components/BookCard.js
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const BookCard = ({ book, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(book.id)}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{book.judul}</Title>
          <Paragraph>Pengarang: {book.pengarang}</Paragraph>
          <Paragraph>Penerbit: {book.penerbit}</Paragraph>
          <Paragraph>Tahun Terbit: {book.tahun_terbit}</Paragraph>
          <Paragraph>Jumlah: {book.jumlah}</Paragraph>
          {/* Lokasi Cabang ID bisa di-resolve ke nama cabang di layar detail atau list */}
          <Paragraph>Lokasi Cabang ID: {book.lokasi_cabang_id}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2, // Shadow for Android
  },
});

export default BookCard;
