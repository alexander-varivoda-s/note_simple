import { TOGGLE_NOTE_INFO } from './constants';

export const toogleNoteVisiblityAction = isVisible => ({
  type: TOGGLE_NOTE_INFO,
  payload: {
    isVisible,
  },
});
