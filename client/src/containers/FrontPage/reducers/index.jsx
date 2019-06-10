import { combineReducers } from 'redux';

import notes from './notes';
import tags from './tags';
import dataIsFetched from './dataIsFetched';
import searchPhrase from './searchPhrase';
import filter from './filter';
import selectedNoteId from './selectedNoteId';
import isNoteInfoVisible from './isNoteInfoVisible';
import isSidebarVisible from './isSidebarVisible';

export default combineReducers({
  tags,
  notes,
  dataIsFetched,
  searchPhrase,
  filter,
  selectedNoteId,
  isNoteInfoVisible,
  isSidebarVisible,
});
