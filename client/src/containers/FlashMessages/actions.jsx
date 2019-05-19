import uuidv4 from 'uuid/v4';

import { FLASH_MESSAGE, CLEAR_FLASH_MESSAGES } from './constants';

export function clearFlashMessages() {
  return {
    type: CLEAR_FLASH_MESSAGES,
  };
}

export default function flashMessage(payload) {
  let temp = payload;

  if (!Array.isArray(temp)) {
    temp = [payload];
  }

  return {
    type: FLASH_MESSAGE,
    messages: temp.map(m => ({ ...m, id: uuidv4() })),
  };
}
