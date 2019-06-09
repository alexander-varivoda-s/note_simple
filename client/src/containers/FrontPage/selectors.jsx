import { createSelector } from 'reselect';

export const dataFetchStatus = state => state.dataIsFetched;

export const getNotes = state => state.appData.notes;

export const getTags = state => state.appData.tags;

export const getFilter = state => state.appData.filter;

export const getSelectedNoteId = state => state.appData.selectedNoteId;

export const getSelectedNote = createSelector(
  [getSelectedNoteId, getNotes],
  (id, notes) => notes.find(note => note._id === id)
);

export const getNoteInfoVisibilityStatus = state =>
  state.appData.isNoteInfoVisible;

export const getSelectedNoteTags = createSelector(
  [getSelectedNote, getTags],
  (note, tags) => note.tags.map(tagId => tags.find(tag => tag._id === tagId))
);

export const getTagsDiff = createSelector(
  [getSelectedNoteTags, getTags],
  (noteTags, allTags) =>
    allTags
      .filter(tag => !noteTags.includes(tag))
      .sort((a, b) => b.name.length - a.name.length)
);
