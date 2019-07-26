import axios from 'axios';

import initAuthAPI from './auth';
import initNotesAPI from './notes';
import initTagsAPI from './tags';
import initRevisionsAPI from './revisions';
import initUserAPI from './user';
import {
  accessTokenIsExpired,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setAccessTokenExpirationDate,
  setRefreshToken,
} from '../utils/jwt';

const { REACT_APP_HOST, REACT_APP_PORT } = process.env;

const API_BASE_URL = `http://${REACT_APP_HOST}:${REACT_APP_PORT}`;

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-By': 'XMLHttpRequest',
  },
});

export const authAPI = initAuthAPI(instance);
export const notesAPI = initNotesAPI(instance);
export const tagsAPI = initTagsAPI(instance);
export const revisionsAPI = initRevisionsAPI(instance);
export const userAPI = initUserAPI(instance);

instance.interceptors.request.use(
  async config => {
    const { useAccessToken } = config;

    if (typeof useAccessToken !== 'undefined' && !useAccessToken) return config;

    let currentAccessToken = getAccessToken();

    if (accessTokenIsExpired()) {
      const currentRefreshToken = getRefreshToken();

      if (!currentRefreshToken) {
        throw new Error('Refresh token is missing.');
      }

      const {
        data: { accessToken, refreshToken, expiresIn },
      } = await userAPI.refreshToken(currentRefreshToken, config);

      currentAccessToken = accessToken;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setAccessTokenExpirationDate(expiresIn);
    }

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${currentAccessToken}`;

    return config;
  },
  err => Promise.reject(err)
);

export default instance;
