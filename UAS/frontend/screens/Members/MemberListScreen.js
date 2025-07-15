// screens/Members/MemberListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import MemberCard from '../../components/MemberCard';
import { getAllMembers, deleteMember } from '../../services/memberService'; // Pastikan ini ada
import { useAuth } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const MemberListScreen = ({ navigation }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isAdmin } = useAuth();
  const theme = useTheme();

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await getAllMembers();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
      Alert.alert('Error', 'Gagal memuat daftar anggota.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMembers();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchMembers();
  };

  const handleCardPress = (id) => {
    navigation.navigate('MemberDetail', { memberId: id });
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus anggota ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              await deleteMember(id);
              Alert.alert('Berhasil', 'Anggota berhasil dihapus.');
              fetchMembers(); // Refresh list
            } catch (error) {
              console.error('Error deleting member:', error);
              Alert.alert('Error', 'Gagal menghapus anggota.');
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
          onPress={() => navigation.navigate('MemberForm')}
          style={styles.addButton}
        >
          Tambah Anggota Baru
        </Button>
      )}
      {members.length === 0 ? (
        <Text style={styles.emptyText}>Tidak ada anggota yang tersedia.</Text>
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <MemberCard member={item} onPress={handleCardPress} />
              {isAdmin && (
                <View style={styles.actionButtons}>
                  <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('MemberForm', { memberId: item.id })}
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

export default MemberListScreen;
