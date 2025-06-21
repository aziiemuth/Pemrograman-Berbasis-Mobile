import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const API_URL = 'http://192.168.1.6:3000/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDeadline, setEditDeadline] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error('Gagal memuat data:', err);
    }
  };

  const addTask = async () => {
    if (title && deadline) {
      try {
        await axios.post(API_URL, { title, deadline });
        setTitle('');
        setDeadline('');
        Alert.alert('Berhasil', 'Tugas berhasil ditambahkan.');
        await fetchTasks();
      } catch (err) {
        console.error('Tambah tugas gagal:', err);
        Alert.alert('Error', 'Gagal menambahkan tugas.');
      }
    } else {
      Alert.alert('Peringatan', 'Harap isi judul dan deadline.');
    }
  };

  const deleteTask = (id) => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Yakin ingin menghapus tugas ini?',
      [
        {
          text: 'Batal',
          style: 'cancel'
        },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/${id}`);
              Alert.alert('Terhapus', 'Tugas berhasil dihapus.');
              await fetchTasks();
            } catch (err) {
              console.error('Hapus gagal:', err);
              Alert.alert('Error', 'Gagal menghapus tugas.');
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  const markAsDone = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: 'Selesai' });
      Alert.alert('Selesai', 'Tugas telah ditandai sebagai selesai.');
      await fetchTasks();
    } catch (err) {
      console.error('Gagal menandai selesai:', err);
      Alert.alert('Error', 'Gagal menandai tugas sebagai selesai.');
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDeadline(task.deadline);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTitle('');
    setEditDeadline('');
  };

  const saveEdit = async () => {
    if (editingTask && editTitle && editDeadline) {
      try {
        await axios.put(`${API_URL}/${editingTask._id}`, {
          title: editTitle,
          deadline: editDeadline,
          status: editingTask.status
        });
        cancelEdit();
        Alert.alert('Berhasil', 'Perubahan berhasil disimpan.');
        await fetchTasks();
      } catch (err) {
        console.error('Simpan edit gagal:', err);
        Alert.alert('Error', 'Gagal menyimpan perubahan.');
      }
    } else {
      Alert.alert('Peringatan', 'Harap lengkapi data edit.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#f1f8e9' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#388e3c' }}>
        🌟 To-Do List App
      </Text>

      {/* Form Tambah */}
      <Card style={styles.card}>
        <Card.Title title="Tambah Tugas" />
        <Card.Content>
          <TextInput
            placeholder="Judul Tugas"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Deadline (YYYY-MM-DD)"
            value={deadline}
            onChangeText={setDeadline}
            style={styles.input}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.buttonText}><Icon name="plus" /> Tambah</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      {/* Form Edit */}
      {editingTask && (
        <Card style={[styles.card, { backgroundColor: '#f3e5f5' }]}>
          <Card.Title title="Edit Tugas" />
          <Card.Content>
            <TextInput
              placeholder="Judul Tugas"
              value={editTitle}
              onChangeText={setEditTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Deadline"
              value={editDeadline}
              onChangeText={setEditDeadline}
              style={styles.input}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
              <Text style={styles.buttonText}><Icon name="save" /> Simpan</Text>
            </TouchableOpacity>
            <View style={{ height: 10 }} />
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
              <Text style={styles.buttonText}><Icon name="times" /> Batal</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      )}

      {/* Daftar Tugas */}
      {tasks.map((task) => (
        <Card key={task._id} style={[styles.card, task.status === 'Selesai' && { backgroundColor: '#c8e6c9' }]}>
          <Card.Content>
            <Title style={{ color: '#2e7d32' }}>{task.title}</Title>
            <Paragraph>📅 {task.deadline}</Paragraph>
            <Paragraph>Status:
              <Text style={{ fontWeight: 'bold', color: task.status === 'Selesai' ? '#388e3c' : '#f44336' }}>
                {' '}{task.status}
              </Text>
            </Paragraph>
            <View style={{ marginTop: 10, flexDirection: 'column' }}>
              <TouchableOpacity style={styles.actionButton} onPress={() => startEdit(task)}>
                <Text style={styles.buttonText}><Icon name="edit" /> Edit</Text>
              </TouchableOpacity>
              <View style={{ height: 5 }} />
              {task.status !== 'Selesai' && (
                <>
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#009688' }]} onPress={() => markAsDone(task._id)}>
                    <Text style={styles.buttonText}><Icon name="check" /> Tandai Selesai</Text>
                  </TouchableOpacity>
                  <View style={{ height: 5 }} />
                </>
              )}
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#d32f2f' }]} onPress={() => deleteTask(task._id)}>
                <Text style={styles.buttonText}><Icon name="trash" /> Hapus</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = {
  card: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#e0f2f1',
    borderRadius: 5,
    padding: 8
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  saveButton: {
    backgroundColor: '#673ab7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  actionButton: {
    backgroundColor: '#1976d2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
};
