import axios from 'axios';


export const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";




export const testConnection = async () => {
  return axios.get(`${API_BASE}/test-ping/`);
};
