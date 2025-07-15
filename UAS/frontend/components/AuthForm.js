// components/AuthForm.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const AuthForm = ({ type, onSubmit, isLoading, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('anggota'); // Default role for registration
  const [idAnggota, setIdAnggota] = useState(''); // Optional for 'anggota' role
  const [formError, setFormError] = useState(''); // State untuk error validasi form di frontend

  const isRegister = type === 'register';

  const handleSubmit = () => {
    setFormError(''); // Reset error sebelumnya

    // --- START VALIDASI FRONTEND ---
    if (!username.trim()) {
      setFormError('Username tidak boleh kosong.');
      return;
    }
    if (!password.trim()) {
      setFormError('Password tidak boleh kosong.');
      return;
    }
    if (password.length < 6) {
      setFormError('Password minimal 6 karakter.');
      return;
    }

    if (isRegister) {
      const trimmedRole = role.trim().toLowerCase(); // Normalisasi input role
      if (!['admin', 'anggota'].includes(trimmedRole)) {
        setFormError('Role tidak valid. Pilih "admin" atau "anggota".');
        return;
      }
      if (trimmedRole === 'anggota' && !idAnggota.trim()) {
        setFormError('ID Anggota tidak boleh kosong untuk role anggota.');
        return;
      }
      if (trimmedRole === 'anggota' && isNaN(idAnggota.trim())) {
        setFormError('ID Anggota harus berupa angka.');
        return;
      }
    }
    // --- END VALIDASI FRONTEND ---

    // Jika semua validasi frontend lolos, panggil onSubmit
    if (isRegister) {
      onSubmit({
        username: username.trim(),
        password: password.trim(),
        role: role.trim().toLowerCase(), // Kirim role yang sudah dinormalisasi
        id_anggota: idAnggota.trim()
      });
    } else {
      onSubmit({
        username: username.trim(),
        password: password.trim()
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
        // Menampilkan error pada input terkait
        error={!!formError && formError.includes('Username')}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        // Menampilkan error pada input terkait
        error={!!formError && formError.includes('Password')}
      />

      {isRegister && (
        <>
          {/* Untuk kesederhanaan, role selection adalah dasar. Dalam aplikasi nyata, gunakan dropdown/picker */}
          <TextInput
            label="Role (admin/anggota)"
            value={role}
            onChangeText={setRole}
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
            error={!!formError && formError.includes('Role')}
          />
          {role.toLowerCase() === 'anggota' && ( // Perhatikan perubahan di sini untuk menampilkan input idAnggota
            <TextInput
              label="ID Anggota" // Label diubah menjadi tidak opsional jika role anggota
              value={idAnggota}
              onChangeText={setIdAnggota}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
              error={!!formError && formError.includes('ID Anggota')}
            />
          )}
        </>
      )}

      {/* Menampilkan error dari frontend atau backend */}
      {(error || formError) && <Text style={styles.errorText}>{error || formError}</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
      >
        {isRegister ? 'Register' : 'Login'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AuthForm;
