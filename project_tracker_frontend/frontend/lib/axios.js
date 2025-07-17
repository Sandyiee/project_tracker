import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true, // ✅ so cookies are sent
  headers: {
    'Content-Type': 'application/json', // ✅ ensure this
  },
});

export default api;
