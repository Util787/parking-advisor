import axios from 'axios';
import { GetParkingsRequest, Parking } from '../types/api';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const parkingApi = {
  getParkings: async (request: GetParkingsRequest): Promise<Parking[]> => {
    const response = await api.post<Parking[]>('/parkings', request);
    return response.data;
  },
};