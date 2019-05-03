import axios from 'axios';

import initAuthAPI from './auth';

const { REACT_APP_HOST, REACT_APP_PORT } = process.env;

const API_BASE_URL = `http://${REACT_APP_HOST}:${REACT_APP_PORT}`;

console.log(API_BASE_URL);

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
export const authAPI = initAuthAPI(instance);
