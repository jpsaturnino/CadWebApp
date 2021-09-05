import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cadwebapp.herokuapp.com'
});

export default api;