import { createSelector } from 'reselect';

export const dataFetchStatus = state => state.dataIsFetched;

export const getNotes = state => state.appData.notes;

export const getTags = state => state.appData.tags;

export const getFilter = state => state.appData.filter;

export const getSelectedNoteId = state => state.appData.selectedNoteId;

export const getSearchPhrase = state => state.appData.searchPhrase;

export const getNotesByMainFilter = createSelector(
  [getNotes, getTags, getFilter],
  (notes, tags, filter) => {
    switch (filter) {
      case 'all': {
        return notes.filter(note => !note.is_deleted);
      }

      case 'trash': {
        return notes.filter(note => note.is_deleted);
      }

      default: {
        const tag = tags.find(t => t.name === filter);
        return tag
          ? notes.filter(
              note => !note.is_deleted && note.tags.indexOf(tag._id) >= 0
            )
          : [];
      }
    }
  }
);

export const getSearchedNotes = createSelector(
  [getNotesByMainFilter, getSearchPhrase],
  (notes, phrase) => {
    if (!phrase) {
      return notes;
    }

    return notes.filter(note => note.text.indexOf(phrase) >= 0);
  }
);

export const getSelectedNote = createSelector(
  [getSelectedNoteId, getNotesByMainFilter],
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

export const getSidebarVisibilityStatus = state =>
  state.appData.isSidebarVisible;

export const getMenuVisibilityStatus = state => state.appData.isMenuVisible;

export const getSortedNotes = createSelector(
  [getSearchedNotes],
  notes =>
    notes
      .sort((a, b) => {
        const aDate = new Date(a.updated);
        const bDate = new Date(b.updated);

        return bDate.getTime() - aDate.getTime();
      })
      .sort((a, b) => {
        const aDate = new Date(a.pinned || 0);
        const bDate = new Date(b.pinned || 0);

        return bDate.getTime() - aDate.getTime();
      })
);
