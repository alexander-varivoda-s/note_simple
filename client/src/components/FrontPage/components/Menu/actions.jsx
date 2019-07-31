import { createAction } from 'redux-actions';

export const toggleMenu = createAction('TOGGLE_MENU', isVisible => ({
  isVisible,
}));
export const filterNotes = createAction('FILTER_NOTES', filter => ({ filter }));
