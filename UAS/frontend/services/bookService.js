// services/bookService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const BOOKS_API_URL = `${API_BASE_URL}/books`;

// Konfigurasi Axios untuk mengirim cookie (penting untuk express-session)
axios.defaults.withCredentials = true;

export const getAllBooks = async () => {
  try {
    const response = await axios.get(BOOKS_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all books:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch books');
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${BOOKS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to fetch book with ID ${id}`);
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await axios.post(BOOKS_API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create book');
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${BOOKS_API_URL}/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to update book with ID ${id}`);
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${BOOKS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || `Failed to delete book with ID ${id}`);
  }
};
