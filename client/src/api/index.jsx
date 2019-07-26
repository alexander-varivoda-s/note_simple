import axios from 'axios';

import initAuthAPI from './auth';
import initNotesAPI from './notes';
import initTagsAPI from './tags';
import initRevisionsAPI from './revisions';
import initUserAPI from './user';
import { getAccessToken } from '../utils/jwt';

const { REACT_APP_HOST, REACT_APP_PORT } = process.env;

const API_BASE_URL = `http://${REACT_APP_HOST}:${REACT_APP_PORT}`;

const baseConfig = {
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-By': 'XMLHttpRequest',
  },
};

const instance = axios.create(baseConfig);

export const authAPI = initAuthAPI(instance);
export const notesAPI = initNotesAPI(instance);
export const tagsAPI = initTagsAPI(instance);
export const revisionsAPI = initRevisionsAPI(instance);
export const userAPI = initUserAPI(instance);

instance.interceptors.request.use(
  async config => {
    const { useAccessToken } = config;

    if (typeof useAccessToken !== 'undefined' && !useAccessToken) return config;

    const currentAccessToken = getAccessToken();
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
    return config;
  },
  err => Promise.reject(err)
);

export default instance;
