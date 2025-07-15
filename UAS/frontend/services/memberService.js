// services/memberService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const MEMBERS_API_URL = `${API_BASE_URL}/members`;

// Konfigurasi Axios untuk mengirim cookie (penting untuk express-session)
axios.defaults.withCredentials = true;

export const getAllMembers = async () => {
  try {
    const response = await axios.get(MEMBERS_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all members:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch members');
  }
};

export const getMemberById = async (id) => {
  try {
    const response = await axios.get(`${MEMBERS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching member with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to fetch member with ID ${id}`);
  }
};

export const createMember = async (memberData) => {
  try {
    const response = await axios.post(MEMBERS_API_URL, memberData);
    return response.data;
  } catch (error) {
    console.error('Error creating member:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create member');
  }
};

export const updateMember = async (id, memberData) => {
  try {
    const response = await axios.put(`${MEMBERS_API_URL}/${id}`, memberData);
    return response.data;
  } catch (error) {
    console.error(`Error updating member with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to update member with ID ${id}`);
  }
};

export const deleteMember = async (id) => {
  try {
    const response = await axios.delete(`${MEMBERS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting member with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to delete member with ID ${id}`);
  }
};
