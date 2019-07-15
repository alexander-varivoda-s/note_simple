import {
  DELETE_NOTE_REQUEST,
  MOVE_TO_TRASH_REQUEST,
  RESTORE_NOTE_REQUEST,
  TOGGLE_NOTE_INFO,
  TOGGLE_SIDEBAR_VISIBILITY,
} from './constants';

export const toggleNoteVisibilityAction = isVisible => ({
  type: TOGGLE_NOTE_INFO,
  payload: {
    isVisible,
  },
});

export const toggleSidebarVisibilityAction = isVisible => ({
  type: TOGGLE_SIDEBAR_VISIBILITY,
  payload: {
    isVisible,
  },
});

export const moveToTrashAction = () => ({
  type: MOVE_TO_TRASH_REQUEST,
});

export const restoreNoteAction = () => ({
  type: RESTORE_NOTE_REQUEST,
});

export const deleteNoteRequest = () => ({
  type: DELETE_NOTE_REQUEST,
});
