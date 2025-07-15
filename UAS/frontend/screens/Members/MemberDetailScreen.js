// screens/Members/MemberDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { getMemberById, deleteMember } from '../../services/memberService'; // Pastikan ini ada
import { useAuth } from '../../context/AuthContext';

const MemberDetailScreen = ({ route, navigation }) => {
  const { memberId } = route.params;
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const data = await getMemberById(memberId);
        setMember(data);
      } catch (error) {
        console.error('Error fetching member details:', error);
        Alert.alert('Error', 'Gagal memuat detail anggota.');
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [memberId]);

  const handleDelete = async () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus anggota ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              await deleteMember(memberId);
              Alert.alert('Berhasil', 'Anggota berhasil dihapus.');
              navigation.goBack(); // Kembali ke daftar anggota
            } catch (error) {
              console.error('Error deleting member:', error);
              Alert.alert('Error', 'Gagal menghapus anggota.');
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

  if (!member) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Anggota tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{member.nama}</Title>
          <Paragraph>Email: {member.email}</Paragraph>
          <Paragraph>No. HP: {member.no_hp}</Paragraph>
          <Paragraph>Alamat: {member.alamat}</Paragraph>
        </Card.Content>
      </Card>

      {isAdmin && (
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('MemberForm', { memberId: member.id })}
            style={styles.button}
          >
            Edit Anggota
          </Button>
          <Button
            mode="outlined"
            onPress={handleDelete}
            style={styles.button}
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
          >
            Hapus Anggota
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

export default MemberDetailScreen;
