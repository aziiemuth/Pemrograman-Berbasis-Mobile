import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function App() {
  const [idBarang, setIdBarang] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [alamatTujuan, setAlamatTujuan] = useState('');
  const [pengirim, setPengirim] = useState('');
  const [jumlahBarang, setJumlahBarang] = useState(1);
  // Instead of Date object, use strings for dates
  const [tanggalKirim, setTanggalKirim] = useState(getCurrentDate());
  const [penerima, setPenerima] = useState('');
  const [savedDataList, setSavedDataList] = useState([]);

  // Function to get current date in YYYY-MM-DD format
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Daftar pengirim yang tersedia
  const daftarPengirim = [
    { id: 'p1', nama: 'Budi Santoso' },
    { id: 'p2', nama: 'Dewi Lestari' },
    { id: 'p3', nama: 'Agus Hermawan' },
    { id: 'p4', nama: 'Siti Nurhaliza' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const allData = await AsyncStorage.getItem('shipmentData');
        if (allData !== null) {
          const parsedData = JSON.parse(allData);
          setSavedDataList(parsedData);
        }
      } catch (e) {
        console.log('Gagal memuat data', e);
      }
    };
    loadData();
  }, []);

  const submitData = async () => {
    // Validasi input
    if (!idBarang || !namaBarang || !alamatTujuan || !pengirim || !penerima) {
      Alert.alert('Error', 'Semua field harus diisi!');
      return;
    }

    // Validasi format tanggal (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(tanggalKirim)) {
      Alert.alert('Error', 'Format tanggal harus YYYY-MM-DD (contoh: 2025-04-20)');
      return;
    }

    const data = {
      idBarang,
      namaBarang,
      alamatTujuan,
      pengirim,
      jumlahBarang,
      tanggalKirim,
      penerima,
    };

    try {
      const updatedList = [...savedDataList, data];
      await AsyncStorage.setItem('shipmentData', JSON.stringify(updatedList));
      setSavedDataList(updatedList);

      // Reset form setelah simpan
      resetForm();

      Alert.alert('Data Tersimpan!', 
        `ID Barang: ${idBarang}\nNama Barang: ${namaBarang}\nTujuan: ${alamatTujuan}\nPengirim: ${pengirim}\nJumlah: ${jumlahBarang}\nTanggal: ${tanggalKirim}\nPenerima: ${penerima}`
      );
    } catch (e) {
      Alert.alert('Gagal menyimpan data!');
      console.error(e);
    }
  };

  const resetForm = () => {
    setIdBarang('');
    setNamaBarang('');
    setAlamatTujuan('');
    setPengirim('');
    setJumlahBarang(1);
    setTanggalKirim(getCurrentDate());
    setPenerima('');
  };

  const editData = (index) => {
    const dataToEdit = savedDataList[index];
    setIdBarang(dataToEdit.idBarang);
    setNamaBarang(dataToEdit.namaBarang);
    setAlamatTujuan(dataToEdit.alamatTujuan);
    setPengirim(dataToEdit.pengirim);
    setJumlahBarang(dataToEdit.jumlahBarang);
    setTanggalKirim(dataToEdit.tanggalKirim);
    setPenerima(dataToEdit.penerima);

    const updatedList = savedDataList.filter((_, i) => i !== index);
    setSavedDataList(updatedList);
    AsyncStorage.setItem('shipmentData', JSON.stringify(updatedList));
  };

  const deleteData = async (index) => {
    const updatedList = savedDataList.filter((_, i) => i !== index);
    setSavedDataList(updatedList);
    await AsyncStorage.setItem('shipmentData', JSON.stringify(updatedList));
    Alert.alert('Data berhasil dihapus!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Form Pengiriman Barang
        </Text>

        <Text style={styles.label}>ID Barang:</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan ID Barang"
          value={idBarang}
          onChangeText={setIdBarang}
        />

        <Text style={styles.label}>Nama Barang:</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Nama Barang"
          value={namaBarang}
          onChangeText={setNamaBarang}
        />

        <Text style={styles.label}>Alamat Tujuan:</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Masukkan alamat tujuan lengkap"
          value={alamatTujuan}
          onChangeText={setAlamatTujuan}
          multiline={true}
          numberOfLines={4}
        />

        <Text style={styles.label}>Pengirim:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pengirim}
            onValueChange={(itemValue) => setPengirim(itemValue)}
          >
            <Picker.Item label="Pilih Pengirim" value="" />
            {daftarPengirim.map((item) => (
              <Picker.Item key={item.id} label={item.nama} value={item.nama} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Jumlah Barang: {jumlahBarang}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={1}
          maximumValue={100}
          step={1}
          value={jumlahBarang}
          onValueChange={(value) => setJumlahBarang(value)}
          minimumTrackTintColor="#3399ff"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#3399ff"
        />

        <Text style={styles.label}>Tanggal Kirim (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD (contoh: 2025-04-20)"
          value={tanggalKirim}
          onChangeText={setTanggalKirim}
        />

        <Text style={styles.label}>Penerima:</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama penerima"
          value={penerima}
          onChangeText={setPenerima}
        />

        <View style={styles.buttonContainer}>
          <Button title="Simpan Data" onPress={submitData} />
        </View>

        <Text style={styles.sectionTitle}>Daftar Pengiriman Tersimpan:</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>ID</Text>
          <Text style={styles.headerCell}>Nama Barang</Text>
          <Text style={styles.headerCell}>Pengirim</Text>
          <Text style={styles.headerCell}>Penerima</Text>
          <Text style={styles.headerCell}>Jumlah</Text>
          <Text style={styles.headerCell}>Tanggal</Text>
          <Text style={styles.headerCell}>Aksi</Text>
        </View>
        
        {savedDataList.length === 0 ? (
          <Text style={styles.emptyMessage}>Belum ada data pengiriman.</Text>
        ) : (
          savedDataList.map((item, index) => (
            <View
              key={index}
              style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }]}
            >
              <Text style={styles.cell} numberOfLines={1}>{item.idBarang}</Text>
              <Text style={styles.cell} numberOfLines={1}>{item.namaBarang}</Text>
              <Text style={styles.cell} numberOfLines={1}>{item.pengirim}</Text>
              <Text style={styles.cell} numberOfLines={1}>{item.penerima}</Text>
              <Text style={styles.cell} numberOfLines={1}>{item.jumlahBarang}</Text>
              <Text style={styles.cell} numberOfLines={1}>{item.tanggalKirim}</Text>
              <View style={styles.actionCell}>
                <TouchableOpacity style={styles.editButton} onPress={() => editData(index)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteData(index)}>
                  <Text style={styles.buttonText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#34495e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ecf0f1',
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#ecf0f1',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#ecf0f1',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#2c3e50',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  actionCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 5,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  emptyMessage: {
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
});