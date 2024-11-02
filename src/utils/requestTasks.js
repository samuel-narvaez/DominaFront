import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:4001/',
  timeout: 10000,
});

export default apiService;
