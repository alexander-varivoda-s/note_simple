import { combineReducers } from 'redux';

import notesReducer from './notes';
import tagsReducer from './tags';
import dataIsFetchedReducer from './dataIsFetched';

export default combineReducers({
  tags: tagsReducer,
  notes: notesReducer,
  dataIsFetched: dataIsFetchedReducer,
});
