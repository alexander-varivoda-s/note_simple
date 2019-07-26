import { createSelector } from 'reselect';
import { getSettings } from '../SettingsPage/selectors';
import { ALL_NOTES, APP_DATA, FLAGS, TRASH } from '../Shared/constants';

export const getNotes = state => state[APP_DATA].notes;

export const getTags = state => state[APP_DATA].tags;

export const getFilter = state => state[APP_DATA].filter;

export const getSelectedNote = createSelector(
  [getNotes, state => state[APP_DATA].selectedNote],
  (notes, selectedNote) => {
    if (!selectedNote || !notes.length) return null;
    const note = notes.find(n => n._id === selectedNote);
    return note || null;
  }
);

export const getSearchPhrase = state => state[APP_DATA].searchPhrase;

export const getNotesByMainFilter = createSelector(
  [getNotes, getTags, getFilter],
  (notes, tags, filter) => {
    switch (filter) {
      case ALL_NOTES: {
        return notes.filter(note => !note.is_deleted);
      }

      case TRASH: {
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

export const getNoteInfoVisibilityStatus = state =>
  state[FLAGS].isNoteInfoVisible;

export const getSelectedNoteTags = createSelector(
  [getSelectedNote, getTags],
  (note, tags) =>
    note && tags.length
      ? note.tags.map(tagId => tags.find(tag => tag._id === tagId))
      : []
);

export const getTagsDiff = createSelector(
  [getSelectedNoteTags, getTags],
  (noteTags, allTags) =>
    allTags
      .filter(tag => !noteTags.includes(tag))
      .sort((a, b) => b.name.length - a.name.length)
);

export const getSidebarVisibilityStatus = state =>
  state[FLAGS].isSidebarVisible;

export const getMenuVisibilityStatus = state => state[FLAGS].isMenuVisible;

export const getSortedNotes = createSelector(
  [getSearchedNotes, getSettings],
  (notes, settings) => {
    const { order, by } = settings.sorting;
    const pinnedNotes = notes.filter(n => n.pinned);
    const notPinnedNotes = notes.filter(n => !n.pinned);

    const mapSortByToProp = sortBy => {
      if (sortBy === 'modified') return 'updated';
      if (sortBy === 'alphabet') return 'text';

      return 'created';
    };

    const prop = mapSortByToProp(by);

    const sort = items => {
      return items.sort((a, b) => {
        if (by === 'alphabet') {
          return order === 'asc'
            ? a[prop].localeCompare(b[prop])
            : b[prop].localeCompare(a[prop]);
        }

        const aDate = new Date(a[prop]);
        const bDate = new Date(b[prop]);

        return order === 'asc'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      });
    };

    return sort(pinnedNotes).concat(sort(notPinnedNotes));
  }
);
