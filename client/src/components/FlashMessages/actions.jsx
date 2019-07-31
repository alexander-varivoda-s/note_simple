import uuidv4 from 'uuid/v4';
import { createAction } from 'redux-actions';

export const flashMessage = createAction('FLASH_MESSAGE', messages =>
  messages.map(m => ({ ...m, id: uuidv4() }))
);
export const clearFlashMessages = createAction('CLEAR_FLASH_MESSAGES');
