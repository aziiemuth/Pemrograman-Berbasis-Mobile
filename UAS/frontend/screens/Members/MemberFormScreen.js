// screens/Members/MemberFormScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { createMember, getMemberById, updateMember } from '../../services/memberService'; // Pastikan ini ada

const MemberFormScreen = ({ route, navigation }) => {
  const { memberId } = route.params || {};
  const isEditMode = !!memberId;

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [kelamin, setKelamin] = useState(''); // Tambahkan field kelamin jika ada di DB
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    if (isEditMode) {
      const fetchMemberData = async () => {
        setInitialLoad(true);
        try {
          const data = await getMemberById(memberId);
          setNama(data.nama);
          setEmail(data.email);
          setNoHp(data.no_hp);
          setAlamat(data.alamat);
        } catch (error) {
          console.error('Error fetching member for edit:', error);
          Alert.alert('Error', 'Gagal memuat data anggota untuk diedit.');
          navigation.goBack();
        } finally {
          setInitialLoad(false);
        }
      };
      fetchMemberData();
    } else {
      setInitialLoad(false);
    }
  }, [memberId, isEditMode]);

  const handleSubmit = async () => {
    if (!nama || !email || !noHp || !alamat) { // Sesuaikan validasi
      Alert.alert('Peringatan', 'Semua kolom harus diisi.');
      return;
    }

    setLoading(true);
    const memberData = {
      nama,
      email,
      no_hp: noHp,
      alamat,
    };

    try {
      if (isEditMode) {
        await updateMember(memberId, memberData);
        Alert.alert('Berhasil', 'Anggota berhasil diperbarui.');
      } else {
        await createMember(memberData);
        Alert.alert('Berhasil', 'Anggota berhasil ditambahkan.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving member:', error);
      Alert.alert('Error', `Gagal ${isEditMode ? 'memperbarui' : 'menambahkan'} anggota.`);
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
        {isEditMode ? 'Edit Anggota' : 'Tambah Anggota Baru'}
      </Text>
      <TextInput
        label="Nama"
        value={nama}
        onChangeText={setNama}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="No. HP"
        value={noHp}
        onChangeText={setNoHp}
        mode="outlined"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        label="Alamat"
        value={alamat}
        onChangeText={setAlamat}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        {isEditMode ? 'Simpan Perubahan' : 'Tambah Anggota'}
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

export default MemberFormScreen;
