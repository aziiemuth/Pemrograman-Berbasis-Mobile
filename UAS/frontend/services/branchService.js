// services/branchService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const BRANCHES_API_URL = `${API_BASE_URL}/cabang`; // Perhatikan endpoint backend Anda adalah '/cabang'

// Konfigurasi Axios untuk mengirim cookie (penting untuk express-session)
axios.defaults.withCredentials = true;

export const getAllCabang = async () => {
  try {
    const response = await axios.get(BRANCHES_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all branches:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch branches');
  }
};

export const getCabangById = async (id) => {
  try {
    const response = await axios.get(`${BRANCHES_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching branch with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to fetch branch with ID ${id}`);
  }
};

export const createCabang = async (branchData) => {
  try {
    const response = await axios.post(BRANCHES_API_URL, branchData);
    return response.data;
  } catch (error) {
    console.error('Error creating branch:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create branch');
  }
};

export const updateCabang = async (id, branchData) => {
  try {
    const response = await axios.put(`${BRANCHES_API_URL}/${id}`, branchData);
    return response.data;
  } catch (error) {
    console.error(`Error updating branch with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to update branch with ID ${id}`);
  }
};

export const deleteCabang = async (id) => {
  try {
    const response = await axios.delete(`${BRANCHES_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting branch with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to delete branch with ID ${id}`);
  }
};
