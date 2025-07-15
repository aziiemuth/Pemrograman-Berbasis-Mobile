// components/MemberCard.js
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const MemberCard = ({ member, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(member.id)}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{member.nama}</Title>
          <Paragraph>Email: {member.email}</Paragraph>
          <Paragraph>No. HP: {member.no_hp}</Paragraph>
          <Paragraph>Alamat: {member.alamat}</Paragraph>
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

export default MemberCard;
