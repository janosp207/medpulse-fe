import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://bp-backend-q6tiqi67gq-ew.a.run.app/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

export default axios