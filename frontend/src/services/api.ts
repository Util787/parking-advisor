import axios from 'axios';
import { GetParkingsRequest, Parking } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Улучшенная обработка ошибок
const handleApiError = (error: any): never => {
  if (error.response) {
    // Сервер ответил с кодом ошибки
    throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
  } else if (error.request) {
    // Запрос был сделан, но ответ не получен
    throw new Error('Network error: Unable to connect to server');
  } else {
    // Произошла что-то другое
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

export const parkingApi = {
  getParkings: async (request: GetParkingsRequest): Promise<Parking[]> => {
    try {
      const response = await api.post<Parking[]>('/parkings', request);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};