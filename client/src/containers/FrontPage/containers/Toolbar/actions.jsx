import { TOGGLE_NOTE_INFO } from './constants';

export const toggleNoteVisibilityAction = isVisible => ({
  type: TOGGLE_NOTE_INFO,
  payload: {
    isVisible,
  },
});
