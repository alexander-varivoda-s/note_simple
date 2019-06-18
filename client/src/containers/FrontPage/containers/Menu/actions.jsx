import { FILTER_NOTES, TOGGLE_MENU_VISIBILITY } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const toggleMenuVisibilityAction = isVisible => ({
  type: TOGGLE_MENU_VISIBILITY,
  payload: {
    isVisible,
  },
});

export const filterNotesAction = filter => ({
  type: FILTER_NOTES,
  payload: {
    filter,
  },
});
