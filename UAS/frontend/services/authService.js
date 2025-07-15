// services/authService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AUTH_API_URL = `${API_BASE_URL}/auth`;

// Konfigurasi Axios untuk mengirim cookie (penting untuk express-session)
axios.defaults.withCredentials = true;

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, { username, password });
    return response.data; // Mengandung { message: 'Login berhasil', user: req.session.user }
  } catch (error) {
    console.error('Login API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, userData);
    return response.data; // Mengandung { message: 'Registrasi berhasil', id: result.insertId }
  } catch (error) {
    console.error('Register API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/logout`);
    return response.data; // Mengandung { message: 'Logout berhasil' }
  } catch (error) {
    console.error('Logout API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${AUTH_API_URL}/profile`);
    return response.data; // Mengandung data user jika terotentikasi, atau error jika tidak
  } catch (error) {
    // Jika status 401 (Unauthorized), berarti tidak ada sesi aktif
    if (error.response && error.response.status === 401) {
      return null;
    }
    console.error('Get Current User API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to get current user');
  }
};
