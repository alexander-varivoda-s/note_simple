import { combineReducers } from 'redux';

import notesReducer from './notes';
import tagsReducer from './tags';
import dataIsFetchedReducer from './dataIsFetched';
import searchPhraseReducer from '../containers/SearchBar/reducers/searchPhrase';

export default combineReducers({
  tags: tagsReducer,
  notes: notesReducer,
  dataIsFetched: dataIsFetchedReducer,
  searchPhrase: searchPhraseReducer,
});
