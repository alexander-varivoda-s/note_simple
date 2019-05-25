import { ADD_NOTE_REQUEST, FETCH_DATA_REQUEST } from './constants';

export const fetchDataAction = () => ({
  type: FETCH_DATA_REQUEST,
});

export const addNoteAction = text => ({
  type: ADD_NOTE_REQUEST,
  payload: {
    text: text || 'New note...',
  },
});
