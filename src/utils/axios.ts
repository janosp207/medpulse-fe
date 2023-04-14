import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

export default axios