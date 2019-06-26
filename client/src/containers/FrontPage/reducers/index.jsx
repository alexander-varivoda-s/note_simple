import { combineReducers } from 'redux';

import notes from './notes';
import tags from './tags';
import dataIsFetched from './dataIsFetched';
import searchPhrase from './searchPhrase';
import filter from './filter';
import selectedNote from './selectedNote';
import isNoteInfoVisible from './isNoteInfoVisible';
import isSidebarVisible from './isSidebarVisible';
import isMenuVisible from './isMenuVisible';
import isRevisionSelectorVisible from '../containers/Revisions/reducers/isRevisionSelectorVisible';

export default combineReducers({
  tags,
  notes,
  dataIsFetched,
  searchPhrase,
  filter,
  selectedNote,
  isNoteInfoVisible,
  isSidebarVisible,
  isMenuVisible,
  isRevisionSelectorVisible,
});
