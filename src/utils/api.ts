import axios from 'axios'; 

export const API_BASE = "http://localhost:8000/api";




axios.get(`${API_BASE}/api/auth-url/`);
