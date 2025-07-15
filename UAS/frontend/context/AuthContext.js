// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store'; // Untuk menyimpan token/sesi dengan aman
import {
  login as apiLogin,
  logout as apiLogout,
  getCurrentUser as apiGetCurrentUser,
  register as apiRegister
} from '../services/authService';

// Buat Context
const AuthContext = createContext();

// Buat Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan data pengguna yang sedang login
  const [isLoading, setIsLoading] = useState(true); // Status loading saat memeriksa sesi awal
  const [authError, setAuthError] = useState(null); // Menyimpan error otentikasi

  // Fungsi untuk memuat sesi pengguna dari SecureStore saat aplikasi dimulai
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Coba ambil data pengguna dari backend (jika sesi masih aktif)
        const currentUser = await apiGetCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null); // Tidak ada sesi aktif
        }
      } catch (error) {
        console.error('Failed to load user session:', error);
        setUser(null); // Pastikan user null jika ada error
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Fungsi untuk login
  const login = async (username, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await apiLogin(username, password);
      if (response.user) {
        setUser(response.user);
        // Opsional: Simpan token atau indikator sesi jika backend mengembalikan token
        // await SecureStore.setItemAsync('userSession', JSON.stringify(response.user));
        return true; // Login berhasil
      } else {
        // Tangani pesan error dari backend
        setAuthError(response.message || 'Login gagal. Periksa username dan password Anda.');
        return false; // Login gagal
      }
    } catch (error) {
      console.error('Login error:', error);
      // Tangani error jaringan atau server
      setAuthError(error.response?.data?.message || error.message || 'Terjadi kesalahan jaringan saat login.');
      return false; // Login gagal
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk register
  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await apiRegister(userData);
      if (response.id) {
        // Setelah register, mungkin langsung login atau arahkan ke layar login
        // Untuk saat ini, kita tidak langsung login setelah register
        return true; // Registrasi berhasil
      } else {
        // Tangani pesan error dari backend
        setAuthError(response.message || 'Registrasi gagal.');
        return false; // Registrasi gagal
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Tangani error jaringan atau server
      setAuthError(error.response?.data?.message || error.message || 'Terjadi kesalahan jaringan saat registrasi.');
      return false; // Registrasi gagal
    } finally {
      setIsLoading(false);
    }
  };


  // Fungsi untuk logout
  const logout = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await apiLogout();
      setUser(null);
      // Hapus data sesi dari SecureStore
      // await SecureStore.deleteItemAsync('userSession');
      return true; // Logout berhasil
    } catch (error) {
      console.error('Logout error:', error);
      setAuthError(error.message || 'An unexpected error occurred during logout.');
      return false; // Logout gagal
    } finally {
      setIsLoading(false);
    }
  };

  // Nilai yang akan disediakan oleh Context
  const authContextValue = {
    user,
    isLoading,
    authError,
    login,
    register,
    logout,
    isAuthenticated: !!user, // Boolean untuk mengecek apakah user sudah login
    isAdmin: user && user.role === 'admin', // Boolean untuk mengecek apakah user adalah admin
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk memudahkan penggunaan AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
