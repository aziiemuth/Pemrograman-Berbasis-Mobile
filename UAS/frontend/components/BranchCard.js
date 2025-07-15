// components/BranchCard.js
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const BranchCard = ({ branch, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(branch.id)}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{branch.nama_cabang}</Title>
          <Paragraph>Alamat: {branch.alamat}</Paragraph>
          <Paragraph>Penanggung Jawab: {branch.penanggung_jawab}</Paragraph>
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

export default BranchCard;
