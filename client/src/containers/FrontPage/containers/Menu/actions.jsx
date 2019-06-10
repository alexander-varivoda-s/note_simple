import { TOGGLE_MENU_VISIBILITY } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const toggleMenuVisibilityAction = isVisible => ({
  type: TOGGLE_MENU_VISIBILITY,
  payload: {
    isVisible,
  },
});
