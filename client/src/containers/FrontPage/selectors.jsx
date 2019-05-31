import { createSelector } from 'reselect';

export const dataFetchStatus = state => state.dataIsFetched;
export const getNotes = state => state.appData.notes;
export const getTags = state => state.appData.tags;
export const getFilter = state => state.appData.filter;
export const getSelectedNoteId = state => state.appData.selectedNoteId;
export const getSelectedNote = createSelector(
  [getSelectedNoteId, getNotes],
  (id, notes) => notes.find(note => note._id === id),
);
