// screens/Branches/BranchFormScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { createCabang, getCabangById, updateCabang } from '../../services/branchService'; // Pastikan ini ada

const BranchFormScreen = ({ route, navigation }) => {
  const { branchId } = route.params || {};
  const isEditMode = !!branchId;

  const [namaCabang, setNamaCabang] = useState('');
  const [alamat, setAlamat] = useState('');
  const [penanggungJawab, setPenanggungJawab] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    if (isEditMode) {
      const fetchBranchData = async () => {
        setInitialLoad(true);
        try {
          const data = await getCabangById(branchId);
          setNamaCabang(data.nama_cabang);
          setAlamat(data.alamat);
          setPenanggungJawab(data.penanggung_jawab);
        } catch (error) {
          console.error('Error fetching branch for edit:', error);
          Alert.alert('Error', 'Gagal memuat data cabang untuk diedit.');
          navigation.goBack();
        } finally {
          setInitialLoad(false);
        }
      };
      fetchBranchData();
    } else {
      setInitialLoad(false);
    }
  }, [branchId, isEditMode]);

  const handleSubmit = async () => {
    if (!namaCabang || !alamat || !penanggungJawab) {
      Alert.alert('Peringatan', 'Semua kolom harus diisi.');
      return;
    }

    setLoading(true);
    const branchData = {
      nama_cabang: namaCabang,
      alamat,
      penanggung_jawab: penanggungJawab,
    };

    try {
      if (isEditMode) {
        await updateCabang(branchId, branchData);
        Alert.alert('Berhasil', 'Cabang berhasil diperbarui.');
      } else {
        await createCabang(branchData);
        Alert.alert('Berhasil', 'Cabang berhasil ditambahkan.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving branch:', error);
      Alert.alert('Error', `Gagal ${isEditMode ? 'memperbarui' : 'menambahkan'} cabang.`);
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
        {isEditMode ? 'Edit Cabang' : 'Tambah Cabang Baru'}
      </Text>
      <TextInput
        label="Nama Cabang"
        value={namaCabang}
        onChangeText={setNamaCabang}
        mode="outlined"
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
      <TextInput
        label="Penanggung Jawab"
        value={penanggungJawab}
        onChangeText={setPenanggungJawab}
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
        {isEditMode ? 'Simpan Perubahan' : 'Tambah Cabang'}
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

export default BranchFormScreen;
