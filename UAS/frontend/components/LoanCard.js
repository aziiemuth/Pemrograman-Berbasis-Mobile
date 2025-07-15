// components/LoanCard.js
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const LoanCard = ({ loan, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(loan.id)}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
});

export default LoanCard;
