import axios from 'axios';

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;


// You can export a test function if needed
export const testConnection = async () => {
  return axios.get(`${API_BASE}/test-ping/`);
};
