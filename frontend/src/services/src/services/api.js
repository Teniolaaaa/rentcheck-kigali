import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const searchProperties = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties/search`, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch properties');
  }
};