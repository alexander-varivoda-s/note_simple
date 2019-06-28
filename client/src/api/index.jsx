import axios from 'axios';

import initAuthAPI from './auth';
import initNotesAPI from './notes';
import initTagsAPI from './tags';
import initRevisionsAPI from './revisions';
import initUserAPI from './user';

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

export default instance;
export const authAPI = initAuthAPI(instance);
export const notesAPI = initNotesAPI(instance);
export const tagsAPI = initTagsAPI(instance);
export const revisionsAPI = initRevisionsAPI(instance);
export const userAPI = initUserAPI(instance);
