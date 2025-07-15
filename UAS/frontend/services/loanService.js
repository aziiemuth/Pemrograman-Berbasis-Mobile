// services/loanService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const LOANS_API_URL = `${API_BASE_URL}/peminjaman`; // Perhatikan endpoint backend Anda adalah '/peminjaman'

// Konfigurasi Axios untuk mengirim cookie (penting untuk express-session)
axios.defaults.withCredentials = true;

export const getAllPeminjaman = async () => {
  try {
    const response = await axios.get(LOANS_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all loans:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch loans');
  }
};

export const getPeminjamanById = async (id) => {
  try {
    const response = await axios.get(`${LOANS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching loan with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to fetch loan with ID ${id}`);
  }
};

export const createPeminjaman = async (loanData) => {
  try {
    const response = await axios.post(LOANS_API_URL, loanData);
    return response.data;
  } catch (error) {
    console.error('Error creating loan:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create loan');
  }
};

export const updatePeminjaman = async (id, loanData) => {
  try {
    const response = await axios.put(`${LOANS_API_URL}/${id}`, loanData);
    return response.data;
  } catch (error) {
    console.error(`Error updating loan with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to update loan with ID ${id}`);
  }
};

export const deletePeminjaman = async (id) => {
  try {
    const response = await axios.delete(`${LOANS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting loan with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to delete loan with ID ${id}`);
  }
};
